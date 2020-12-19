package handlers

import (
	"net/http"
	"todolist/database"
	"todolist/models"

	"github.com/gorilla/mux"
)

// UpdateTask update task handler
func UpdateTask(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)
	id := params["id"]

	var task models.Task
	result := database.Instance().Where("id = ?", id).First(&task)

	if checkTaskQueryResultAndSendResponseIfNecessary(result, w) {
		return
	}

	data, err := decodeBodyToJSON(r)
	payload := data.(map[string]interface{})

	if err != nil {
		res := map[string]string{
			"message": err.Error(),
		}
		sendJSONResponse(w, res, http.StatusInternalServerError)
	}

	task.Label = payload["task"].(string)
	task.Completed = payload["completed"].(bool)
	database.Instance().Save(&task)

	sendJSONResponse(w, task, http.StatusOK)

}
