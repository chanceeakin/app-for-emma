package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"goji.io"
	"goji.io/pat"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

const host string = "localhost"

func ErrorWithJSON(w http.ResponseWriter, message string, code int) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(code)
	fmt.Fprintf(w, "{message: %q}", message)
}

func ResponseWithJSON(w http.ResponseWriter, json []byte, code int) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(code)
	w.Write(json)
}

type Author struct {
	FirstName string `bson:"firstName"`
	LastName  string `bson:"lastName"`
}

type list []interface{}

type Book struct {
	ID        bson.ObjectId `bson:"_id,omitempty"`
	Title     string        `bson:"title"`
	Views     int           `bson:"views"`
	Author    Author        `bson:"author"`
	TestArray list          `bson:"testArray,omitempty"`
}

func init() {
	s1 := rand.NewSource(time.Now().UnixNano())
	r1 := rand.New(s1)

	log.Println("Seeding mock data to MongoDB")
	session, collection := Get()
	defer session.Close()

	_, err := collection.RemoveAll(bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	// Example from https://blog.golang.org
	err = collection.Insert(bson.M{"title": "Go 1.6 is released", "views": r1.Intn(100), "author": bson.M{"firstName": "Andrew", "lastName": "Gerrand"}},
		bson.M{"title": "Six years of Go", "views": r1.Intn(100), "author": bson.M{"firstName": "Andrew", "lastName": "Gerrand"}},
		bson.M{"title": "Testable Examples in Go", "views": r1.Intn(100), "author": bson.M{"firstName": "Andrew", "lastName": "Gerrand"}},
		bson.M{"title": "Go, Open Source, Community", "views": r1.Intn(100), "author": bson.M{"firstName": "Russ", "lastName": "Cox"}},
		bson.M{"title": "Generating code", "views": r1.Intn(100), "author": bson.M{"firstName": "Rob", "lastName": "Pike"}},
		bson.M{"title": "Arrays, slices (and strings): The mechanics of 'append'", "views": r1.Intn(100), "author": bson.M{"firstName": "Rob", "lastName": "Pike"}},
		bson.M{"title": "Errors are values", "views": r1.Intn(100), "author": bson.M{"firstName": "Rob", "lastName": "Pike"}, "testArray": list{"1", "2"}})
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	session, err := mgo.Dial(host)
	if err != nil {
		panic(err)
	}
	defer session.Close()

	session.SetMode(mgo.Monotonic, true)
	ensureIndex(session)

	mux := goji.NewMux()
	mux.HandleFunc(pat.Get("/books"), allBooks(session))
	mux.HandleFunc(pat.Post("/books"), addBook(session))
	// mux.HandleFunc(pat.Put("/books/:isbn"), updateBook(session))
	// mux.HandleFunc(pat.Delete("/books/:isbn"), deleteBook(session))
	go func() {
		log.Println("Starting GraphQL Server on http://localhost:8080/")
		http.ListenAndServe(":8080", mux)
	}()

	signalChan := make(chan os.Signal, 1)
	cleanupDone := make(chan bool)
	signal.Notify(signalChan, os.Interrupt, syscall.SIGTERM, syscall.SIGKILL)
	go func() {
		for _ = range signalChan {
			log.Println("Received an interrupt, stopping GraphQL Server...")
			cleanup()
			cleanupDone <- true
		}
	}()

	<-cleanupDone

}

// Cleanup will remove all mock data from the database.
func cleanup() {
	log.Println("Cleaning up MongoDB...")
	session, collection := Get()
	defer session.Close()

	_, err := collection.RemoveAll(bson.M{})
	if err != nil {
		log.Fatal(err)
	}
}

//Get returns the session and a reference to the post collection.
func Get() (*mgo.Session, *mgo.Collection) {
	log.Println("Dialing...")
	session, err := mgo.Dial(host)
	if err != nil {
		log.Fatal(err)
	}

	collection := session.DB("graphql").C("post")
	return session, collection
}

func ensureIndex(s *mgo.Session) {
	session := s.Copy()
	defer session.Close()

	c := session.DB("graphql").C("post")

	index := mgo.Index{
		Key:        []string{"id"},
		Unique:     true,
		DropDups:   true,
		Background: true,
		Sparse:     true,
	}
	err := c.EnsureIndex(index)
	if err != nil {
		panic(err)
	}
}

func allBooks(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		c := session.DB("graphql").C("post")

		var books []Book
		err := c.Find(bson.M{}).All(&books)
		if err != nil {
			ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
			log.Println("Failed get all books: ", err)
			return
		}

		fmt.Print(books)
		respBody, err := json.MarshalIndent(books, "", "  ")
		if err != nil {
			log.Fatal(err)
		}

		ResponseWithJSON(w, respBody, http.StatusOK)
	}
}

func addBook(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		var book Book
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&book)
		if err != nil {
			ErrorWithJSON(w, "Incorrect body", http.StatusBadRequest)
			return
		}

		c := session.DB("graphql").C("post")

		err = c.Insert(book)
		if err != nil {
			if mgo.IsDup(err) {
				ErrorWithJSON(w, "Book with this ISBN already exists", http.StatusBadRequest)
				return
			}

			ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
			log.Println("Failed insert book: ", err)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Location", r.URL.Path+"/"+book.Title)
		w.WriteHeader(http.StatusCreated)
	}
}

func updateBook(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		isbn := pat.Param(r, "isbn")

		var book Book
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&book)
		if err != nil {
			ErrorWithJSON(w, "Incorrect body", http.StatusBadRequest)
			return
		}

		c := session.DB("graphql").C("post")

		err = c.Update(bson.M{"isbn": isbn}, &book)
		if err != nil {
			switch err {
			default:
				ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
				log.Println("Failed update book: ", err)
				return
			case mgo.ErrNotFound:
				ErrorWithJSON(w, "Book not found", http.StatusNotFound)
				return
			}
		}

		w.WriteHeader(http.StatusNoContent)
	}
}

func deleteBook(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		isbn := pat.Param(r, "isbn")

		c := session.DB("graphql").C("post")

		err := c.Remove(bson.M{"isbn": isbn})
		if err != nil {
			switch err {
			default:
				ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
				log.Println("Failed delete book: ", err)
				return
			case mgo.ErrNotFound:
				ErrorWithJSON(w, "Book not found", http.StatusNotFound)
				return
			}
		}

		w.WriteHeader(http.StatusNoContent)
	}
}
