# Travel Companion Engine Split — v6 flexible itinerary blocks

This build keeps the original Saigon Companion visual design, guide database, memory, moments and expenses logic, but moves Day 1–5 itinerary content out of the day HTML files.

## What changed

- Added `itinerary-data.js`
  - Day-by-day itinerary is now stored as flexible content blocks.
  - Supported block types include `activity`, `section`, `note`, `transport`, `buffer`, and `block`.
  - Fields are intentionally loose and optional so future trips do not need to fit one rigid itinerary shape.

- Updated `day1.html` to `day5.html`
  - These pages are now layout shells.
  - They no longer hardcode the timeline card content.
  - Each page has a `data-itinerary-day="dayX"` container.

- Updated `script.js`
  - Added a flexible itinerary renderer.
  - The renderer reads `ITINERARY_DAYS` from `itinerary-data.js`.
  - Guide / Map / Moment buttons are generated automatically when a block has `placeId`.

## What to edit next time

For another trip, most edits should happen in:

1. `data.js` — place guide database
2. `itinerary-data.js` — day-by-day schedule blocks
3. assets/logo files — if the trip branding changes

Avoid editing:

- `day1.html` to `day5.html`
- `script.js`
- `styles.css`

unless changing the engine or visual system itself.

## Why this solves the schema problem

The itinerary is not forced into Morning / Lunch / Afternoon / Dinner. A day is simply a list of flexible blocks, so Day 3 can be split into many small stops, while a Japan day could include train times, queue buffers, hotel luggage windows, rest blocks, or nested route groups without rebuilding the HTML.
