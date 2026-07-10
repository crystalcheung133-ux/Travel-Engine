# Travel Engine File Map — Stage 4D

This repository is now a compact Travel Engine structure. The app should be updated by changing the active source file listed below, not by editing legacy page copies.

## Core app shell

| File | Purpose | Change when |
|---|---|---|
| `index.html` | Home / front page shell and loading screen markup | You need to change the front page structure or loading markup |
| `styles.css` | All visual styling, card surfaces, watermarks, layout, responsive rules | You need UI polish only |
| `script.js` | Navigation, modals, rendering logic, Moments / Expenses interactions, local state helpers | You need behavior / interaction logic changes |
| `data.js` | Canonical trip content: Trip cards, places, itinerary data, booking framework, schemas | You need to update itinerary / places / bookings / trip content |
| `sw.js` | PWA cache and offline strategy | Any deploy with changed app files, or PWA/cache behavior changes |
| `manifest.json` | PWA app name, icons, start URL | You need to change install/app metadata |

## Dynamic content pages

| File | Purpose | URL pattern |
|---|---|---|
| `day.html` | Shared day renderer for all trip days | `day.html?day=1` through `day.html?day=5` |
| `place.html` | Shared place renderer for all restaurants / shops / spas / attractions | `place.html?id=fusion`, `place.html?id=lune`, etc. |
| `guide.html` | Guide category and guide layer container | `guide.html` |
| `trip.html` | Trip overview container / Trip modal entry | `trip.html` |
| `itinerary.html` | Itinerary overview container | `itinerary.html` |
| `moments.html` | Moments wall and related modals | `moments.html` |
| `expenses.html` | Expenses dashboard and modals | `expenses.html` |
| `memory.html` | Memory / saved trip notes layer | `memory.html` |
| `offline.html` | Offline fallback page | `offline.html` |

## Assets

| File | Purpose |
|---|---|
| `ccmv-logo-calibrated.png` | Current front/loading logo asset |
| `logo-monogram-transparent.png` | Transparent monogram logo |
| `logo-watermark-monogram.png` | Card watermark logo |
| `icon-192.png`, `icon-512.png` | PWA icons |

## Removed legacy files

Legacy individual place pages and individual day pages have been removed after migration:

- Old place pages such as `fusion.html`, `lune.html`, `bakes.html`, etc.
- Old day pages `day1.html` through `day5.html`
- Unused `styles.clean.css`

Active pages should now use `place.html?id=...` and `day.html?day=...` only.
