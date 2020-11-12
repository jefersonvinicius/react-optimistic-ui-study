package main

import (
	"todolist/database"
	"todolist/http"
)

func main() {
	database.Setup()
	http.InitServer()
}
