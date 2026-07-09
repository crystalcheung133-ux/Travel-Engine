# Engine Change Protocol

Follow this protocol for every future change, regardless of whether the work is done by ChatGPT, Claude, Gemini, or manually.

## Before changing code

1. Identify the active source.
   - Example: Day content = `data.js` → `ITINERARY_DATA` → `day.html?day=...`
   - Example: Place content = `data.js` → `PLACES` → `place.html?id=...`
2. State the exact files expected to change.
3. Avoid mixing architecture, data, logic, and UI in one patch.

## Patch size rule

Small change = patch ZIP only.

- Data update: usually `data.js` + `sw.js`
- UI polish: usually `styles.css` + `sw.js`
- Behavior fix: usually `script.js` + `sw.js`
- Loading markup: usually `index.html` + `styles.css` + `sw.js`

Full ZIP should be saved only at major master checkpoints.

## Deployment verification

After deploy, verify by evidence, not memory:

1. Check Vercel production commit hash matches GitHub latest commit.
2. Open `/sw.js` and confirm the expected `CACHE_NAME`.
3. Test a visible observable change.
4. If live site does not change, do not patch again until source/deploy/cache is proven.

## Regression checklist

For every meaningful change:

- Home / loading
- Trip modal
- `day.html?day=1` through `day.html?day=5`
- Guide
- `place.html?id=fusion`, `place.html?id=lune`, one spa, one shop
- Moments add/edit/delete
- Expenses add/edit/delete/totals
- Bottom navigation
- PWA reload / offline fallback

## Stop rule

If deploy output looks unchanged, stop and diagnose:

- Wrong active source?
- GitHub commit not deployed?
- Wrong Vercel project/domain?
- Service worker cache?
- CSS override later in file?

Do not keep generating patches without identifying the cause.
