package handlers

import (
	"net/http"
	"todolist/database"
	"todolist/domain/models"
)

// StoreTask save task in database
func StoreTask(w http.ResponseWriter, r *http.Request) {
	task := models.Task{
		Label: r.FormValue("task"),
	}
	database.Instance().Save(&task)
	http.Redirect(w, r, "/", http.StatusPermanentRedirect)
}

func validateRequestData(r *http.Request) {

}
