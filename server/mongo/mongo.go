package mongo

import (
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"log"
	"math/rand"
	"time"
)

// Author is a struct for a mongo document.
type Author struct {
	FirstName string `bson:"firstName"`
	LastName  string `bson:"lastName"`
}

// Iterable is a blank interface for arrays.
type Iterable []interface{}

// Book is a mongo struct.
type Book struct {
	ID        bson.ObjectId `bson:"_id,omitempty"`
	Title     string        `bson:"title"`
	Views     int32         `bson:"views"`
	Author    Author        `bson:"author"`
	TestArray Iterable      `bson:"testArray,omitempty"`
}

func Init(host string) {
	s1 := rand.NewSource(time.Now().UnixNano())
	r1 := rand.New(s1)

	log.Println("Seeding mock data to MongoDB")
	session, collection := Get(host)
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
		bson.M{"title": "Errors are values", "views": r1.Intn(100), "author": bson.M{"firstName": "Rob", "lastName": "Pike"}, "testArray": Iterable{"1", "2"}})
	if err != nil {
		log.Fatal(err)
	}
}

func EnsureIndex(s *mgo.Session) {
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

//Get returns the session and a reference to the post collection.
func Get(host string) (*mgo.Session, *mgo.Collection) {
	log.Println("Dialing...")
	session, err := mgo.Dial(host)
	if err != nil {
		log.Fatal(err)
	}

	collection := session.DB("graphql").C("post")
	return session, collection
}

// Cleanup will remove all mock data from the database.
func Cleanup(host string) {
	log.Println("Cleaning up MongoDB...")
	session, collection := Get(host)
	defer session.Close()

	_, err := collection.RemoveAll(bson.M{})
	if err != nil {
		log.Fatal(err)
	}
}
