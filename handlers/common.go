package handlers

import (
	"encoding/json"
	"net/http"
)

func sendJSONResponse(w http.ResponseWriter, data interface{}, status int) {
	if data == nil {
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
