package graph

import (
	mongo "github.com/chanceeakin/app-for-emma/server/mongo"
	"github.com/neelance/graphql-go"
	"gopkg.in/mgo.v2/bson"
	"math/rand"
)

// SuggestionResolver returns the struct for dealing with suggestions
type SuggestionResolver struct {
	suggestion *Suggestion
}

// UpdateResolver returns the struct for success or failure
type UpdateResolver struct {
	success Success
}

// Success contains a boolean.
type Success struct {
	success bool
}

// Tags is a slice of string pointers
type Tags []*string

// Suggestion is the struct of data that makes up a suggestion.
type Suggestion struct {
	ID          bson.ObjectId `bson:"_id,omitempty"`
	Description string        `bson:"description"`
	Title       string        `bson:"title"`
	Tags        Tags          `bson:"tags"`
}

// Suggestions returns all suggestions in the database
func (r *Resolver) Suggestions() (*[]*SuggestionResolver, error) {
	session, c := mongo.Get(Host, "suggestions")
	defer session.Close()
	var results []*SuggestionResolver
	var suggestions []*Suggestion
	err := c.Find(bson.M{}).All(&suggestions)

	if err != nil {
		return nil, err
	}

	if c != nil {
		for _, sum := range suggestions {
			results = append(results, &SuggestionResolver{sum})
		}
		return &results, nil
	}
	return nil, nil
}

// Suggestion returns a single suggestion
func (r *Resolver) Suggestion(args *struct {
	ID string
}) (*SuggestionResolver, error) {
	session, c := mongo.Get(Host, "suggestions")
	defer session.Close()
	var result *SuggestionResolver
	var suggestion *Suggestion
	err := c.FindId(bson.ObjectIdHex(args.ID)).One(&suggestion)

	if err != nil {
		return nil, err
	}

	if c != nil {
		result = &SuggestionResolver{suggestion}
		return result, nil
	}
	return nil, nil
}

// RandomSuggestion returns a single random suggestion
func (r *Resolver) RandomSuggestion() (*SuggestionResolver, error) {
	session, c := mongo.Get(Host, "suggestions")
	defer session.Close()
	var result *SuggestionResolver
	var suggestion *Suggestion
	count, err := c.Count()
	if err != nil {
		return nil, err
	}
	// obviously slow. but with < 10000 anticipated records...
	rando := rand.Intn(count)
	err1 := c.Find(bson.M{}).Limit(1).Skip(rando).One(&suggestion)

	if err1 != nil {
		return nil, err1
	}

	if c != nil {
		result = &SuggestionResolver{suggestion}
		return result, nil
	}
	return nil, nil
}

// ID is a SuggestionResolver primitive
func (r *SuggestionResolver) ID() graphql.ID {
	id := r.suggestion.ID.Hex()
	newID := graphql.ID(id)
	return newID
}

// Title is a SuggestionResolver primitive
func (r *SuggestionResolver) Title() *string {
	return &r.suggestion.Title
}

// Description is a SuggestionResolver primitive
func (r *SuggestionResolver) Description() *string {
	return &r.suggestion.Description
}

// Tags returns a slice of tags
func (r *SuggestionResolver) Tags() *Tags {
	return &r.suggestion.Tags
}

// SuggestionInput takes in added suggestion
type SuggestionInput struct {
	ID          *string
	Title       string
	Description string
	Tags        *Tags
}

// AddSuggestion adds a suggestion
func (r *Resolver) AddSuggestion(args *struct {
	Suggestion *SuggestionInput
}) (*SuggestionResolver, error) {
	session, c := mongo.Get(Host, "suggestions")
	defer session.Close()

	var s = Suggestion{
		ID:          bson.NewObjectId(),
		Title:       args.Suggestion.Title,
		Description: args.Suggestion.Description,
		Tags:        *args.Suggestion.Tags,
	}
	err := c.Insert(s)
	if err != nil {
		return nil, err
	}

	return &SuggestionResolver{&s}, nil
}

// RemoveSuggestion deletes a suggestion
func (r *Resolver) RemoveSuggestion(args *struct {
	ID string
}) (*UpdateResolver, error) {
	session, c := mongo.Get(Host, "suggestions")
	defer session.Close()
	err := c.Remove(bson.M{"_id": bson.ObjectIdHex(args.ID)})
	if err != nil {
		return nil, err
	}
	t := Success{success: true}
	return &UpdateResolver{t}, nil
}

// Success returns an UpdateResolver primitive
func (r *UpdateResolver) Success() *bool {
	return &r.success.success
}
