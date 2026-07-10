# STAGE 4F-D — Home Legacy CSS Cleanup Report

Baseline: `Travel-Engine-main-stage4f-c-expense-legacy-css-cleanup.zip`

Mode: Small cleanup pilot. No UI redesign and no HTML/JavaScript structure changes.

## Active source confirmed

The current Home markup in `index.html` uses:

```html
<section class="home-brand-card v37-dashboard-home">
```

The removed generations were not referenced by any production HTML or JavaScript:

- `.v3-hero-logo`
- `.v31-hero-logo`
- `.v32-watermark-home`
- `.home-v31`
- `.home-logo-mark`
- `.home-logo-cameo`
- `.home-logo-watermark`

## Production changes

### `styles.css`

Removed 40 rules belonging only to the obsolete v3/v31/v32 Home logo and watermark generations.

Preserved:

- `.v37-dashboard-home`
- Current Home typography and layout rules
- Home stats and countdown rules
- `.home-single-watermark` current rules and final Stage 4E suppression
- Splash rules
- Navigation rules
- All Trip / Guide / Days / Moments / Expenses rules

### `sw.js`

Cache name changed to:

```js
ccmv-travel-engine-stage4f-d-home-legacy-css-cleanup
```

## Files

- Production files deleted: **0**
- Production files added: **0**
- Production files modified: `styles.css`, `sw.js`
- Report added: `STAGE_4F_D_HOME_LEGACY_CSS_CLEANUP_REPORT.md`

## Static regression checks

- CSS parser errors: **0**
- CSS opening/closing brace count: **902 / 902**
- Removed legacy class references remaining in production HTML/JS/CSS: **0**
- `script.js` syntax: **PASS**
- `data.js` syntax: **PASS**
- `sw.js` syntax: **PASS**
- Missing service-worker precache paths: **0**
- Changed production files versus Stage 4F-C: **styles.css and sw.js only**

## Expected UI change

None.

## Deploy regression checklist

1. Splash sequence remains logo → slogan → VIETNAM 2026.
2. Home fits the same viewport as Stage 4F-C.
3. Home hero card typography, spacing and background are unchanged.
4. Home does not regain an old pasted logo/cameo or large watermark.
5. Countdown and four stats display normally.
6. Home launch/navigation controls and bottom navigation work.
7. PWA reload activates the new cache version.

## Status

**READY FOR DEPLOY PILOT**

Do not mark production PASS until the Home page has been visually compared after service-worker activation.
