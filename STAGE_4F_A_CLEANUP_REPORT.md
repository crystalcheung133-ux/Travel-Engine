# STAGE 4F-A — Deleted-page Reference Cleanup Report

Mode: **Patch 4F-A only**

## Scope

This patch followed the Stage 4F audit recommendation to remove the lowest-risk dead code first.

Changed production files:

- `script.js`
- `sw.js`

No HTML structure, CSS, data, assets, logo files, or renderer logic were changed.

## What was removed

Removed the legacy mobile swipe handler that only matched old deleted routes:

```js
location.pathname.match(/day([1-5])\.html$/)
window.location.assign(`day${next}.html`)
```

Those pages no longer exist. The active shared day renderer is:

```text
day.html?day=1 ... day.html?day=5
```

## Why this is safe

The removed block did not run on the current active route (`day.html?day=N`) because its regex only matched old filenames such as `day1.html`.

This is cleanup only, not a feature replacement. It does **not** add new query-param swipe behaviour.

## Service worker

`sw.js` cache name was bumped from:

```text
ccmv-travel-engine-stage4e22-splash-sequence-fix
```

to:

```text
ccmv-travel-engine-stage4f-a-dead-day-swipe-cleanup
```

No cache asset list changes were required.

## Static regression checks performed

- `node --check script.js` PASS
- `node --check sw.js` PASS
- `node --check data.js` PASS
- Production file scan found no remaining `day1.html`–`day5.html` references.

## Expected UI change

None.

## Manual deploy regression checklist

After deploy, test:

- `index.html` loads splash/home normally
- `day.html?day=1` loads
- `day.html?day=5` loads
- Days menu links still use `day.html?day=N`
- Bottom nav works
- No 404 request for `day1.html`–`day5.html`
- `/sw.js` shows cache name `ccmv-travel-engine-stage4f-a-dead-day-swipe-cleanup`

## Classification

PASS locally for static cleanup. Needs deploy verification before Patch 4F-B.
