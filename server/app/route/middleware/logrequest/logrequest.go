package logrequest

import (
	log "github.com/sirupsen/logrus"
	"net/http"
	"time"
)

// Handler will log the HTTP requests
func Handler(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.SetFormatter(&log.JSONFormatter{})
		log.Println(time.Now().Format("2006-01-02 03:04:05 PM"), r.RemoteAddr, r.Method, r.URL)
		next.ServeHTTP(w, r)
	})
}
