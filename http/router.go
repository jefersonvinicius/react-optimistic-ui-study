package http

import (
	"todolist/handlers"

	"github.com/gorilla/mux"
)

// GetRouter get router
func GetRouter() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/", handlers.Main)

	return router
}
