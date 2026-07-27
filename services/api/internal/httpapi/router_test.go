package httpapi

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestRequestIDMiddlewareSetsHeader(t *testing.T) {
	handler := WithRequestID(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if RequestIDFromContext(r.Context()) == "" {
			t.Fatal("expected request id in context")
		}
		w.WriteHeader(http.StatusNoContent)
	}))

	req := httptest.NewRequest(http.MethodGet, "/healthz", nil)
	rr := httptest.NewRecorder()
	handler.ServeHTTP(rr, req)

	if rr.Header().Get("X-Request-ID") == "" {
		t.Fatal("expected X-Request-ID response header")
	}
}
