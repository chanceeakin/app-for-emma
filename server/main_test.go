// main_test.go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/subosito/gotenv"
	"log"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
)

var a App

func init() {
	gotenv.Load()
}

func TestMain(m *testing.M) {
	a = App{}
	a.Initialize(os.Getenv("GO_PS_USER"), os.Getenv("GO_PS_PASSWORD"), "PositiveThoughts")
	ensureTableExists()
	code := m.Run()
	clearTable()
	os.Exit(code)
}
func ensureTableExists() {
	if _, err := a.DB.Exec(tableCreationQuery); err != nil {
		log.Fatal(err)
	}
}
func clearTable() {
	a.DB.Exec("DELETE FROM users")
	a.DB.Exec("ALTER TABLE users AUTO_INCREMENT = 1")
}

const tableCreationQuery = `CREATE TABLE IF NOT EXISTS users (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL,
    Email VARCHAR(100)
);`

func executeRequest(req *http.Request) *httptest.ResponseRecorder {
	rr := httptest.NewRecorder()
	a.Router.ServeHTTP(rr, req)

	return rr
}
func checkResponseCode(t *testing.T, expected, actual int) {
	if expected != actual {
		t.Errorf("Expected response code %d. Got %d\n", expected, actual)
	}
}

func TestEmptyTable(t *testing.T) {
	clearTable()
	req, _ := http.NewRequest("GET", "/users", nil)
	response := executeRequest(req)
	checkResponseCode(t, http.StatusOK, response.Code)
	if body := response.Body.String(); body != "[]" {
		t.Errorf("Expected an empty array. Got %s", body)
	}
}

func TestGetNonExistentUser(t *testing.T) {
	clearTable()
	req, _ := http.NewRequest("GET", "/user/45", nil)
	response := executeRequest(req)
	checkResponseCode(t, http.StatusNotFound, response.Code)
	var m map[string]string
	json.Unmarshal(response.Body.Bytes(), &m)
	if m["error"] != "User not found" {
		t.Errorf("Expected the 'error' key of the response to be set to 'User not found'. Got '%s'", m["error"])
	}
}

func TestCreateUser(t *testing.T) {
	clearTable()
	payload := []byte(`{"Username":"chance","Password":"booboo","Email":"chance@test.com"}`)
	req, _ := http.NewRequest("POST", "/user", bytes.NewBuffer(payload))
	response := executeRequest(req)
	checkResponseCode(t, http.StatusCreated, response.Code)
	var m map[string]interface{}
	json.Unmarshal(response.Body.Bytes(), &m)
	if m["Username"] != "chance" {
		t.Errorf("Expected user name to be 'chance'. Got '%v'", m["Username"])
	}
	if m["Password"] != "booboo" {
		t.Errorf("Expected password to be booboo. Got '%v'", m["Password"])
	}
	if m["Email"] != "chance@test.com" {
		t.Errorf("Expected password to be chance@test.com. Got '%v'", m["Email"])
	}
	// the ID is compared to 1.0 because JSON unmarshaling converts numbers to
	// floats, when the target is a map[string]interface{}
	if m["ID"] != 1 {
		t.Errorf("Expected user ID to be '1'. Got '%v'", m["ID"])
	}
}

func addUsers(count int) {
	if count < 1 {
		count = 1
	}
	for i := 0; i < count; i++ {
		statement := fmt.Sprintf("INSERT INTO users(Username, Password, Email) VALUES('%s')", ("chance, booboo, chance@test.com"), ((i + 1) * 10))
		a.DB.Exec(statement)
	}
}

func TestGetUser(t *testing.T) {
	clearTable()
	addUsers(1)
	req, _ := http.NewRequest("GET", "/user/1", nil)
	response := executeRequest(req)
	checkResponseCode(t, http.StatusOK, response.Code)
}

func TestUpdateUser(t *testing.T) {
	clearTable()
	addUsers(1)
	req, _ := http.NewRequest("GET", "/user/1", nil)
	response := executeRequest(req)
	var originalUser map[string]interface{}
	json.Unmarshal(response.Body.Bytes(), &originalUser)
	payload := []byte(`{"Username":"new chance who dis","Password":"booboo2"}`)
	req, _ = http.NewRequest("PUT", "/user/1", bytes.NewBuffer(payload))
	response = executeRequest(req)
	checkResponseCode(t, http.StatusOK, response.Code)
	var m map[string]interface{}
	json.Unmarshal(response.Body.Bytes(), &m)
	if m["ID"] != originalUser["ID"] {
		t.Errorf("Expected the ID to remain the same (%v). Got %v", originalUser["ID"], m["ID"])
	}
	if m["Username"] == originalUser["Username"] {
		t.Errorf("Expected the name to change from '%v' to '%v'. Got '%v'", originalUser["Username"], m["Username"], m["Username"])
	}
	if m["Password"] == originalUser["Password"] {
		t.Errorf("Expected the age to change from '%v' to '%v'. Got '%v'", originalUser["Password"], m["Password"], m["Password"])
	}
}

func TestDeleteUser(t *testing.T) {
	clearTable()
	addUsers(1)
	req, _ := http.NewRequest("GET", "/user/1", nil)
	response := executeRequest(req)
	checkResponseCode(t, http.StatusOK, response.Code)
	req, _ = http.NewRequest("DELETE", "/user/1", nil)
	response = executeRequest(req)
	checkResponseCode(t, http.StatusOK, response.Code)
	req, _ = http.NewRequest("GET", "/user/1", nil)
	response = executeRequest(req)
	checkResponseCode(t, http.StatusNotFound, response.Code)
}
