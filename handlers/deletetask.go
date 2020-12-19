package handlers

import (
	"errors"
	"net/http"
	"todolist/database"
	"todolist/domain/models"

	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

// DeleteTask delete task handler
func DeleteTask(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	var task models.Task
	result := database.Instance().Where("id = ?", id).First(&task)

	if checkQueryResultAndSendResponseIfNecessary(result, w) {
		return
	}

	result = database.Instance().Delete(&models.Task{}, id)
	if checkDeleteAndSendResponseIfNecessary(result, w) {
		return
	}

	sendJSONResponse(w, nil, http.StatusOK)
}

func checkQueryResultAndSendResponseIfNecessary(result *gorm.DB, w http.ResponseWriter) bool {
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		response := map[string]string{
			"message": "Tarefa não encontrada",
		}
		sendJSONResponse(w, response, http.StatusNotFound)
		return true
	} else if result.Error != nil {
		response := map[string]string{
			"message": result.Error.Error(),
		}
		sendJSONResponse(w, response, http.StatusInternalServerError)
		return true
	}
	return false
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
