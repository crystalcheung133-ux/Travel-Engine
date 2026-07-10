# Stage 4F-E — Stale Splash Asset Cleanup

Baseline: `Travel-Engine-main-stage4f-d1-build-marker.zip`

## Scope

Removed the obsolete `splash-logo.png` asset after confirming that the active splash markup renders `ccmv-logo-calibrated.png` directly.

## Production changes

- Deleted `splash-logo.png`
- Removed `./splash-logo.png` from `sw.js` precache list
- Updated `ENGINE_FILE_MAP.md`
- Updated visible build marker to `Build · Stage 4F-E`
- Bumped service-worker cache name to `ccmv-travel-engine-stage4f-e-stale-splash-asset-cleanup`

## Active source confirmation

- Splash image source: `index.html` → `ccmv-logo-calibrated.png`
- Splash styling: `styles.css`
- Offline asset list: `sw.js`

## Expected UI change

None.

## Static checks

- No production reference to `splash-logo.png`
- All service-worker precache files exist
- JavaScript syntax valid
- Shared day/place routes preserved
- Visible build marker present

## Deploy regression

Confirm:

1. Splash still shows logo → slogan → VIETNAM 2026
2. Home loads normally after hard refresh
3. Offline/PWA reopen works after the new service worker activates
4. Trip detail footer displays `Build · Stage 4F-E`
