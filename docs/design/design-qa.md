# Design QA — IVBA Mobile App

## Comparison target

- Source visual truth: `/Users/ken/.codex/generated_images/019fa28a-80b8-7633-92c7-1e047b80e94c/exec-13d9a64b-74c6-4ff6-978b-8db53ca9fa03.png`
- Implementation screenshot: unavailable
- Intended CSS viewport: `390 × 844`
- Source pixels: `853 × 1820` (mobile portrait, approximately 2.18× density)
- Implementation pixels: unavailable
- Density normalisation: blocked because no rendered implementation capture was available
- State: signed-in Discover screen, Monday 27 July 2026 selected

## Evidence gathered

- The selected mobile source visual was opened and used as the implementation target.
- Strict TypeScript compilation passed for the complete Expo mobile app.
- Expo successfully produced an iOS Hermes bundle after the role-aware expansion, with 1,014 modules and all app-owned raster assets.
- iPhone Simulator access was approved and an iPhone 16 Plus simulator was available.
- The simulator preview could not complete because Expo Go's first-time download stalled at 3% with an estimated completion time above 25 minutes.
- Web preview was not used because the existing Expo project does not include `react-native-web`; installing it would have required weakening or bypassing an active supply-chain lockfile policy, which was intentionally not done.

## Full-view comparison evidence

Blocked. There is no browser- or simulator-rendered implementation screenshot to place beside the source visual. Code structure, route definitions, and bundle output are not substitutes for visible comparison evidence.

## Focused region comparison evidence

Blocked for the same reason. The following source-critical regions still require visual capture at `390 × 844` before a passing result is possible:

- Artspace Lifespace header lockup and yellow brand field
- “What’s on this week” display typography and date rail
- Featured event image crop and metadata rhythm
- Primary ticket CTA and persistent bottom navigation
- Search results, checkout form, confirmation, and QR ticket states
- Role-detecting sign-in with both visitor and Venue Host demo accounts
- Venue Host dashboard, availability calendar, request detail, and space detail states

## Findings

- [P1] Rendered visual fidelity is unverified
  - Location: all screens, especially `apps/mobile/app/(tabs)/index.tsx`
  - Evidence: source visual exists, but simulator capture is unavailable.
  - Impact: typography wrapping, safe-area spacing, logo crop, sprite-icon crop, and bottom-tab height cannot be judged reliably from source code.
  - Fix: finish the Expo Go simulator download or provide a native preview environment, capture the Discover screen at `390 × 844`, and compare it side by side with the source visual.

## Comparison history

- Iteration 1: audience implementation completed; TypeScript and iOS bundle passed; visual comparison blocked before the first screenshot.
- Iteration 2: role detection, Venue Host workspace, availability calendar, request actions, and space drill-down completed; TypeScript and the 1,014-module iOS bundle passed; visual comparison remains blocked.
- No visual fixes were claimed because there is no post-render evidence.

## Implementation checklist

- [x] Recreate the selected mobile visual language in Expo Router.
- [x] Implement the audience discovery, ticketing, account, and settings page set.
- [x] Implement automatic post-login routing for visitor and Venue Host accounts.
- [x] Implement the Host dashboard, availability calendar, hire-request handling, venue list, and space detail flows.
- [x] Use official brand imagery, real Artspace Lifespace photography, a coherent raster icon set, and a real QR asset.
- [x] Pass strict TypeScript compilation.
- [x] Pass an iOS Expo export bundle.
- [ ] Capture the native Discover screen.
- [ ] Compare source and implementation at the same viewport.
- [ ] Fix all visible P0/P1/P2 differences and repeat comparison.

## Follow-up polish

- Confirm the exact logo crop on compact headers.
- Check that the generated icon sprite remains optically centred at 20–28px sizes.
- Confirm bottom-tab safe-area spacing on both iPhone and Android.

final result: blocked
