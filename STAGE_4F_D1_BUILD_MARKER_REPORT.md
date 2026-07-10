# Stage 4F-D1 — Visible Build Marker Delivery Fix

## Baseline

`Travel-Engine-main-stage4f-d-home-legacy-css-cleanup(1).zip`

## Production changes

1. `script.js`
   - Visible Trip detail footer changed from `Build · Stage 4E-2.1` to `Build · Stage 4F-D1`.
2. `sw.js`
   - Cache name changed to `ccmv-travel-engine-stage4f-d1-build-marker`.

## Scope guard

- No CSS cleanup changed.
- No UI structure changed.
- No feature logic changed.
- No production file deleted or added.
- Existing assets were not modified.

## Verification

- JavaScript syntax: PASS
- Service worker syntax: PASS
- Visible build marker occurs exactly once: PASS
- Old visible build marker removed: PASS
- Service-worker precache paths exist: PASS
