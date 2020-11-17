package http

import (
	"fmt"
	"net/http"
)

// InitServer init server
func InitServer() {
	SetupStaticFilesServer()
	RegisterRoutes()

	router := GetRouter()

	http.Handle("/", router)

	fmt.Println("Serving in http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
