package main

import (
	"fmt"
	"github.com/subosito/gotenv"
	"os"
	"time"
)

func init() {
	gotenv.Load()
}

func main() {
	a := App{}
	// You need to set your Username and Password here
	fmt.Println(os.Getenv("GO_PS_HOST"))
	fmt.Println(os.Getenv("GO_PS_PORT"))
	fmt.Println(os.Getenv("GO_PS_USER"))
	fmt.Println(os.Getenv("GO_PS_PASSWORD"))
	fmt.Print("sleep for sql...")
	time.Sleep(10 * time.Second)
	fmt.Print("sleep for sql end")
	a.Initialize(os.Getenv("GO_PS_HOST"), os.Getenv("GO_PS_PORT"), os.Getenv("GO_PS_USER"), os.Getenv("GO_PS_PASSWORD"), "PositiveThoughts")

	a.Run(":8080")
}
