-- +goose Up
-- M1 tables for first vertical slice:
-- profiles → orgs → venues/spaces → hire requests (+ review/audit/outbox)

CREATE TABLE profiles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id text NOT NULL UNIQUE,
    email citext NOT NULL UNIQUE,
    display_name text NOT NULL,
    avatar_url text NULL,
    phone text NULL,
    locale text NOT NULL DEFAULT 'en-GB',
    is_platform_admin boolean NOT NULL DEFAULT false,
    status text NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'disabled', 'pending_deletion')),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE organizations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    kind text NOT NULL CHECK (kind IN ('host', 'venue')),
    legal_name text NOT NULL,
    display_name text NOT NULL,
    slug text NOT NULL UNIQUE,
    bio text NULL,
    contact_email text NOT NULL,
    contact_phone text NULL,
    address_line1 text NULL,
    address_line2 text NULL,
    city text NULL,
    region text NULL,
    postcode text NULL,
    country_code char(2) NOT NULL DEFAULT 'GB',
    verification_status text NOT NULL DEFAULT 'unverified'
        CHECK (verification_status IN ('unverified', 'pending', 'verified', 'rejected')),
    payout_status text NOT NULL DEFAULT 'not_started'
        CHECK (payout_status IN ('not_started', 'pending', 'active', 'restricted')),
    created_by uuid NULL REFERENCES profiles (id),
    archived_at timestamptz NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE organization_members (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid NOT NULL REFERENCES organizations (id),
    profile_id uuid NOT NULL REFERENCES profiles (id),
    role text NOT NULL CHECK (role IN ('owner', 'staff')),
    status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'removed')),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (organization_id, profile_id)
);

CREATE INDEX organization_members_profile_idx ON organization_members (profile_id);

CREATE TABLE organization_invitations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid NOT NULL REFERENCES organizations (id),
    email citext NOT NULL,
    role text NOT NULL CHECK (role IN ('owner', 'staff')),
    token_hash text NOT NULL,
    status text NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'accepted', 'declined', 'revoked', 'expired')),
    invited_by uuid NULL REFERENCES profiles (id),
    expires_at timestamptz NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE venues (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid NOT NULL REFERENCES organizations (id),
    name text NOT NULL,
    slug text NOT NULL UNIQUE,
    summary text NULL,
    description text NULL,
    address_line1 text NOT NULL,
    address_line2 text NULL,
    city text NOT NULL,
    region text NULL,
    postcode text NOT NULL,
    country_code char(2) NOT NULL DEFAULT 'GB',
    location geography(Point, 4326) NULL,
    timezone text NOT NULL DEFAULT 'Europe/London',
    transport_info text NULL,
    accessibility_info text NULL,
    house_rules text NULL,
    contact_email text NULL,
    contact_phone text NULL,
    status text NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'pending_review', 'published', 'changes_requested', 'rejected', 'archived')),
    published_at timestamptz NULL,
    cover_media_id uuid NULL,
    created_by uuid NULL REFERENCES profiles (id),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX venues_organization_idx ON venues (organization_id);
CREATE INDEX venues_published_idx ON venues (status) WHERE status = 'published';
CREATE INDEX venues_location_gix ON venues USING gist (location);

CREATE TABLE venue_spaces (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    venue_id uuid NOT NULL REFERENCES venues (id) ON DELETE CASCADE,
    name text NOT NULL,
    description text NULL,
    capacity int NOT NULL CHECK (capacity > 0),
    area_sqm numeric(10, 2) NULL,
    layout_notes text NULL,
    pricing_model text NOT NULL CHECK (pricing_model IN ('fixed', 'from', 'enquiry')),
    price_amount_minor bigint NULL,
    currency char(3) NOT NULL DEFAULT 'GBP',
    price_unit text NULL,
    amenities jsonb NOT NULL DEFAULT '[]'::jsonb,
    allowed_event_types jsonb NOT NULL DEFAULT '[]'::jsonb,
    prohibited_event_types jsonb NOT NULL DEFAULT '[]'::jsonb,
    sort_order int NOT NULL DEFAULT 0,
    status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX venue_spaces_venue_idx ON venue_spaces (venue_id);

CREATE TABLE venue_media (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    venue_id uuid NOT NULL REFERENCES venues (id) ON DELETE CASCADE,
    space_id uuid NULL REFERENCES venue_spaces (id) ON DELETE SET NULL,
    storage_key text NOT NULL,
    url text NOT NULL,
    mime_type text NOT NULL,
    width int NULL,
    height int NULL,
    sort_order int NOT NULL DEFAULT 0,
    created_by uuid NULL REFERENCES profiles (id),
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX venue_media_venue_idx ON venue_media (venue_id);

ALTER TABLE venues
    ADD CONSTRAINT venues_cover_media_fk
    FOREIGN KEY (cover_media_id) REFERENCES venue_media (id) ON DELETE SET NULL;

CREATE TABLE content_reviews (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_type text NOT NULL CHECK (subject_type IN ('venue', 'event', 'organization')),
    subject_id uuid NOT NULL,
    requested_by uuid NULL REFERENCES profiles (id),
    reviewed_by uuid NULL REFERENCES profiles (id),
    decision text NOT NULL DEFAULT 'pending'
        CHECK (decision IN ('pending', 'approved', 'changes_requested', 'rejected')),
    notes text NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    resolved_at timestamptz NULL
);

CREATE INDEX content_reviews_subject_idx ON content_reviews (subject_type, subject_id, created_at DESC);

CREATE TABLE venue_hire_requests (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    space_id uuid NOT NULL REFERENCES venue_spaces (id),
    host_organization_id uuid NOT NULL REFERENCES organizations (id),
    venue_organization_id uuid NOT NULL REFERENCES organizations (id),
    status text NOT NULL DEFAULT 'draft'
        CHECK (status IN (
            'draft', 'submitted', 'under_review', 'changes_requested',
            'accepted', 'rejected', 'cancelled', 'confirmed',
            'quoted', 'payment_pending'
        )),
    title text NULL,
    event_type text NOT NULL,
    expected_attendees int NOT NULL CHECK (expected_attendees > 0),
    starts_at timestamptz NOT NULL,
    ends_at timestamptz NOT NULL,
    setup_starts_at timestamptz NULL,
    teardown_ends_at timestamptz NULL,
    requirements text NULL,
    contact_name text NOT NULL,
    contact_email text NOT NULL,
    contact_phone text NULL,
    confirmed_starts_at timestamptz NULL,
    confirmed_ends_at timestamptz NULL,
    confirmed_range tstzrange NULL,
    created_by uuid NULL REFERENCES profiles (id),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CHECK (ends_at > starts_at)
);

CREATE INDEX venue_hire_requests_space_idx ON venue_hire_requests (space_id);
CREATE INDEX venue_hire_requests_host_org_idx ON venue_hire_requests (host_organization_id);
CREATE INDEX venue_hire_requests_venue_org_idx ON venue_hire_requests (venue_organization_id);

-- Prevent overlapping confirmed bookings on the same space.
ALTER TABLE venue_hire_requests
    ADD CONSTRAINT venue_hire_requests_no_overlap
    EXCLUDE USING gist (
        space_id WITH =,
        confirmed_range WITH &&
    )
    WHERE (status = 'confirmed' AND confirmed_range IS NOT NULL);

CREATE TABLE venue_hire_status_history (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    hire_request_id uuid NOT NULL REFERENCES venue_hire_requests (id) ON DELETE CASCADE,
    from_status text NULL,
    to_status text NOT NULL,
    changed_by uuid NULL REFERENCES profiles (id),
    reason text NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX venue_hire_status_history_request_idx
    ON venue_hire_status_history (hire_request_id, created_at);

CREATE TABLE audit_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_profile_id uuid NULL REFERENCES profiles (id),
    action text NOT NULL,
    subject_type text NOT NULL,
    subject_id uuid NULL,
    metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX audit_logs_subject_idx ON audit_logs (subject_type, subject_id, created_at DESC);

CREATE TABLE outbox_jobs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    job_type text NOT NULL,
    dedupe_key text NOT NULL UNIQUE,
    payload jsonb NOT NULL,
    status text NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'processing', 'done', 'failed')),
    attempts int NOT NULL DEFAULT 0,
    available_at timestamptz NOT NULL DEFAULT now(),
    last_error text NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX outbox_jobs_poll_idx ON outbox_jobs (status, available_at);

CREATE TABLE consent_records (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id uuid NOT NULL REFERENCES profiles (id),
    consent_type text NOT NULL,
    version text NOT NULL,
    accepted_at timestamptz NOT NULL DEFAULT now(),
    metadata jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX consent_records_profile_idx ON consent_records (profile_id, consent_type);

-- +goose Down
DROP TABLE IF EXISTS consent_records;
DROP TABLE IF EXISTS outbox_jobs;
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS venue_hire_status_history;
DROP TABLE IF EXISTS venue_hire_requests;
DROP TABLE IF EXISTS content_reviews;
ALTER TABLE IF EXISTS venues DROP CONSTRAINT IF EXISTS venues_cover_media_fk;
DROP TABLE IF EXISTS venue_media;
DROP TABLE IF EXISTS venue_spaces;
DROP TABLE IF EXISTS venues;
DROP TABLE IF EXISTS organization_invitations;
DROP TABLE IF EXISTS organization_members;
DROP TABLE IF EXISTS organizations;
DROP TABLE IF EXISTS profiles;
