package main

import (
	"todolist/database"
	"todolist/http"
	"todolist/template/engine"
)

func main() {
	database.Setup()
	engine.InitTemplateEngine()
	http.InitServer()
}
