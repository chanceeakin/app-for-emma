package graph

import (
	mongo "github.com/chanceeakin/app-for-emma/server/mongo"
	"github.com/neelance/graphql-go"
	"gopkg.in/mgo.v2/bson"
	"math/rand"
)

type SuggestionResolver struct {
	suggestion *Suggestion
}

type UpdateResolver struct {
	success Success
}

type Success struct {
	success bool
}

type Tags []*string

type Suggestion struct {
	ID          bson.ObjectId `bson:"_id,omitempty"`
	Description string        `bson:"description"`
	Title       string        `bson:"title"`
	Tags        Tags          `bson:"tags"`
}

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

func (r *SuggestionResolver) ID() graphql.ID {
	id := r.suggestion.ID.Hex()
	newID := graphql.ID(id)
	return newID
}

func (r *SuggestionResolver) Title() *string {
	return &r.suggestion.Title
}

func (r *SuggestionResolver) Description() *string {
	return &r.suggestion.Description
}

func (r *SuggestionResolver) Tags() *Tags {
	return &r.suggestion.Tags
}

type SuggestionInput struct {
	ID          *string
	Title       string
	Description string
	Tags        *Tags
}

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

func (r *UpdateResolver) Success() *bool {
	return &r.success.success
}
