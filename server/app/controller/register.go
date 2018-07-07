package controller

import (
	"encoding/json"
	log "github.com/sirupsen/logrus"
	"net/http"

	"github.com/chanceeakin/app-for-emma/server/app/model"
	"github.com/chanceeakin/app-for-emma/server/app/shared/passhash"
	"github.com/chanceeakin/app-for-emma/server/app/shared/recaptcha"
	"github.com/chanceeakin/app-for-emma/server/app/shared/response"
	"github.com/chanceeakin/app-for-emma/server/app/shared/session"
	"github.com/chanceeakin/app-for-emma/server/app/shared/view"
	"github.com/josephspurrier/csrfbanana"
)

// RegisterGET displays the register page
func RegisterGET(w http.ResponseWriter, r *http.Request) {
	// Get session
	sess := session.Instance(r)

	// Display the view
	v := view.New(r)
	v.Name = "register/register"
	v.Vars["token"] = csrfbanana.Token(w, r, sess)
	// Refill any form fields
	view.Repopulate([]string{"first_name", "last_name", "email"}, r.Form, v.Vars)
	v.Render(w)
}

// RegisterPOST handles the registration form submission
func RegisterPOST(w http.ResponseWriter, r *http.Request) {
	// Get session
	sess := session.Instance(r)

	// Prevent brute force login attempts by not hitting MySQL and pretending like it was invalid :-)
	if sess.Values["register_attempt"] != nil && sess.Values["register_attempt"].(int) >= 5 {
		log.Println("Brute force register prevented")
		http.Redirect(w, r, "/register", http.StatusFound)
		return
	}

	// Validate with required fields
	if validate, missingField := view.Validate(r, []string{"first_name", "last_name", "email", "password"}); !validate {
		sess.AddFlash(view.Flash{"Field missing: " + missingField, view.FlashError})
		sess.Save(r, w)
		RegisterGET(w, r)
		return
	}

	// Validate with Google reCAPTCHA
	if !recaptcha.Verified(r) {
		sess.AddFlash(view.Flash{"reCAPTCHA invalid!", view.FlashError})
		sess.Save(r, w)
		RegisterGET(w, r)
		return
	}

	// Get form values
	firstName := r.FormValue("first_name")
	lastName := r.FormValue("last_name")
	email := r.FormValue("email")
	password, errp := passhash.HashString(r.FormValue("password"))

	// If password hashing failed
	if errp != nil {
		log.Println(errp)
		sess.AddFlash(view.Flash{"An error occurred on the server. Please try again later.", view.FlashError})
		sess.Save(r, w)
		http.Redirect(w, r, "/register", http.StatusFound)
		return
	}

	// Get database result
	_, err := model.UserByEmail(email)

	if err == model.ErrNoResult { // If success (no user exists with that email)
		ex := model.UserCreate(firstName, lastName, email, password)
		// Will only error if there is a problem with the query
		if ex != nil {
			log.Println(ex)
			sess.AddFlash(view.Flash{"An error occurred on the server. Please try again later.", view.FlashError})
			sess.Save(r, w)
		} else {
			sess.AddFlash(view.Flash{"Account created successfully for: " + email, view.FlashSuccess})
			sess.Save(r, w)
			http.Redirect(w, r, "/login", http.StatusFound)
			return
		}
	} else if err != nil { // Catch all other errors
		log.Println(err)
		sess.AddFlash(view.Flash{"An error occurred on the server. Please try again later.", view.FlashError})
		sess.Save(r, w)
	} else { // Else the user already exists
		sess.AddFlash(view.Flash{"Account already exists for: " + email, view.FlashError})
		sess.Save(r, w)
	}

	// Display the page
	RegisterGET(w, r)
}

type UserInput struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

type success struct {
	ok bool
}

func IPhoneSignupGET(w http.ResponseWriter, r *http.Request) {
	sess := session.Instance(r)
	// Prevent brute force login attempts by not hitting MySQL and pretending like it was invalid :-)
	if sess.Values["register_attempt"] != nil && sess.Values["register_attempt"].(int) >= 5 {
		log.Println("Brute force register prevented")
		response.SendError(w, http.StatusForbidden, "Brute Force Register prevented.")
		return
	}
	token := csrfbanana.Token(w, r, sess)

	w.Header().Set("csrf_token", token)
	success := &success{ok: true}

	response.SendJSON(w, success)
}

// IPhoneSignupPOST handles the registration form submission
func IPhoneSignupPOST(w http.ResponseWriter, r *http.Request) {
	// Get session
	sess := session.Instance(r)

	// Prevent brute force login attempts by not hitting MySQL and pretending like it was invalid :-)
	if sess.Values["register_attempt"] != nil && sess.Values["register_attempt"].(int) >= 5 {
		log.Println("Brute force register prevented")
		response.SendError(w, http.StatusForbidden, "Brute Force Register prevented.")
		return
	}

	// Get form values
	var u UserInput
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&u); err != nil {
		log.Println(err)
		response.SendError(w, http.StatusBadRequest, "An error occured")
		return
	}
	firstName := u.FirstName
	lastName := u.LastName
	email := u.Email
	password, errp := passhash.HashString(u.Password)
	log.Println(u)

	// If password hashing failed
	if errp != nil {
		log.Println(errp)
		response.SendError(w, http.StatusInternalServerError, "An error occurred")
		return
	}

	// Get database result
	_, err := model.UserByEmail(email)

	if err == model.ErrNoResult { // If success (no user exists with that email)
		ex := model.UserCreate(firstName, lastName, email, password)
		// Will only error if there is a problem with the query
		if ex != nil {
			log.Println(ex)
			response.SendError(w, http.StatusInternalServerError, "An error occurred")
		} else {
			response.Send(w, http.StatusCreated, "User created", 0, nil)
			return
		}
	} else if err != nil { // Catch all other errors
		log.Println(err)
		response.SendError(w, http.StatusInternalServerError, "An error occurred")
		sess.Save(r, w)
	} else { // Else the user already exists
		response.SendError(w, http.StatusBadRequest, "User already exists")
	}
}
