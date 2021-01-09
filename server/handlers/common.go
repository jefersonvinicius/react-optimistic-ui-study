package handlers

import (
	"encoding/json"
	"errors"
	"net/http"

	"gorm.io/gorm"
)

func sendJSONResponse(w http.ResponseWriter, data interface{}, status int) {
	if data == nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(status)
		w.Write([]byte(""))
		return
	}

	json, _ := json.Marshal(data)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write([]byte(json))
}

func decodeBodyToJSON(r *http.Request) (interface{}, error) {
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()

	var data interface{}
	err := decoder.Decode(&data)

	return data, err
}

func checkTaskQueryResultAndSendResponseIfNecessary(result *gorm.DB, w http.ResponseWriter) bool {
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
