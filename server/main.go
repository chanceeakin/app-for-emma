package main

import (
	"github.com/subosito/gotenv"
	"os"
)

func init() {
	gotenv.Load()
}

func main() {
	a := App{}
	// You need to set your Username and Password here
	a.Initialize(os.Getenv("GO_PS_USER"), os.Getenv("GO_PS_PASSWORD"), "PositiveThoughts")

	a.Run(":8080")
}
