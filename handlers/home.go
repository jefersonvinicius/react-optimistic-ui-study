package handlers

import (
	"net/http"
	"todolist/database"
	"todolist/domain/models"
	"todolist/template/engine"
)

// Main : render main page
func Main(w http.ResponseWriter, r *http.Request) {

	var tasks []models.Task
	database.Instance().Find(&tasks)

	data := map[string]interface{}{
		"tasks": tasks,
	}
	engine.RenderView(w, "main", data)
}
