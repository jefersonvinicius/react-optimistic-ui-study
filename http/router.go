package http

import (
	"net/http"
	"todolist/handlers"

	"github.com/gorilla/mux"
)

var router = mux.NewRouter()

// GetRouter get router
func GetRouter() *mux.Router {
	return router
}

// RegisterRoutes register routes
func RegisterRoutes() {
	router.HandleFunc("/", handlers.Main)
}

// SetupStaticFilesServer to serve static files
func SetupStaticFilesServer() {
	router.PathPrefix("/public/").Handler(http.StripPrefix("/public/", http.FileServer(http.Dir("./public/"))))
}
