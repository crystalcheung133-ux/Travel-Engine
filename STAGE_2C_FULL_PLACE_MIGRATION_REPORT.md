# Stage 2C Full Place Link Migration Report

Status: ready for deploy test.

## What changed

This is a conservative full place-link migration. It does **not** delete any legacy place HTML files yet.

Changed files:

- `script.js`
  - Added `placeHref(key)` and `goPlace(key)` helpers.
  - Dynamic Guide category lists now navigate to `place.html?id=<placeId>` instead of opening the old modal for place details.
  - Existing `openGuideModal()` remains available as fallback and for regression safety.

- `guide.html`
  - Static Guide category item buttons now navigate to `place.html?id=<placeId>`.

- `day1.html` – `day5.html`
  - Timeline `Guide` buttons now navigate to `place.html?id=<placeId>`.

- `sw.js`
  - Cache version bumped for PWA refresh.

## What did not change

- No legacy place page was deleted.
- No data schema was changed.
- No Moments / Expenses / Comments / Emoji logic was changed.
- No CSS or visual layer was changed.
- Old `openGuideModal()` still exists.

## New expected behavior

Guide / Day place detail entry points should now open the shared renderer:

```text
place.html?id=fusion
place.html?id=lune
place.html?id=ohquao
...
```

## Regression checklist

After deploy, test:

1. Guide → STAY → Fusion opens `place.html?id=fusion`.
2. Guide → RESTAURANTS → LÚNE opens `place.html?id=lune`.
3. Guide → SHOP → OHQUAO opens `place.html?id=ohquao`.
4. Day 1 → Fusion → Guide opens shared page.
5. Day 2 → Cooking / LÚNE → Guide opens shared page.
6. Day 3 → OHQUAO / Little Bear → Guide opens shared page.
7. Day 4 → Quince / Temple Leaf → Guide opens shared page.
8. Day 5 → Hạ Spa / Fine Arts → Guide opens shared page.
9. On shared page, Map button works.
10. On shared page, Moment button opens and saves normally.
11. Bottom nav still works.
12. Old legacy page URL such as `lune.html` still works as rollback.

## Next step

If this passes, Stage 2D can remove legacy place HTML files and update `sw.js` cache file list.
