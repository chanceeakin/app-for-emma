package graph

import (
	mongo "github.com/chanceeakin/app-for-emma/server/mongo"
	"github.com/neelance/graphql-go"
	"gopkg.in/mgo.v2/bson"
)

// UserResolver returns data for a user
type UserResolver struct {
	user *User
}

// NameResolver returns data for a name
type NameResolver struct {
	name *Name
}

// Name is a struct for a users' name
type Name struct {
	First string `bson:"first"`
	Last  string `bson:"last"`
}

// User is a struct for a user object
type User struct {
	ID       bson.ObjectId `bson:"_id,omitempty"`
	Name     Name          `bson:"name"`
	Email    string        `bson:"email"`
	Password string        `bson:"password"`
}

// Users resolver returns all users in a given database
func (r *Resolver) Users() (*[]*UserResolver, error) {
	session, c := mongo.Get(Host, "user")
	defer session.Close()
	var results []*UserResolver
	var users []*User
	err := c.Find(bson.M{}).All(&users)

	if err != nil {
		return nil, err
	}
	if c != nil {
		for _, summ := range users {
			results = append(results, &UserResolver{summ})
		}
		return &results, nil
	}
	return nil, nil
}

// ID returns the id for a user.
func (r *UserResolver) ID() *graphql.ID {
	id := r.user.ID.Hex()
	newID := graphql.ID(id)
	return &newID
}

// Email - UserResolver primitive
func (r *UserResolver) Email() *string {
	return &r.user.Email
}

// Password is a UserResolver primitive.
func (r *UserResolver) Password() *string {
	return &r.user.Password
}

// Name is a primitive for UserResolver
func (r *UserResolver) Name() *NameResolver {
	return &NameResolver{&r.user.Name}
}

// First - NameResolver primitive
func (r *NameResolver) First() *string {
	return &r.name.First
}

//Last - UserResolver primitive
func (r *NameResolver) Last() *string {
	return &r.name.Last
}

// UserInput for adding a user
type UserInput struct {
	ID        *string
	FirstName string
	LastName  string
	Email     string
	Password  string
}

// AddUser - resolver for adding a user to the database
func (r *Resolver) AddUser(args *struct {
	User *UserInput
}) (*UserResolver, error) {
	session, c := mongo.Get(Host, "user")
	defer session.Close()

	hash, errH := HashPassword(args.User.Password)
	if errH != nil {
		return nil, errH
	}
	var n = Name{
		First: args.User.FirstName,
		Last:  args.User.LastName,
	}
	var u = User{
		ID:       bson.NewObjectId(),
		Name:     n,
		Email:    args.User.Email,
		Password: hash,
	}
	err := c.Insert(u)
	if err != nil {
		return nil, err
	}

	return &UserResolver{&u}, nil
}

// UserUpdateInput - input struct
type UserUpdateInput struct {
	ID    string
	Field string
	Value string
}

// UpdateUser - update a user
func (r *Resolver) UpdateUser(args *struct {
	Update *UserUpdateInput
}) (*UserResolver, error) {
	session, c := mongo.Get(Host, "user")
	defer session.Close()
	var i = UserUpdateInput{
		ID:    args.Update.ID,
		Field: args.Update.Field,
		Value: args.Update.Value,
	}
	u := User{}
	query := bson.M{"_id": bson.ObjectIdHex(i.ID)}
	e := c.Find(query).One(&u)
	if e != nil {
		return nil, e
	}
	hash, errH := HashPassword(i.Value)
	if errH != nil {
		return nil, errH
	}
	var change bson.M
	if i.Field == "Password" {
		change = bson.M{"$set": bson.M{i.Field: hash}}
	} else {
		change = bson.M{"$set": bson.M{i.Field: i.Value}}
	}
	e = c.Update(query, change)
	if e != nil {
		return nil, e
	}
	er := c.Find(query).One(&u)
	if er != nil {
		return nil, e
	}
	// Check for field actually existing in doc.
	// Check for password and hash it.
	// Update the document.
	return &UserResolver{&u}, nil
}
