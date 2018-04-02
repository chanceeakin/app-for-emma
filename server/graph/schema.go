package graph

// Schema is the graphql schema in string form.
var Schema = `
	schema {
		query: Query
		mutation: Mutation
	}
	type Query {
		hello: String!
		books: [Book]
	}
	type Mutation {
		addBook(book: BookInput!): Book
	}
	type Author {
		FirstName: String
		LastName: String
	}
	type Book {
		ID: ID
		Title: String
		Views: Int
		Author: Author
		TestArray: [String]
	}
	input BookInput {
		Title: String!
		Views: Int!
		FirstName: String!
		LastName: String!
	}
`
