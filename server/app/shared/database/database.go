package database

import (
	"gopkg.in/mgo.v2"
	"log"
	"time"
)

var (
	// Mongo wrapper
	Mongo *mgo.Session
	// Database info
	databases Info
)

// Type is the type of database from a Type* constant
type Type string

const (
	// TypeMongoDB is MongoDB
	TypeMongoDB Type = "MongoDB"
)

// Info contains the database configurations
type Info struct {
	// Database type
	Type Type
	// MongoDB info if used
	MongoDB MongoDBInfo
}

// MongoDBInfo is the details for the database connection
type MongoDBInfo struct {
	URL      string
	Database string
}

func ConfigureMongo() {
	var err error

	if CheckConnection() {
		session := Mongo.Copy()
		defer session.Close()
		c := session.DB(ReadConfig().MongoDB.Database).C("user")
		index := mgo.Index{
			Key:        []string{"email"},
			Unique:     true,
			DropDups:   true,
			Background: true,
			Sparse:     true,
		}
		err = c.EnsureIndex(index)
		if err != nil {
			log.Println(err)
		}
	} else {
		log.Println(err)
	}

}

// Connect to the database
func Connect(d Info) {
	var err error

	// Store the config
	databases = d

	switch d.Type {
	case TypeMongoDB:
		// Connect to MongoDB
		if Mongo, err = mgo.DialWithTimeout(d.MongoDB.URL, 5*time.Second); err != nil {
			log.Println("MongoDB Driver Error", err)
			return
		}

		// Prevents these errors: read tcp 127.0.0.1:27017: i/o timeout
		Mongo.SetSocketTimeout(1 * time.Second)

		// Check if is alive
		if err = Mongo.Ping(); err != nil {
			log.Println("Database Error", err)
		}
	default:
		log.Println("No registered database in config")
	}
}

// CheckConnection returns true if MongoDB is available
func CheckConnection() bool {
	if Mongo == nil {
		Connect(databases)
	}

	if Mongo != nil {
		return true
	}

	return false
}

// ReadConfig returns the database information
func ReadConfig() Info {
	return databases
}
