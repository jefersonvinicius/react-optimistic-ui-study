package handlers

import (
	"net/http"
	"todolist/database"
	"todolist/models"
)

// ListTasks : list tasks
func ListTasks(w http.ResponseWriter, r *http.Request) {

	var tasks []models.Task
	database.Instance().Order("created_at DESC").Find(&tasks)

	var numberOfTasksCompleted int64
	database.Instance().Model(&models.Task{}).Where("completed = ?", true).Count(&numberOfTasksCompleted)

	data := map[string]interface{}{
		"tasks":    tasks,
		"progress": float64(numberOfTasksCompleted) / float64(len(tasks)) * 100,
	}

	sendJSONResponse(w, data, http.StatusOK)
}
