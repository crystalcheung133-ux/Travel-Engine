# CCMV Travel Engine v1.0.0-alpha

Purpose: separate trip-specific content from UI.

## Data files
- `data/trip-config.json` — destination, date, currency, timezone, weather defaults
- `data/itinerary.json` — day/stops/time/place/note/route
- `data/places.json` — restaurant/spa/attraction/shop/hotel/experience records
- `data/friends.json` — traveller names, emojis and roles

## Generic templates
- `index.html` renders home from JSON
- `day.html?day=1` renders any day from `itinerary.json`

## Preserved legacy behavior
- `moments.html` and `expenses.html` are kept from the clean pack for now.
- Supabase is not included.

## Removed from engine alpha
- `day1.html` to `day5.html` are no longer required for rendered day pages.
