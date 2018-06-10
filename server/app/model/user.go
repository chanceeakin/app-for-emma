package model

import (
	"github.com/chanceeakin/app-for-emma/server/app/shared/database"
	"gopkg.in/mgo.v2/bson"
	"time"
)

// *****************************************************************************
// User
// *****************************************************************************

// User table contains the information for each user
type User struct {
	ObjectID  bson.ObjectId `bson:"_id"`
	ID        uint32        `db:"id" bson:"id,omitempty"` // Don't use Id, use UserID() instead for consistency with MongoDB
	FirstName string        `db:"first_name" bson:"first_name"`
	LastName  string        `db:"last_name" bson:"last_name"`
	Email     string        `db:"email" bson:"email"`
	Password  string        `db:"password" bson:"password"`
	StatusID  uint8         `db:"status_id" bson:"status_id"`
	CreatedAt time.Time     `db:"created_at" bson:"created_at"`
	UpdatedAt time.Time     `db:"updated_at" bson:"updated_at"`
	Deleted   uint8         `db:"deleted" bson:"deleted"`
	Role      string        `db:"role" bson:"role"`
}

// UserID returns the user id
func (u *User) UserID() string {
	r := u.ObjectID.Hex()
	return r
}

// UserByEmail gets user information from email
func UserByEmail(email string) (User, error) {
	var err error

	result := User{}

	if database.CheckConnection() {
		session := database.Mongo.Copy()
		defer session.Close()
		c := session.DB(database.ReadConfig().MongoDB.Database).C("user")
		err = c.Find(bson.M{"email": email}).One(&result)
	} else {
		err = ErrUnavailable
	}

	return result, standardizeError(err)
}

// UserCreate creates user
func UserCreate(firstName, lastName, email, password string) error {
	var err error

	now := time.Now()

	if database.CheckConnection() {
		session := database.Mongo.Copy()
		defer session.Close()
		c := session.DB(database.ReadConfig().MongoDB.Database).C("user")

		user := &User{
			ObjectID:  bson.NewObjectId(),
			FirstName: firstName,
			LastName:  lastName,
			Email:     email,
			Password:  password,
			StatusID:  1,
			CreatedAt: now,
			UpdatedAt: now,
			Deleted:   0,
			Role:      "User",
		}
		err = c.Insert(user)
	} else {
		err = ErrUnavailable
	}
	return standardizeError(err)
}
