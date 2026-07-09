# Stage 4D Hygiene Cleanup Report

## Scope

Stage 4D performs final engine hygiene after Stage 4C-6. It does not change itinerary content, UI styling, Moments logic, Expenses logic, or page rendering behavior.

## Files changed

- `data.js`
  - Updated one documentation comment so it no longer refers to removed `day1.html–day5.html` files.
- `sw.js`
  - Bumped cache name to `ccmv-travel-engine-stage4d-hygiene-docs`.
  - Kept the active asset list limited to current engine files.
  - Switched HTML/navigation requests to network-first with offline fallback.
  - Kept static assets on stale-while-revalidate.
- Removed unused `styles.clean.css`.
- Removed historical stage report files from the deploy root.
- Added documentation:
  - `ENGINE_FILE_MAP.md`
  - `HOW_TO_UPDATE_TRIP.md`
  - `ENGINE_CHANGE_PROTOCOL.md`
  - `STAGE_4D_HYGIENE_CLEANUP_REPORT.md`

## Files intentionally not changed

- `script.js`
- `styles.css`
- `index.html`
- `day.html`
- `place.html`
- `moments.html`
- `expenses.html`
- `trip.html`
- `guide.html`
- `itinerary.html`
- image / icon assets

## Removed files

Historical report files were removed from the deploy root because they are no longer needed at runtime. They should be preserved in archived ZIPs, not in the live app root.

Removed unused file:

- `styles.clean.css`

## Reference scan

Active HTML / JS / CSS files were scanned for references to removed legacy day files, removed legacy place files, and `styles.clean.css`.

Result: no active runtime references found.

## Expected visible change

No UI change expected.

The only visible difference may be faster/newer page refresh behavior due to the updated service worker strategy.

## Regression checklist

Manual deploy test should verify:

- Home loads
- Loading screen still works as before
- Trip modal opens
- `day.html?day=1` through `day.html?day=5` work
- Guide links open shared place pages
- `place.html?id=fusion`, `place.html?id=lune`, `place.html?id=ohquao`, and one spa work
- Moments add/edit/delete still work
- Expenses add/edit/delete/totals still work
- PWA reload picks up new cache name
- `/sw.js` shows `ccmv-travel-engine-stage4d-hygiene-docs`
