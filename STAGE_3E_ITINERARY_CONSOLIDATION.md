# Stage 3E — Itinerary Consolidation + CSS Deduplication

Base: `Claude-Travel-Engine-stage3d-day-legacy-cleanup.zip`
Scope: (1) move day.html's itinerary data into data.js, schema-aligned; (2) safely deduplicate styles.css. No visual change, no HTML page deleted, no render-function rewrite.

**Exactly 4 files changed** — `data.js`, `day.html`, `styles.css`, `sw.js`. Everything else (all other HTML pages, `script.js`, `manifest.json`, every icon/logo, `styles.clean.css`) is byte-for-byte identical to the input ZIP, checksum-verified.

---

## Part 1 — `ITINERARY_DATA` moved into `data.js`

### What changed

`day.html` used to carry its own `const DAY_RENDER_DATA = {...}` object — 5 days, ~34 activity items — embedded directly inside an inline `<script>` tag. That data now lives in `data.js` as `const ITINERARY_DATA`, and `day.html` reads it via one line:

```js
const DAY_RENDER_DATA = ITINERARY_DATA; // alias — rendering code below is untouched
```

Nothing about *how* a day renders changed — the whole render function (the `esc()` escaper, the timeline-item template, the Guide/Map/Moment buttons) is byte-for-byte the same code it was before. Only *where the data lives* changed.

### Why this matters for "upload itinerary → generate Companion"

Before this pass, trip content lived in three different places that didn't know about each other:
- `PLACES` (in `data.js`) — the place database
- `BOOKINGS_DATA` / `ITINERARY_SCHEMA_EXAMPLES` (in `data.js`, added in Stage 1.5) — the booking/schema groundwork
- `DAY_RENDER_DATA` (inline inside `day.html`) — the actual day-by-day timeline

A future "upload an itinerary and regenerate the app" pipeline would have needed to know to reach *into an HTML file* to replace the timeline data, which is exactly the kind of fragile coupling that makes automated regeneration risky. Now all three live in `data.js`, so that pipeline only ever needs to produce/replace one file.

### Schema alignment (the actual content-safe part)

Every one of the ~34 items in `ITINERARY_DATA` kept its original 6 fields untouched (`id, time, title, details, route, map`) and gained 3 new fields, using the vocabulary Stage 1.5 already defined in `ITINERARY_ACTIVITY_TYPES`:

- **`type`** — inferred from the matching `PLACES[item.id].cat` (e.g. `RESTAURANTS`/`CAFÉS` → `meal`, `SPA` → `spa`, `SHOP` → `shoppingWindow`, `STAY` → `rest`, `ATTRACTIONS`/`EXPERIENCE` → `experience`). Three items have no matching `PLACES` entry and were classified by hand: `takashimaya` → `shoppingWindow`, `hotel-luggage` → `buffer`, `airport` → `transport`.
- **`placeId`** — `item.id` itself when it matches a real `PLACES` key (31 of 34 items), otherwise `null`. `hotel-luggage` was set to `placeId: 'fusion'` since it's literally a return trip to the hotel; `takashimaya` and `airport` have no matching place and stay `null`.
- **`bookingId`** — linked to a real `BOOKINGS_DATA` entry only where one genuinely exists: `omakase-tiger` → `omakase-tiger-booking`, `cooking` → `cooking-class-booking`. Every other item is `null` — **intentionally not invented**. (Note: the Stage 1.5 `airport-transfer-booking` sample is dated for Day 1's *arrival*, 06:30; Day 5's `airport` item is the *departure*, 18:00 — these are two different real-world events, not the same booking, so no link was forced between them.)
- **`dayId`** — added at the day level too (`'day1'`–`'day5'`), matching the `dayId` convention already used by `BOOKINGS_DATA`.

This mapping was generated programmatically from real `PLACES` category data, not typed by hand item-by-item — see the mapping table in the verification section below.

### Verification — not just "should be fine"

I proved this is a pure data-location move, not a rendering change, two ways:

1. **Static:** every field the render function reads (`id, time, title, details, route, map`) is present, unchanged, in every one of the 34 items.
2. **Dynamic — the important one:** I actually executed `day.html`'s render logic twice — once against the original embedded `DAY_RENDER_DATA`, once against `data.js`'s new `ITINERARY_DATA` — for all 5 days, and byte-diffed the two HTML outputs.

```
day1: IDENTICAL
day2: IDENTICAL
day3: IDENTICAL
day4: IDENTICAL
day5: IDENTICAL
```

The rendered HTML for every day is byte-for-byte identical before and after. This isn't "probably fine" — it's proven equal, for the exact real inputs the app uses.

### Script load order

`day.html` previously loaded `data.js`/`script.js` *after* its own inline rendering script. Since the rendering script now needs `ITINERARY_DATA` from `data.js`, the `<script src="data.js">`/`<script src="script.js">` tags were moved to load immediately before the rendering script instead of after it. This is the only structural change to `day.html` beyond the one-line data alias.

---

## Part 2 — CSS deduplication (safe subset only, same method as before)

`styles.css` had grown to 927 rule blocks (2242 lines) — noticeably more duplication than the version I deduplicated in an earlier session, which suggests this branch was built from an earlier, pre-dedup snapshot.

### Method (unchanged from the earlier proven-safe pass)

I only merge duplicate rules whose selector is a **single class/id/element** (no comma list). For those, I verified — per property, against the true CSS-cascade-resolved value across the *entire* file (importance-aware: an `!important` declaration always beats a later non-important one; among equally-important declarations, the later one wins) — that merging doesn't change the outcome, and dropped any property that didn't match that global truth (meaning some *other* untouched rule was always the real winner anyway).

**Deliberately left untouched, again:** duplicate rules that share a comma-separated selector list with other classes (the card-watermark `::after` rules, `.moments-sheet,.tools-sheet` modal-sizing rules, etc.) — merging those has a proven failure mode (see the earlier session's notes) where consolidating can silently flip which of two `!important` rules wins for elements matched by more than one selector in the list. Not worth the risk for a cosmetic win.

### Result

- 927 rule blocks → 871 (fewer than the ~15% reduction achieved on the more-duplicated earlier snapshot, because a lot of this file's growth since then is genuinely new CSS — `.timeline-item`, `.route-hint`, `.page-hero` etc. for the new shared `day.html`/`place.html` shells — not duplicated old CSS)
- 141,881 bytes → 130,681 bytes
- **Verified zero-risk:** computed the true cascade-resolved value for all 4,979 selector/property combinations in the file, before and after — **0 mismatches**.

### Still there, still deferred

Same as before: `.floating-tools` was already absent (that cleanup carried over from an earlier session), but the comma-list duplicate groups noted above are still present and still the same risk profile they always were. If you want those gone too, that needs actual browser visual regression testing, not just code-level proof — happy to do it as its own pass when you're ready to click through the result.

`styles.clean.css` also remains in the ZIP, unreferenced by any HTML page, same as every previous stage — still not deleted, still zero-risk to delete whenever you want.

---

## What was explicitly NOT touched

- `script.js` — byte-identical. The Moments/Expenses function-override chains flagged in my architecture review (`saveExpense` reassigned 7×, `openExpenseModal` 6×, etc.) are **still fully present**, exactly as messy as before. This pass didn't touch them — that's a separate, higher-risk piece of work with its own testing requirements.
- `place.html`, `guide.html`, `trip.html`, `itinerary.html`, `moments.html`, `expenses.html`, `memory.html`, `index.html` — all byte-identical.
- `PLACES`, `CATEGORIES`, `DAY_LINKS`, `GUIDE_ORDER`, `FRIENDS`, `TRIP_DATA`, `TRIP_ORDER`, `BOOKINGS_DATA`, `ITINERARY_ACTIVITY_TYPES`, `ITINERARY_SCHEMA_EXAMPLES`, `PLACE_SCHEMA_EXAMPLES` — all untouched, same content, same order.
- All icons, logos, `manifest.json` — untouched.

See the accompanying regression check output above and re-run it yourself with a real browser click-through before deploying — this report is thorough on code-level and rendered-output verification, but I still don't have a browser here.
