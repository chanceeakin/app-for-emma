package controller

import (
	"app/model"
	"app/shared/response"
	"app/shared/session"
	"app/shared/view"
	"github.com/gorilla/context"
	"github.com/josephspurrier/csrfbanana"
	"github.com/julienschmidt/httprouter"
	"log"
	"net/http"
	"strings"
)

const (
	SuggestionFound   = "Suggestion Found"
	SuggestionCreated = "Suggestion created"
	FriendlyError     = "an error occurred, please try again later"
)

// RandomSuggestion grabs a random suggestion
func RandomSuggestion(w http.ResponseWriter, r *http.Request) {
	// Get session
	notes, err := model.FindRandomSuggestion()
	if err != nil {
		log.Println(err)
		response.SendError(w, http.StatusInternalServerError, FriendlyError)
		return
	}
	response.SendJSON(w, notes)
}

// SuggestionReadGET displays the suggestions in the app.
func SuggestionReadGET(w http.ResponseWriter, r *http.Request) {
	// Get session

	suggestions, err := model.SuggestionAll()
	if err != nil {
		log.Println(err)
		suggestions = []model.Suggestion{}
	}

	// Display the view
	v := view.New(r)
	v.Name = "suggestion/read"
	v.Vars["suggestions"] = suggestions
	v.Render(w)
}

// SuggestionCreateGET displays the suggestion creation page
func SuggestionCreateGET(w http.ResponseWriter, r *http.Request) {
	// Get session
	sess := session.Instance(r)

	// Display the view
	v := view.New(r)
	v.Name = "suggestion/create"
	v.Vars["token"] = csrfbanana.Token(w, r, sess)
	v.Render(w)
}

// SuggestionCreatePOST handles the note creation form submission
func SuggestionCreatePOST(w http.ResponseWriter, r *http.Request) {
	// Get session
	sess := session.Instance(r)

	// Validate with required fields
	if validate, missingField := view.Validate(r, []string{"title", "tags", "description"}); !validate {
		sess.AddFlash(view.Flash{"Field missing: " + missingField, view.FlashError})
		sess.Save(r, w)
		SuggestionCreateGET(w, r)
		return
	}

	// Get form values
	title := r.FormValue("title")
	description := r.FormValue("description")
	tags := strings.Fields(r.FormValue("tags"))

	// Get database result
	err := model.SuggestionCreate(description, title, tags)
	// Will only error if there is a problem with the query
	if err != nil {
		log.Println(err)
		sess.AddFlash(view.Flash{"An error occurred on the server. Please try again later.", view.FlashError})
		sess.Save(r, w)
	} else {
		sess.AddFlash(view.Flash{"Suggestion added!", view.FlashSuccess})
		sess.Save(r, w)
		http.Redirect(w, r, "/suggestions", http.StatusFound)
		return
	}

	// Display the same page
	NotepadCreateGET(w, r)
}

// SuggestionUpdateGET displays the note update page
func SuggestionUpdateGET(w http.ResponseWriter, r *http.Request) {
	// Get session
	sess := session.Instance(r)

	// Get the note id
	var params httprouter.Params
	params = context.Get(r, "params").(httprouter.Params)
	suggestionID := params.ByName("id")

	// Get the note
	suggestion, err := model.SuggestionByID(suggestionID)
	if err != nil { // If the note doesn't exist
		log.Println(err)
		sess.AddFlash(view.Flash{"An error occurred on the server. Please try again later.", view.FlashError})
		sess.Save(r, w)
		http.Redirect(w, r, "/suggestions", http.StatusFound)
		return
	}

	// Display the view
	v := view.New(r)
	v.Name = "suggestion/update"
	v.Vars["token"] = csrfbanana.Token(w, r, sess)
	v.Vars["title"] = suggestion.Title
	v.Vars["description"] = suggestion.Description
	v.Vars["tags"] = suggestion.Tags
	v.Render(w)
}

// SuggestionUpdatePOST handles the note update form submission
func SuggestionUpdatePOST(w http.ResponseWriter, r *http.Request) {
	// Get session
	sess := session.Instance(r)

	// Validate with required fields
	if validate, missingField := view.Validate(r, []string{"title", "description", "tags"}); !validate {
		sess.AddFlash(view.Flash{"Field missing: " + missingField, view.FlashError})
		sess.Save(r, w)
		NotepadUpdateGET(w, r)
		return
	}

	// Get form values
	title := r.FormValue("title")
	description := r.FormValue("description")
	tags := strings.Fields(r.FormValue("tags"))

	var params httprouter.Params
	params = context.Get(r, "params").(httprouter.Params)
	suggestionID := params.ByName("id")

	// Get database result
	err := model.SuggestionUpdate(title, description, tags, suggestionID) // Will only error if there is a problem with the query
	if err != nil {
		log.Println(err)
		sess.AddFlash(view.Flash{"An error occurred on the server. Please try again later.", view.FlashError})
		sess.Save(r, w)
	} else {
		sess.AddFlash(view.Flash{"Note updated!", view.FlashSuccess})
		sess.Save(r, w)
		http.Redirect(w, r, "/suggestions", http.StatusFound)
		return
	}

	// Display the same page
	NotepadUpdateGET(w, r)
}

// SuggestionDeleteGET handles the note deletion
func SuggestionDeleteGET(w http.ResponseWriter, r *http.Request) {
	// Get session
	sess := session.Instance(r)

	var params httprouter.Params
	params = context.Get(r, "params").(httprouter.Params)
	suggestionID := params.ByName("id")

	// Get database result
	err := model.SuggestionDelete(suggestionID)
	// Will only error if there is a problem with the query
	if err != nil {
		log.Println(err)
		sess.AddFlash(view.Flash{"An error occurred on the server. Please try again later.", view.FlashError})
		sess.Save(r, w)
	} else {
		sess.AddFlash(view.Flash{"Suggestion deleted!", view.FlashSuccess})
		sess.Save(r, w)
	}

	http.Redirect(w, r, "/suggestions", http.StatusFound)
	return
}

// // SuggestionCreate is the controller for creating a suggestion and adding it to the DB
// func SuggestionCreatePOST(w http.ResponseWriter, r *http.Request) {
// 	var s model.Suggestion
// 	decoder := json.NewDecoder(r.Body)
// 	fmt.Print(r.Body)
// 	if err := decoder.Decode(&s); err != nil {
// 		response.SendError(w, http.StatusBadRequest, FriendlyError)
// 		return
// 	}
// 	defer r.Body.Close()
// 	fmt.Print(&s)
//
// 	err := model.SuggestionCreate(s.Description, s.Title, s.Tags)
// 	if err != nil {
// 		response.SendError(w, http.StatusInternalServerError, err.Error())
// 		return
// 	}
//
// 	response.SendJSON(w, SuggestionCreated)
// 	// response.SendError(w, http.StatusBadRequest, FriendlyError)
//
// }
