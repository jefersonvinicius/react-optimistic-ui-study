package handlers

import (
	"fmt"
	"net/http"
	"todolist/database"
	"todolist/models"
)

// StorePayload store payload
type StorePayload struct {
	Task string
}

// StoreTask save task in database
func StoreTask(w http.ResponseWriter, r *http.Request) {

	data, err := decodeBodyToJSON(r)
	payload := data.(map[string]interface{})

	if err != nil {
		res := map[string]string{
			"message": err.Error(),
		}
		sendJSONResponse(w, res, http.StatusInternalServerError)
	}

	fmt.Println(data)
	task := models.Task{
		Label: payload["task"].(string),
	}
	database.Instance().Save(&task)
	sendJSONResponse(w, task, http.StatusCreated)
}
