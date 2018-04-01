// model.go
package main

import (
	"database/sql"
	"fmt"
	"golang.org/x/crypto/bcrypt"
)

type user struct {
	ID       int    `json:"ID"`
	Username string `json:"Username"`
	Password string `json:"Password"`
	Email    string `json:"Email"`
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func (u *user) getUser(db *sql.DB) error {
	statement := fmt.Sprintf("SELECT Username, Password, Email FROM users WHERE ID=%d", u.ID)
	return db.QueryRow(statement).Scan(&u.Username, &u.Password, &u.Email)
}

func (u *user) retrieveUserByEmail(db *sql.DB) error {
	statement := fmt.Sprintf("SELECT ID, Username, Password, Email FROM users WHERE Email='%v'", u.Email)
	return db.QueryRow(statement).Scan(&u.ID, &u.Username, &u.Password, &u.Email)
}

func (u *user) updateUser(db *sql.DB) error {
	hash, err1 := HashPassword(u.Password)
	if err1 != nil {
		return err1
	}
	u.Password = hash

	statement := fmt.Sprintf("UPDATE users SET Username='%s', Password='%s', Email='%s' WHERE ID=%d", u.Username, u.Password, u.Email, u.ID)
	_, err := db.Exec(statement)
	return err
}

func (u *user) deleteUser(db *sql.DB) error {
	statement := fmt.Sprintf("DELETE FROM users WHERE ID=%d", u.ID)
	_, err := db.Exec(statement)
	return err
}

func (u *user) createUser(db *sql.DB) error {

	hash, err1 := HashPassword(u.Password)
	if err1 != nil {
		return err1
	}
	u.Password = hash

	statement := fmt.Sprintf("INSERT INTO users(Username, Password, Email) VALUES('%s', '%s', '%s')", u.Username, u.Password, u.Email)
	_, err := db.Exec(statement)
	if err != nil {
		return err
	}
	err = db.QueryRow("SELECT LAST_INSERT_ID()").Scan(&u.ID)
	if err != nil {
		return err
	}
	return nil
}

func getUsers(db *sql.DB, start, count int) ([]user, error) {
	statement := fmt.Sprintf("SELECT ID, Username, Password, Email FROM users LIMIT %d OFFSET %d", count, start)
	rows, err := db.Query(statement)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	users := []user{}
	for rows.Next() {
		var u user
		if err := rows.Scan(&u.ID, &u.Username, &u.Password, &u.Email); err != nil {
			return nil, err
		}
		users = append(users, u)
	}
	return users, nil
}
