package mongo

import (
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"log"
)

// Author is a struct for a mongo document.
type Author struct {
	FirstName string `bson:"firstName"`
	LastName  string `bson:"lastName"`
}

// Tags is a blank interface for arrays.
type Tags []interface{}

// Init function
func Init(host string) {

	log.Println("Seeding mock data to MongoDB")
	session, collection := Get(host, "suggestions")
	defer session.Close()

	sess2, coll2 := Get(host, "user")
	defer sess2.Close()
	_, err := collection.RemoveAll(bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	_, err2 := coll2.RemoveAll(bson.M{})
	if err2 != nil {
		log.Fatal(err)
	}

	// Example from https://blog.golang.org
	err = collection.Insert(bson.M{"description": "Make your partner pancakes and bacon", "title": "Pancake Breakfast", "tags": Tags{"food", "breakfast"}})
	if err != nil {
		log.Fatal(err)
	}

	err2 = coll2.Insert(bson.M{"name": bson.M{"first": "Chance", "last": "Eakin"}, "email": "test@test.com", "password": "ezOYatqUE9PBr1j76Uu22OKS6hJdjGKi51IL9wTZLRLNVOvQNoclG"})
	if err2 != nil {
		log.Fatal(err2)
	}
}

// EnsureIndex verifies the index of a mongo collection.
func EnsureIndex(s *mgo.Session) {
	session := s.Copy()
	defer session.Close()

	c := session.DB("graphql").C("suggestions")

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
func Get(host string, collectionString string) (*mgo.Session, *mgo.Collection) {
	log.Println("Dialing...")
	session, err := mgo.Dial(host)
	if err != nil {
		log.Fatal(err)
	}

	collection := session.DB("graphql").C(collectionString)
	return session, collection
}

// Cleanup will remove all mock data from the database.
func Cleanup(host string) {
	log.Println("Cleaning up MongoDB...")
	session, collection := Get(host, "suggestions")
	defer session.Close()
	session2, collection2 := Get(host, "user")
	defer session2.Close()

	_, err := collection.RemoveAll(bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	_, err2 := collection2.RemoveAll(bson.M{})
	if err2 != nil {
		log.Fatal(err2)
	}

}
