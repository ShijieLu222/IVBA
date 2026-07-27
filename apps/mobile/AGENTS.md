# IVBA Mobile Design Contract

## Product surface

- The Expo app has two account-aware surfaces: audience and Venue Host.
- Audience accounts discover events, search, save, buy, and present tickets.
- Venue Host accounts review hire requests, inspect venue/space details, and manage availability.
- Static product flows should use realistic Bristol and Artspace Lifespace content.

## Visual system

- Source direction: the selected mobile “Living Programme” concept from 27 July 2026.
- Brand colours: yellow `#FFE800`, magenta `#DB2F67`, black `#111111`, warm paper `#FFFDF8`.
- Preserve the official Artspace Lifespace logo and real source photography; do not redraw either.
- Use bold editorial typography, square corners, generous spacing, and almost no shadow.
- Hierarchy comes from the type scale, gutters and whitespace. Separators are hairlines
  (`colors.border`); reserve solid ink rules for genuinely structural edges.
- Type weights stop at 700. Brand yellow and magenta appear as accents, tints
  (`yellowWash`, `pinkWash`) and small tags rather than full-bleed colour blocks.
- Avoid gradients, glass effects, pill-heavy UI, generic marketplace cards, nested cards, emoji, and decorative feature clutter.
- Body copy should normally be 14–16px with at least 44px touch targets and strong contrast.
- Reuse the shared primitives in `src/components/` (`Section`, `Divider`, `Tag`,
  `FilterChip`, `TextField`, `Checkbox`, `Stepper`) instead of restyling per screen,
  and take spacing from `spacing.gutter` / `spacing.section`.

## Navigation and flows

- Persistent tabs: Discover, Search, Tickets, Saved, Profile.
- Venue Host tabs: Today, Calendar, Requests, Venue, Profile.
- Sign-in automatically routes from server-resolved organisation membership; users do not manually choose a role.
- Core conversion path: Discover → Event detail → Ticket selection → Checkout → Confirmation → QR ticket.
- Ticket, order, cancellation, sold-out, refund, and access states must always be explicit.
- Use British English, pounds sterling, and Europe/London date conventions.
