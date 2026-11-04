# Spreadsheet issue resolution

Source: `C:/Users/nagas/Downloads/Untitled spreadsheet.xlsx`, reviewed 4 November 2026.

The existing frontend changes were preserved and completed against the issue list.

| Issue | Resolution |
| --- | --- |
| ZOR-001 | Correct UTF-8 currency, punctuation, flags and symbols across the UI. |
| ZOR-002 | Normalize grouped ticket prices and reject non-finite or negative prices in previews. |
| ZOR-003 | Next uses the same section mapping as the stepper, expands the destination and scrolls to it. |
| ZOR-004 | Required basic fields show associated errors; incomplete review explains missing fields and disables publishing. |
| ZOR-005 | Preview View all exposes added ticket types. |
| ZOR-006 | Schedule and repeated ticket controls have accessible names and label associations. |
| ZOR-007 | Scanner toggles expose switch roles and checked states. |
| ZOR-008 | Settings switches expose their visible names. |
| ZOR-009 | Settings uses a named native modal dialog, isolating background interaction and managing focus. |
| ZOR-010 | Escape dismisses the Settings dialog and restores trigger focus. |
| ZOR-011 | Scanner and settlement row actions, overlay close buttons and pagination have accessible names. |
| ZOR-012 | Settings View Event Page opens the supported event preview route. |
| ZOR-013 | Dashboard, Scanner and Settlements shortcuts retain event context. |
| ZOR-014 | Authentication headings and introductions follow the selected mode. |
| ZOR-015 | Invalid authentication fields reference announced error text; submission focuses the first invalid field. |
| ZOR-016 | Authentication mode controls expose pressed state. |
| ZOR-017 | Organization name, full name and logo are required before advancing. |
| ZOR-018 | Contact validation rejects malformed email, phone and pincode with associated errors. |
| ZOR-019 | Payout validation checks numeric account length, matching confirmation, IFSC format and optional UPI format. |
| ZOR-020 | IFSC check appears only for a valid format. |
| ZOR-021 | Uploads validate extension and MIME type before storing the selected file. |
| ZOR-022 | Uploads over 5 MB are rejected; failed replacements retain the previous valid file. |
| ZOR-023 | Supporting documents, including PAN, consistently remain optional. |
| ZOR-024 | Shared onboarding controls expose associated labels, required state and field errors. |
| ZOR-025 | Deferred at the user's request; policy controls remain unchanged. |

Onboarding draft values and errors also survive dynamic step-page remounts in memory. Payout details are not added to browser storage. Forward navigation and final submission use the same validation.

## Verification

- `npm test`: 6 tests passed.
- `npm run test:e2e`: 14 Chrome browser tests passed, covering the issue groups and a complete onboarding submission with an edited organization name.
- `node node_modules/typescript/bin/tsc --noEmit --incremental false`: passed.
- `npm run build`: passed.
- Independent code review: no remaining critical or important findings.
- Full ESLint remains blocked by three existing `react-hooks/set-state-in-effect` errors in `EventEditorContent.tsx:375`, `ScannerContent.tsx:373`, and `use-selected-event.ts:27`. These effect implementations were not introduced by the spreadsheet fixes. Existing unused-variable warnings also remain.
- Next.js continues to warn about the existing deprecated middleware convention.

The browser suite starts or reuses a development server on port 3101. Set `PLAYWRIGHT_BASE_URL` to verify against another running server. It uses the locally installed Chrome browser.
