package main

import (
	"encoding/json"
	"fmt"
	gql "github.com/chanceeakin/app-for-emma/server/graph"
	mongo "github.com/chanceeakin/app-for-emma/server/mongo"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/neelance/graphql-go"
	"github.com/neelance/graphql-go/relay"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"log"
	"net/http"
	"time"
)

var schema *graphql.Schema

func graphIQL(w http.ResponseWriter, r *http.Request) {
	w.Write(gql.Page)
}

func init() {
	schema = graphql.MustParseSchema(gql.Schema, &gql.Resolver{})
}

func InitRouter(session *mgo.Session) *http.Server {
	router := mux.NewRouter()
	router.HandleFunc("/books", allBooks(session))
	router.Handle("/graphql", &relay.Handler{Schema: schema})
	router.HandleFunc("/graphiql", graphIQL)

	router.HandleFunc("/book", addBook(session))
	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Accept"})
	originsOk := handlers.AllowedOrigins([]string{"*"})

	srv := &http.Server{
		Handler:      handlers.CORS(headersOk, originsOk)(router),
		Addr:         "127.0.0.1:8080",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	return srv
}

func allBooks(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "GET" {
			http.Error(w, "Bad Request", http.StatusBadRequest)
			return
		}

		session := s.Copy()
		defer session.Close()

		c := session.DB("graphql").C("post")

		var books []mongo.Book
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
		if r.Method != "POST" {
			http.Error(w, "Bad Request", http.StatusBadRequest)
			return
		}
		session := s.Copy()
		defer session.Close()

		var book mongo.Book
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
				ErrorWithJSON(w, "Already exists!", http.StatusBadRequest)
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
