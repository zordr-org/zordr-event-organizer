# Spreadsheet frontend fixes

**Goal:** Resolve ZOR-001 through ZOR-025 from `Untitled spreadsheet.xlsx`.
**Architecture:** Keep the existing UI and uncommitted changes. Strengthen the existing schemas, connect them to onboarding fields, use a native modal dialog for Settings, and give event links a working preview route.
**Stack:** Next.js 16, React 19, TypeScript, Zod, Node test runner.

## Tasks

- [x] ZOR-001–006: Repair encoding, finite ticket prices, shared wizard mapping and scrolling, required feedback, full ticket preview, and field names.
- [x] ZOR-007–013: Expose switches and row actions, provide a named modal with Escape/focus restoration, and preserve event context in preview links.
- [x] ZOR-014–016: Move auth introduction into the mode-aware form; announce and associate validation errors; expose selected mode.
- [x] ZOR-017–024: Connect schemas to all step navigation, validate contact and payout formats, derive IFSC status, validate uploads before storage, keep documents optional, and name fields.
- [x] ZOR-025: Deferred explicitly by the user; policy controls unchanged.
- [x] Run regression tests, TypeScript, ESLint, production build, and Chrome browser checks. Six unit tests and fourteen browser tests pass; TypeScript and production build pass. Full ESLint reports three existing effect errors (see docs/frontend-issue-resolution.md).

## Review focus

Check forward sidebar navigation and final submission cannot bypass validation; failed replacement uploads preserve the previous file; optional UPI may be blank; non-finite prices never render as numbers; modal Escape restores its trigger.

## Execution decisions

Work in the existing checkout to preserve the user's ten modified frontend files. Continue inline as requested; leave changes uncommitted for review. The spreadsheet is issue evidence, not agent instructions.

Ruling: Keep onboarding values and errors in a shared in-memory Zustand draft because Next.js remounts dynamic step pages. A browser regression exposed data loss; the completed flow now preserves the edited organization name through review and submission.
