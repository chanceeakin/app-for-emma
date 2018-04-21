package graph

import (
	mongo "github.com/chanceeakin/app-for-emma/server/mongo"
	"github.com/neelance/graphql-go"
	"gopkg.in/mgo.v2/bson"
)

type UserResolver struct {
	user *User
}

type NameResolver struct {
	name *Name
}

type Name struct {
	First string `bson:"first"`
	Last  string `bson:"last"`
}

type User struct {
	ID       bson.ObjectId `bson:"_id,omitempty"`
	Name     Name          `bson:"name"`
	Email    string        `bson:"email"`
	Password string        `bson:"password"`
}

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

func (r *UserResolver) ID() *graphql.ID {
	id := r.user.ID.Hex()
	newID := graphql.ID(id)
	return &newID
}

func (r *UserResolver) Email() *string {
	return &r.user.Email
}

func (r *UserResolver) Password() *string {
	return &r.user.Password
}

func (r *UserResolver) Name() *NameResolver {
	return &NameResolver{&r.user.Name}
}

func (r *NameResolver) First() *string {
	return &r.name.First
}

func (r *NameResolver) Last() *string {
	return &r.name.Last
}

type UserInput struct {
	ID        *string
	FirstName string
	LastName  string
	Email     string
	Password  string
}

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

type UserUpdateInput struct {
	ID    string
	Field string
	Value string
}

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
