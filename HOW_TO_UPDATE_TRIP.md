# How To Update This Trip

Use this file when updating the Companion after Planner feedback or booking confirmations arrive.

## Main rule

Do not edit generated HTML pages for content updates. Update the canonical data source instead.

## Update locations

| Update type | Edit this file | Notes |
|---|---|---|
| Day itinerary / timing / activity titles | `data.js` → `ITINERARY_DATA` | Keep stable `id`, `placeId`, and `bookingId` where possible |
| Restaurant / shop / spa / attraction details | `data.js` → `PLACES` | This feeds `place.html?id=...`, guide, and day links |
| Trip cards such as City / Stay / Flights | `data.js` → `TRIP_DATA` | Do not add Trip card overrides in `script.js` |
| Booking confirmations | `data.js` → `BOOKINGS_DATA` | Use `status`, `reference`, `contact`, `paymentStatus`, `notes`, `reminders` |
| Guide categories | `data.js` → guide/category structures | Keep `placeId` values aligned with `PLACES` keys |
| Visual polish | `styles.css` | Do not change data or behavior for visual-only tasks |
| Loading screen markup | `index.html` | CSS still lives in `styles.css` |
| Moments / Expenses behavior | `script.js` | Check current function path before editing |
| PWA cache | `sw.js` | Bump `CACHE_NAME` after app file changes |

## Stable ID rules

Use stable lowercase IDs with hyphens. Do not derive IDs from display titles if the title may change.

Examples:

- Place ID: `omakase-tiger`
- Day activity ID: `d1-dinner-omakase-tiger`
- Booking ID: `booking-omakase-tiger`

Changing the display name is safe. Changing IDs can break links, comments, moments, bookings, or future generated updates.

## After every data update

Test these paths:

1. `day.html?day=1` through `day.html?day=5`
2. `place.html?id=fusion` and one restaurant / one spa / one shop
3. Guide category links
4. Trip modal cards
5. Moments add/edit/delete
6. Expenses add/edit/delete/totals
7. PWA reload after cache update
