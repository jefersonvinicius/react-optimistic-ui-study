package engine

import (
	"fmt"
	"html/template"
	"net/http"
)

var (
	templates = template.Must(template.ParseGlob("views/*.html"))
)

// RenderView render template
func RenderView(w http.ResponseWriter, filename string, data interface{}) {

	filenameWithExtension := fmt.Sprintf("%s.html", filename)

	err := templates.ExecuteTemplate(w, filenameWithExtension, data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
