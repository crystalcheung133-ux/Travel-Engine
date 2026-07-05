# Companion Engine Card Types

The itinerary engine now supports flexible special cards without changing day HTML.

## Main block types

- `activity` — normal stop / attraction / shop / cafe.
- `meal` — restaurant or food stop.
- `transport` — private airport transfer, Grab, train, ferry, flight, walking transfer.
- `ticket` — ticket, booking, QR code, reference number, paid reservation.
- `experience` — cooking class, spa, ski lesson, workshop, tour.
- `appointment` — time-sensitive booked experience.
- `drive` — car rental, self-drive segment, parking, toll, fuel notes.
- `rest` — hotel break, nap time, reset window.
- `buffer` — queue / waiting / breathing space.
- `exploreWindow` — a flexible shopping or wandering window with optional nested stops.
- `note` — editorial note or reminder.
- `section` — visual divider.
- `block` — large grouped window with child blocks.

## Optional fields

```js
{
  type: "transport",
  time: "07:00–07:45",
  title: "Private airport transfer",
  mode: "Private transfer",
  status: "Booked",
  duration: "45 mins",
  fields: {
    "Pickup": "SGN Airport arrivals",
    "Drop-off": "Fusion Original Saigon Centre",
    "Ref": "TBC",
    "Driver": "TBC"
  },
  body: ["Screenshot booking confirmation before flying."],
  routeHint: "If delayed, message driver from airport Wi‑Fi."
}
```

```js
{
  type: "experience",
  time: "10:00–13:00",
  title: "Saigon Cooking Class",
  placeId: "cooking",
  status: "To book",
  duration: "3 hours",
  bookingRequired: true,
  fields: {
    "Meeting point": "39B Trần Cao Vân",
    "Includes": "Market walk + lunch",
    "Ref": "TBC"
  },
  body: ["Bring light clothes; this becomes lunch."],
  mapUrl: "https://maps.google.com/?q=Saigon+Cooking+Class+39B+Trần+Cao+Vân"
}
```
