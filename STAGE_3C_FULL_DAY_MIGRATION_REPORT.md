# Stage 3C Full Day Migration Report

## Scope
- Added full dynamic data for Day 1–Day 5 inside `day.html`.
- Updated active day navigation links to use `day.html?day=1` through `day.html?day=5`.
- Kept legacy `day1.html`–`day5.html` files as rollback/fallback. No deletion in this stage.
- Updated `DAY_LINKS` in `data.js` so place "Best with Day" links point to the dynamic day renderer.
- Updated service worker cache name for Stage 3C.
- Added a small `Build · Stage 3C` label at the bottom of Trip cards for version confirmation.

## Files Changed
- `day.html`
- `data.js`
- `index.html`
- `itinerary.html`
- `day1.html`–`day5.html`
- `guide.html`
- `place.html`
- `moments.html`
- `expenses.html`
- `memory.html`
- `script.js`
- `sw.js`

## Safety Notes
- Legacy day pages remain in the repository and in the service worker cache.
- This stage changes links and dynamic rendering, but does not remove fallback day pages.
- Stage 3D should only delete legacy day pages after all dynamic day URLs pass browser testing.

## Test URLs
- `day.html?day=1`
- `day.html?day=2`
- `day.html?day=3`
- `day.html?day=4`
- `day.html?day=5`
- Legacy fallback: `day1.html`–`day5.html`

## Regression Checklist
- Home → Open Day 1 uses dynamic renderer.
- Days menu opens each dynamic day.
- Itinerary cards open each dynamic day.
- Each dynamic day shows timeline items, Guide, Map, Moment buttons.
- Guide place cards still open `place.html?id=...`.
- Moments and Expenses still open and save normally.
- Trip modal shows `Build · Stage 3C`.
