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

	var numberOfTasksCompleted int64
	database.Instance().Model(&models.Task{}).Where("completed = ?", true).Count(&numberOfTasksCompleted)

	data := map[string]interface{}{
		"tasks":    tasks,
		"progress": float64(numberOfTasksCompleted) / float64(len(tasks)) * 100,
	}
	engine.RenderView(w, "main", data)
}
