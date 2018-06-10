package main

import (
	mongo "github.com/chanceeakin/app-for-emma/server/mongo"
	"gopkg.in/mgo.v2"
	"log"
	"os"
	"os/signal"
	"syscall"
)

// Host is the current host string.
const Host string = "0.0.0.0"

func init() {
	mongo.Init(Host)
}

func main() {
	session, err := mgo.Dial(Host)
	if err != nil {
		panic(err)
	}
	defer session.Close()

	session.SetMode(mgo.Monotonic, true)
	mongo.EnsureIndex(session)
	router := InitRouter(session)
	go func() {
		log.Print("Starting GraphQL Server on http://" + Host + ":8080/")
		log.Fatal(router.ListenAndServe())
	}()

	signalChan := make(chan os.Signal, 1)
	cleanupDone := make(chan bool)
	signal.Notify(signalChan, os.Interrupt, syscall.SIGTERM, syscall.SIGKILL)
	go func() {
		for _ = range signalChan {
			log.Println("Received an interrupt, stopping the server...")
			mongo.Cleanup(Host)
			cleanupDone <- true
		}
	}()

	<-cleanupDone

}
