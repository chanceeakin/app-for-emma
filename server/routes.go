package main

import (
	gql "github.com/chanceeakin/app-for-emma/server/graph"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/neelance/graphql-go"
	"github.com/neelance/graphql-go/relay"

	"gopkg.in/mgo.v2"
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

// InitRouter initializes the router function.
func InitRouter(session *mgo.Session) *http.Server {
	router := mux.NewRouter()
	router.Handle("/graphql", &relay.Handler{Schema: schema})
	router.HandleFunc("/graphiql", graphIQL)

	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Accept"})
	originsOk := handlers.AllowedOrigins([]string{"*"})

	srv := &http.Server{
		Handler:      handlers.CORS(headersOk, originsOk)(router),
		Addr:         Host + ":8080",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	return srv
}
