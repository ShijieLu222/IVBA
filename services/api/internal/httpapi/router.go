package httpapi

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type healthResponse struct {
	Status string `json:"status"`
}

type profileResponse struct {
	ID          string `json:"id"`
	Email       string `json:"email"`
	DisplayName string `json:"display_name"`
}

type errorResponse struct {
	Code      string            `json:"code"`
	Message   string            `json:"message"`
	FieldErrs map[string]string `json:"field_errors,omitempty"`
	RequestID string            `json:"request_id"`
}

func Register(mux *http.ServeMux, pool *pgxpool.Pool) {
	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), 2*time.Second)
		defer cancel()
		if err := pool.Ping(ctx); err != nil {
			writeJSON(w, http.StatusServiceUnavailable, errorResponse{
				Code:      "db_unavailable",
				Message:   "database unavailable",
				RequestID: RequestIDFromContext(r.Context()),
			})
			return
		}
		writeJSON(w, http.StatusOK, healthResponse{Status: "ok"})
	})

	// Stub until Auth/JWKS is wired. Returns 401 so clients can start integrating.
	mux.HandleFunc("GET /v1/me", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, http.StatusUnauthorized, errorResponse{
			Code:      "unauthorized",
			Message:   "auth not configured in scaffold",
			RequestID: RequestIDFromContext(r.Context()),
		})
	})

	_ = profileResponse{}
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}
