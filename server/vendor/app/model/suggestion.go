package model

import (
	"app/shared/database"
	"fmt"
	"gopkg.in/mgo.v2/bson"
	"time"
)

// Tags is a slice of string pointers
type Tags []string

// Suggestion is the struct of data that makes up a suggestion.
type Suggestion struct {
	ID          bson.ObjectId `bson:"_id,omitempty"`
	Description string        `db:"description" bson:"description"`
	Title       string        `db:"title" bson:"title"`
	Tags        Tags          `db:"tags" bson:"tags"`
	CreatedAt   time.Time     `db:"created_at" bson:"created_at"`
	UpdatedAt   time.Time     `db:"updated_at" bson:"updated_at"`
	Deleted     uint8         `db:"deleted" bson:"deleted"`
}

// SuggestionID returns the ID
func (s *Suggestion) SuggestionID() string {
	r := s.ID.Hex()
	return r
}

// FindRandomSuggestion returns a random suggestion from the database.
func FindRandomSuggestion() (Suggestion, error) {
	var err error

	result := []Suggestion{}

	if database.CheckConnection() {
		session := database.Mongo.Copy()
		defer session.Close()
		c := session.DB(database.ReadConfig().MongoDB.Database).C("suggestion")
		pipe := c.Pipe([]bson.M{{"$sample": bson.M{"size": 1}}})
		err = pipe.All(&result)
	} else {
		err = ErrUnavailable
	}

	return result[0], standardizeError(err)
}

// SuggestionByID gets a suggestion by ID
func SuggestionByID(suggestionID string) (Suggestion, error) {
	var err error

	result := Suggestion{}

	if database.CheckConnection() {
		// Create a copy of mongo
		session := database.Mongo.Copy()
		defer session.Close()
		c := session.DB(database.ReadConfig().MongoDB.Database).C("suggestion")

		// Validate the object id
		if bson.IsObjectIdHex(suggestionID) {
			err = c.FindId(bson.ObjectIdHex(suggestionID)).One(&result)
		} else {
			err = ErrNoResult
		}
	} else {
		err = ErrUnavailable
	}

	return result, standardizeError(err)
}

// SuggestionAll gets a suggestion by ID
func SuggestionAll() ([]Suggestion, error) {
	var err error

	result := []Suggestion{}

	if database.CheckConnection() {
		// Create a copy of mongo
		session := database.Mongo.Copy()
		defer session.Close()
		c := session.DB(database.ReadConfig().MongoDB.Database).C("suggestion")

		// Validate the object id
		err = c.Find(nil).All(&result)
	} else {
		err = ErrUnavailable
	}

	return result, standardizeError(err)
}

// SuggestionCreate creates a suggestion record in the database.
func SuggestionCreate(description string, title string, tags []string) error {
	var err error
	fmt.Print("In create suggestion")

	now := time.Now()

	if database.CheckConnection() {
		session := database.Mongo.Copy()
		defer session.Close()
		c := session.DB(database.ReadConfig().MongoDB.Database).C("suggestion")

		sugg := &Suggestion{
			ID:          bson.NewObjectId(),
			Description: description,
			Title:       title,
			Tags:        tags,
			CreatedAt:   now,
			UpdatedAt:   now,
		}
		err = c.Insert(sugg)
	} else {
		err = ErrUnavailable
	}
	return standardizeError(err)
}

// SuggestionUpdate updates a suggestion
func SuggestionUpdate(title string, description string, tags []string, suggestionID string) error {
	var err error

	now := time.Now()

	if database.CheckConnection() {
		// Create a copy of mongo
		session := database.Mongo.Copy()
		defer session.Close()
		c := session.DB(database.ReadConfig().MongoDB.Database).C("suggestion")
		var suggestion Suggestion
		suggestion, err = SuggestionByID(suggestionID)
		if err == nil {
			// Confirm the owner is attempting to modify the note
			suggestion.UpdatedAt = now
			suggestion.Title = title
			suggestion.Description = description
			suggestion.Tags = tags
			err = c.UpdateId(bson.ObjectIdHex(suggestionID), &suggestion)
		}
	} else {
		err = ErrUnavailable
	}
	return standardizeError(err)
}

// SuggestionDelete deletes a note
func SuggestionDelete(suggestionID string) error {
	var err error

	if database.CheckConnection() {
		// Create a copy of mongo
		session := database.Mongo.Copy()
		defer session.Close()
		c := session.DB(database.ReadConfig().MongoDB.Database).C("suggestion")

		err = c.RemoveId(bson.ObjectIdHex(suggestionID))
	} else {
		err = ErrUnavailable
	}
	return standardizeError(err)
}
