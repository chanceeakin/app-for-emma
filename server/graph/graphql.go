// Package graph contains the graphql resolvers.
package graph

const Host string = "localhost"

// Resolver is the bare resolver struct.
type Resolver struct{}

// Hello is a test query.
func (r *Resolver) Hello() string {
	return "World!"
}
