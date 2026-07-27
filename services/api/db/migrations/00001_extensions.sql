-- +goose Up
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- +goose Down
DROP EXTENSION IF EXISTS btree_gist;
DROP EXTENSION IF EXISTS citext;
DROP EXTENSION IF EXISTS pgcrypto;
-- postgis often left installed; drop only if safe in local
DROP EXTENSION IF EXISTS postgis;
