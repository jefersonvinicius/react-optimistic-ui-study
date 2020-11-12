package handlers

import (
	"net/http"
	"todolist/template/engine"
)

// Main : render main page
func Main(w http.ResponseWriter, r *http.Request) {
	engine.RenderView(w, "main", nil)
}
