# IVBA Mobile Frontend — AI Agent Handoff

## Product

Expo Router mobile app for Artspace Lifespace in Bristol. The UI uses the organisation's yellow, pink, black, and paper palette and is designed for a phone viewport. Expo Web is enabled for browser review and constrains the app to a 430px mobile canvas.

## Roles and entry flow

The app starts at the welcome screen and uses a single sign-in form. The static prototype detects the account role from the email and routes automatically:

- Visitor: `visitor@example.com`
- Venue Host: `host@artspace.uk`
- Password for both demos: `bristol2026`

Visitors enter the event discovery and ticketing experience. Venue Hosts enter a separate five-tab venue workspace.

## Implemented visitor flows

- Welcome, sign in, and account creation
- Discover and event detail
- Search and filters
- Ticket selection, checkout, confirmation, and QR ticket
- Saved events, tickets, notifications, orders, profile, settings, and accessibility

## Implemented Venue Host flows

- Today dashboard
- Availability calendar with available, partially booked, and unavailable days
- Available time slots can be blocked and reopened; booked slots are disabled
- Hire request list, filters, request detail, accept, request changes, and decline states
- Venue and hireable-space list
- Space detail with area, standing/seated capacity, pricing, access, and included facilities
- Host profile and notifications

## Run locally

Requirements: Node.js 20+ and pnpm 10+.

```bash
pnpm install
pnpm --filter @ivba/mobile web
```

Open `http://localhost:8081`.

For native Expo preview:

```bash
pnpm --filter @ivba/mobile ios
```

## Important source files

- `apps/mobile/app/` — Expo Router screens and routes
- `apps/mobile/src/components/` — shared components by area (layout, buttons, forms,
  events, feedback, host, common primitives); `src/ui.tsx` re-exports them
- `apps/mobile/src/theme/` — colour, type scale, spacing and global style tokens
  (`src/theme.ts` is a compatibility re-export)
- `apps/mobile/src/auth.ts` — static role detection and demo accounts
- `apps/mobile/src/host-data.ts` — Venue Host mock data
- `apps/mobile/src/host-ui.tsx` — shared Host components
- `apps/mobile/assets/artspace/` — brand, venue, event, icon, and QR assets
- `apps/mobile/AGENTS.md` — mobile architecture and design guidance
- `design-qa.md` — verification history and remaining visual QA notes

## Verification

- TypeScript checks pass across the workspace.
- Expo iOS export passes.
- Expo Web bundles and runs locally.

Do not replace the role-aware mobile information architecture with a generic responsive dashboard. Preserve the Artspace Lifespace editorial visual language and phone-first layout.
