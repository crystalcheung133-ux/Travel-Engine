# CCMV Travel Companion Engine v1.0 — Config Layer

This build adds `trip-config.js` above the existing data split.

## Edit order for a new trip

1. `trip-config.js` — trip identity, hotel, currency, friends, date range, dashboard, menu labels.
2. `itinerary-data.js` — day-by-day flexible itinerary blocks.
3. `data.js` — Guide / place database.
4. Assets — logo / watermark only if the trip brand changes.

## What this means

The Companion visual design and core functions stay in `styles.css`, `script.js`, and the page shells.
For a future Japan / Seoul / NZ trip, the normal workflow is data migration rather than rebuilding the website.

## Still worth checking each deployment

- Day menu labels match the new trip.
- Currency and hotel fields are updated.
- Any new special card type renders correctly.
- Booking details such as airport transfer, cooking class, tickets, and QR screenshot reminders appear in the intended card.
