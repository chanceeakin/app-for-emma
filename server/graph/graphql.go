// Package graph contains the graphql resolvers.
package graph

// Host is the host string for the database
const Host string = "localhost"

// Resolver is the bare resolver struct.
type Resolver struct{}

// Hello is a test query.
func (r *Resolver) Hello() string {
	return "World!"
}
