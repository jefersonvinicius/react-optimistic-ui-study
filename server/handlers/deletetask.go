package handlers

import (
	"net/http"
	"todolist/database"
	"todolist/models"

	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

// DeleteTask delete task handler
func DeleteTask(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	var task models.Task
	result := database.Instance().Where("id = ?", id).First(&task)

	if checkTaskQueryResultAndSendResponseIfNecessary(result, w) {
		return
	}

	result = database.Instance().Delete(&task)
	if checkDeleteAndSendResponseIfNecessary(result, w) {
		return
	}

	sendJSONResponse(w, nil, http.StatusOK)
}

func checkDeleteAndSendResponseIfNecessary(result *gorm.DB, w http.ResponseWriter) bool {
	if result.Error != nil {
		response := map[string]string{
			"message": result.Error.Error(),
		}
		sendJSONResponse(w, response, http.StatusInternalServerError)
		return true
	}
	return false
}
