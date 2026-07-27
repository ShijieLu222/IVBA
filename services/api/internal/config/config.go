package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DatabaseURL string
	APIAddr     string
	AppEnv      string
}

func Load() (Config, error) {
	// Best-effort load from repo root or cwd; missing file is fine.
	_ = godotenv.Load()
	_ = godotenv.Load("../../.env")
	_ = godotenv.Load("../../../.env")

	cfg := Config{
		DatabaseURL: envOr("DATABASE_URL", "postgres://postgres:postgres@localhost:5433/ivba?sslmode=disable"),
		APIAddr:     envOr("API_ADDR", ":8080"),
		AppEnv:      envOr("APP_ENV", "local"),
	}
	if cfg.DatabaseURL == "" {
		return Config{}, fmt.Errorf("DATABASE_URL is required")
	}
	return cfg, nil
}

func envOr(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
