# Stage 2B Pilot — Shared Place Renderer

## Scope

This pilot adds a shared dynamic place page while keeping every existing place page intact.

## Files changed / added

- `place.html` — new shared renderer entry point.
- `sw.js` — cache version bump and `place.html` added to offline asset list.
- `STAGE_2B_PILOT_REPORT.md` — this report.

## What changed

A new URL format is now available:

```
place.html?id=lune
place.html?id=fusion
place.html?id=ohquao
```

The page uses the existing `renderPlacePage(key)` function in `script.js`, so content still comes from `PLACES` in `data.js`.

## What did NOT change

- Existing place pages were not deleted.
- Existing URLs such as `lune.html`, `fusion.html`, `ohquao.html` still work.
- Guide modal behavior is unchanged.
- Day pages are unchanged.
- Comments / Emoji / Moments / Expenses logic is unchanged.
- No CSS or visual styling was changed.

## Pilot test targets

Please test these shared URLs:

1. `place.html?id=fusion` — Stay type
2. `place.html?id=lune` — Restaurant type
3. `place.html?id=ohquao` — Shop type

For each page, check:

- Hero title
- Quick Info
- Overview / Highlights / Good to Know
- Bottom nav
- Guide modal
- Moment modal
- Friend selector
- Expenses modal
- Mobile and desktop layout

## Stage 2C recommendation

Only after this pilot passes should we update links from old place pages to the shared `place.html?id=...` format and then remove old place files in batches.
