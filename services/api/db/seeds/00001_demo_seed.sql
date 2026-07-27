-- +goose Up
-- Local-only demo rows for smoke testing (not for production).

INSERT INTO profiles (id, auth_user_id, email, display_name, is_platform_admin, status)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'seed-admin', 'admin@ivba.local', 'Platform Admin', true, 'active'),
    ('22222222-2222-2222-2222-222222222222', 'seed-venue-owner', 'venue.owner@ivba.local', 'Venue Owner', false, 'active'),
    ('33333333-3333-3333-3333-333333333333', 'seed-host-owner', 'host.owner@ivba.local', 'Host Owner', false, 'active')
ON CONFLICT (id) DO NOTHING;

INSERT INTO organizations (id, kind, legal_name, display_name, slug, contact_email, city, postcode, created_by)
VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'venue', 'Demo Venue Org Ltd', 'Demo Venue Org', 'demo-venue-org', 'venue@ivba.local', 'Manchester', 'M1 1AA', '22222222-2222-2222-2222-222222222222'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'host', 'Demo Host Org Ltd', 'Demo Host Org', 'demo-host-org', 'host@ivba.local', 'Manchester', 'M2 2BB', '33333333-3333-3333-3333-333333333333')
ON CONFLICT (id) DO NOTHING;

INSERT INTO organization_members (organization_id, profile_id, role, status)
VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222', 'owner', 'active'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 'owner', 'active')
ON CONFLICT (organization_id, profile_id) DO NOTHING;

INSERT INTO venues (
    id, organization_id, name, slug, summary, address_line1, city, postcode,
    location, status, published_at, created_by
)
VALUES (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Demo Arts Space',
    'demo-arts-space',
    'A seed venue for local development',
    '1 Creative Street',
    'Manchester',
    'M1 1AA',
    ST_SetSRID(ST_MakePoint(-2.2426, 53.4808), 4326)::geography,
    'published',
    now(),
    '22222222-2222-2222-2222-222222222222'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO venue_spaces (
    id, venue_id, name, capacity, pricing_model, price_amount_minor, currency, price_unit, amenities
)
VALUES (
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'Main Hall',
    80,
    'from',
    15000,
    'GBP',
    'day',
    '["wifi","accessible_toilet"]'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- +goose Down
DELETE FROM venue_spaces WHERE id = 'dddddddd-dddd-dddd-dddd-dddddddddddd';
DELETE FROM venues WHERE id = 'cccccccc-cccc-cccc-cccc-cccccccccccc';
DELETE FROM organization_members
WHERE organization_id IN (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'
);
DELETE FROM organizations
WHERE id IN (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'
);
DELETE FROM profiles
WHERE id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    '33333333-3333-3333-3333-333333333333'
);
