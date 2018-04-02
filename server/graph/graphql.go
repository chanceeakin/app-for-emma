// Package graph contains the graphql resolvers.
package graph

import (
	mongo "github.com/chanceeakin/app-for-emma/server/mongo"
	"github.com/neelance/graphql-go"
	"gopkg.in/mgo.v2/bson"
)

const host string = "localhost"

// Resolver is the bare resolver struct.
type Resolver struct{}

// Hello is a test query.
func (r *Resolver) Hello() string {
	return "Hello world!"
}

// BookResolver is a resolver for books.
type BookResolver struct {
	book *Book
}

// AuthorResolver is a resolver for authors
type AuthorResolver struct {
	author *Author
}

type Author struct {
	FirstName string `bson:"firstName"`
	LastName  string `bson:"lastName"`
}

type Iterable []*string

// Book is a mongo struct.
type Book struct {
	ID        bson.ObjectId `bson:"_id,omitempty"`
	Title     string        `bson:"title"`
	Views     int32         `bson:"views"`
	Author    Author        `bson:"author"`
	TestArray Iterable      `bson:"testArray,omitempty"`
}

// Books resolves books
func (r *Resolver) Books() (*[]*BookResolver, error) {
	session, c := mongo.Get(host)
	defer session.Close()
	var results []*BookResolver
	var books []*Book
	err := c.Find(bson.M{}).All(&books)

	if err != nil {
		return nil, err
	}
	if c != nil {
		for _, summ := range books {
			results = append(results, &BookResolver{summ})
		}
		return &results, nil
	}
	return nil, nil
}

// ID resolves ID
func (r *BookResolver) ID() *graphql.ID {
	id := r.book.ID.Hex()
	newID := graphql.ID(id)
	return &newID
}

// Title resolves a book's title.
func (r *BookResolver) Title() *string {
	return &r.book.Title
}

// Views resolves views
func (r *BookResolver) Views() *int32 {
	return &r.book.Views
}

// Author resolves firstnames
func (r *BookResolver) Author() *AuthorResolver {
	return &AuthorResolver{&r.book.Author}
}

// FirstName resolves alstnames
func (r *AuthorResolver) FirstName() *string {
	return &r.author.FirstName
}

// LastName resolves alstnames
func (r *AuthorResolver) LastName() *string {
	return &r.author.LastName
}

func (r *BookResolver) TestArray() *Iterable {
	return &r.book.TestArray
}

type BookInput struct {
	Title     string
	Views     int32
	FirstName string
	LastName  string
}

func (r *Resolver) AddBook(args *struct {
	Book *BookInput
}) (*BookResolver, error) {
	session, c := mongo.Get(host)
	defer session.Close()
	var a = Author{
		FirstName: args.Book.FirstName,
		LastName:  args.Book.LastName,
	}
	var b = Book{
		ID:     bson.NewObjectId(),
		Title:  args.Book.Title,
		Views:  args.Book.Views,
		Author: a,
	}
	err := c.Insert(b)
	if err != nil {
		return nil, err
	}

	return &BookResolver{&b}, nil
}
