package controller

import (
	"encoding/json"
	log "github.com/sirupsen/logrus"
	"net/http"

	"github.com/chanceeakin/app-for-emma/server/app/model"
	"github.com/chanceeakin/app-for-emma/server/app/shared/passhash"
	"github.com/chanceeakin/app-for-emma/server/app/shared/response"
	"github.com/chanceeakin/app-for-emma/server/app/shared/session"
	"gopkg.in/mgo.v2/bson"
)

// EmailInput is the expected data shape for a login attempt from an iPhone.
type EmailInput struct {
	Id    bson.ObjectId `json:"id"`
	Email string        `json:"email"`
}

// IphoneUpdateEmailPATCH updates a given users' email
func IphoneUpdateEmailPATCH(w http.ResponseWriter, r *http.Request) {
	// Get session
	sess := session.Instance(r)
	var err error
	var u EmailInput

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&u); err != nil {
		log.Println(err)
		response.SendError(w, http.StatusBadRequest, "An error occured")
		return
	}
	// Prevent brute force login attempts by not hitting MySQL and pretending like it was invalid :-)
	if sess.Values["id"] == nil || sess.Values["id"] != u.Id.Hex() {
		log.Println("session mismatch")
		response.SendError(w, http.StatusForbidden, "Session mismatch")
		return
	}
	// Get database result
	err = model.UpdateEmail(u.Id, u.Email)
	if err != nil {
		// Display error message
		log.Println(err)
		response.SendError(w, http.StatusInternalServerError, "An error occurred")
	}
	response.SendSuccess(w, "Email Updated!", 200, true)
	return
}

// PasswordInput is the struct for updating a password
type PasswordInput struct {
	Id          bson.ObjectId `json:"id"`
	OldPassword string        `json:"oldPassword"`
	NewPassword string        `json:"newPassword"`
}

// IphoneUpdateEmailPATCH updates a given users' email
func IphoneUpdatePasswordPATCH(w http.ResponseWriter, r *http.Request) {
	var err error
	// Get session
	sess := session.Instance(r)

	var p PasswordInput

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&p); err != nil {
		log.Println(err)
		response.SendError(w, http.StatusBadRequest, "An error occured")
		return
	}
	// Prevent brute force login attempts by not hitting MySQL and pretending like it was invalid :-)
	if sess.Values["id"] == nil || sess.Values["id"] != p.Id {
		log.Println("session mismatch")
		response.SendError(w, http.StatusForbidden, "Session mismatch")
		return
	}

	result, err := model.UserByID(p.Id)
	oldHash := passhash.MatchString(result.Password, p.OldPassword)

	if !oldHash {
		log.Println("Invalid Password")
		response.SendError(w, http.StatusForbidden, "Invalid Password")
		return
	}

	newHash, err := passhash.HashString(p.NewPassword)
	if err != nil {
		log.Println(err)
		response.SendError(w, http.StatusInternalServerError, "Server Error.")
		return
	}

	// Get database result
	err = model.UpdatePassword(p.Id, newHash)

	if err != nil {
		// Display error message
		log.Println(err)
		response.SendError(w, http.StatusInternalServerError, "An error occurred")
	}
	response.SendSuccess(w, "Password Updated!", 200, true)
	return
}
