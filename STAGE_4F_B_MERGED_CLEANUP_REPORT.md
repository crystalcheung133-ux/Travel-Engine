# Stage 4F-B — Merged Dead Override Cleanup

## Baseline

`Travel-Engine-main-stage4f-a-dead-day-swipe-cleanup.zip`

This remains the authoritative baseline because it already removed the obsolete `day1.html`–`day5.html` swipe handler from `script.js`.

## Merged Changes

Only the following reviewed Claude changes were applied onto the Stage 4F-A baseline:

1. Replaced `styles.css` with Claude's consolidated Stage 4F CSS cleanup.
2. Updated the splash `<img>` in `index.html` to use `ccmv-logo-calibrated.png` directly.
3. Applied the service-worker update and assigned a new merged cache name:
   `ccmv-travel-engine-stage4f-b-merged-css-cleanup`.

## Deliberately Not Merged

Claude's `script.js` was not used because it came from the older splash-fix baseline and reintroduced the deleted `day1.html`–`day5.html` swipe route.

No trip data, renderer, HTML structure, Moments/Expenses logic, logo artwork, or header-logo override chain was changed.

## Static Regression Checks

- `script.js`: syntax PASS
- `data.js`: syntax PASS
- `sw.js`: syntax PASS
- Deleted day-page navigation references: PASS — absent from production files
- Service-worker precache paths: PASS — all referenced local assets exist
- Active dynamic routes retained: `day.html?day=N` and `place.html?id=...`
- Stage 4F-A `script.js` retained byte-for-byte: PASS

## Deploy Pilot Checklist

1. Splash sequence: logo → slogan → VIETNAM 2026.
2. Home header logo and hero layout.
3. Open `day.html?day=1` and `day.html?day=5`.
4. Guide category modal and place detail pages.
5. Add/edit Moments and review history.
6. Add/edit Expenses and check settlement cards.
7. Hard refresh once, close/reopen PWA, and confirm the new cache name activates.

## Status

**READY FOR DEPLOY PILOT — not yet production-regression PASS until tested on the live deployment.**
