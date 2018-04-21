package graph

// Schema is the graphql schema in string form.
var Schema = `
	schema {
		query: Query
		mutation: Mutation
	}
	type Query {
		hello: String!
		users: [User]
		suggestions: [Suggestion]
		suggestion(id: ID!): Suggestion
		randomSuggestion(): Suggestion
	}
	type Mutation {
		addUser(user: UserInput!): User
		updateUser(update: UserUpdateInput!): User
		addSuggestion(suggestion: SuggestionInput!): Suggestion
		removeSuggestion(id: ID!): Success!
	}
	input UserInput {
		ID: ID
		FirstName: String!
		LastName: String!
		Email: String!
		Password: String!
	}
	input UserUpdateInput {
		ID: ID!
		Field: String!
		Value: String!
	}
	type User {
		ID: ID
		Email: String
		Name: Name
		Password: String
	}
	type Name {
		First: String
		Last: String
	}
	type Suggestion {
		id: ID!
		title: String
		description: String
		tags: [String]
	}
	input SuggestionInput {
		title: String!
		description: String!
		tags: [String]
	}
	type Success {
		success: Boolean
	}
`
