.PHONY: help up down logs migrate migrate-down seed api worker test-go generate typecheck lint build

DATABASE_URL ?= postgres://postgres:postgres@localhost:5433/ivba?sslmode=disable
GOOSE ?= go run github.com/pressly/goose/v3/cmd/goose@v3.24.3
API_DIR := services/api

help:
	@echo "IVBA common targets:"
	@echo "  make up            Start Postgres/PostGIS"
	@echo "  make down          Stop containers"
	@echo "  make migrate       Run DB migrations"
	@echo "  make seed          Seed local data"
	@echo "  make api           Run Go API on :8080"
	@echo "  make worker        Run Go worker"
	@echo "  make test-go       Run Go tests"
	@echo "  make generate      OpenAPI → TS api-client"
	@echo "  make typecheck     TypeScript typecheck"
	@echo "  make lint          Lint packages/apps"
	@echo "  make build         Build TS apps"

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f db

migrate: up
	cd $(API_DIR) && $(GOOSE) -dir db/migrations postgres "$(DATABASE_URL)" up

migrate-down:
	cd $(API_DIR) && $(GOOSE) -dir db/migrations postgres "$(DATABASE_URL)" down

seed: migrate
	cd $(API_DIR) && $(GOOSE) -table seed_version -dir db/seeds postgres "$(DATABASE_URL)" up

api:
	cd $(API_DIR) && DATABASE_URL="$(DATABASE_URL)" API_ADDR=":8080" go run ./cmd/api

worker:
	cd $(API_DIR) && DATABASE_URL="$(DATABASE_URL)" go run ./cmd/worker

test-go:
	cd $(API_DIR) && go test ./...

generate:
	pnpm generate

typecheck:
	pnpm typecheck

lint:
	pnpm lint

build:
	pnpm build
