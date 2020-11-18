package handlers

import (
	"net/http"
	"todolist/template/engine"
)

// CreateTask render form page
func CreateTask(w http.ResponseWriter, r *http.Request) {
	engine.RenderView(w, "create-task", nil)
}
