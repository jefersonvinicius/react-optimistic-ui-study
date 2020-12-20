package http

import (
	"net/http"
)

// CorsAllowOriginMiddleware enable cors
func CorsAllowOriginMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodOptions {
			writeCORSConfiguration(w)
			return
		}
		writeCORSConfiguration(w)
		next.ServeHTTP(w, r)
	})
}

func writeCORSConfiguration(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")
}
