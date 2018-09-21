package main

import (
	// "cloud.google.com/go/logging"
	"encoding/json"
	"github.com/chanceeakin/app-for-emma/server/app/route"
	"github.com/chanceeakin/app-for-emma/server/app/shared/database"
	"github.com/chanceeakin/app-for-emma/server/app/shared/email"
	"github.com/chanceeakin/app-for-emma/server/app/shared/jsonconfig"
	"github.com/chanceeakin/app-for-emma/server/app/shared/recaptcha"
	"github.com/chanceeakin/app-for-emma/server/app/shared/server"
	"github.com/chanceeakin/app-for-emma/server/app/shared/session"
	"github.com/chanceeakin/app-for-emma/server/app/shared/view"
	"github.com/chanceeakin/app-for-emma/server/app/shared/view/plugin"
	// "golang.org/x/net/context"
	"log"
	"runtime"
	// "google.golang.org/appengine"
)

// *****************************************************************************
// Application Logic
// *****************************************************************************

func init() {
	// Verbose logging with file name and line number
	// log.SetFlags(log.Lshortfile)

	// Use all CPU cores
	runtime.GOMAXPROCS(runtime.NumCPU())
}

func main() {
	// Load the configuration file
	jsonconfig.Load("./config.json", config)

	// Configure the session cookie store
	session.Configure(config.Session)

	// Connect to database
	database.Connect(config.Database)
	database.ConfigureMongo()

	// Configure the Google reCAPTCHA prior to loading view plugins
	recaptcha.Configure(config.Recaptcha)

	// Setup the views
	view.Configure(config.View)
	view.LoadTemplates(config.Template.Root, config.Template.Children)
	view.LoadPlugins(
		plugin.TagHelper(config.View),
		plugin.NoEscape(),
		plugin.PrettyTime(),
		recaptcha.Plugin())

	// ctx := context.Background()

	// Sets your Google Cloud Platform project ID.
	// projectID := "emma-app-216513"

	// Creates a client.
	// client, err := logging.NewClient(ctx, projectID)
	// if err != nil {
	// 	log.Fatalf("Failed to create client: %v", err)
	// }
	// defer client.Close()
	//
	// // Sets the name of the log to write to.
	// logName := "emma-app"
	//
	// logger := client.Logger(logName).StandardLogger(logging.Info)

	// Logs "hello world", log entry is visible at

	// Start the listener
	server.Run(route.LoadHTTP(), route.LoadHTTPS(), config.Server)
	// appengine.Main()
	log.Println("Server started")
}

// *****************************************************************************
// Application Settings
// *****************************************************************************

// config the settings variable
var config = &configuration{}

// configuration contains the application settings
type configuration struct {
	Database  database.Info   `json:"Database"`
	Email     email.SMTPInfo  `json:"Email"`
	Recaptcha recaptcha.Info  `json:"Recaptcha"`
	Server    server.Server   `json:"Server"`
	Session   session.Session `json:"Session"`
	Template  view.Template   `json:"Template"`
	View      view.View       `json:"View"`
}

// ParseJSON unmarshals bytes to structs
func (c *configuration) ParseJSON(b []byte) error {
	return json.Unmarshal(b, &c)
}
