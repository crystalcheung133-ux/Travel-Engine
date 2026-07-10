# STAGE 4F — Safe Cleanup Plan

Mode: **Plan only — no production code changed**

## Principle

Stage 4F should reduce historical override layers without changing the current UI. Every cleanup patch must answer:

1. What active source owns this behaviour now?
2. Why is this code dead or superseded?
3. What visible regression proves it is safe?
4. Was `sw.js` cache bumped after the patch?

Do **not** solve dead code by adding another override.

## Regression checklist for every Stage 4F patch

Minimum paths:

- `index.html` loading + home hero
- `trip.html`
- `guide.html`
- `day.html?day=1`
- `day.html?day=5`
- `place.html?id=fusion`
- `place.html?id=lune`
- one spa place
- one shop place
- `moments.html` add/edit/delete
- `expenses.html` add/edit/delete/totals
- bottom navigation
- `/sw.js` cache name check

## Patch sequence

### Patch 4F-A — Deleted-page reference cleanup

Target:

- `script.js` legacy swipe block that matches `day1.html`–`day5.html` and navigates to deleted pages.

Classification: **SAFE TO DELETE**

Expected production code files:

- `script.js`
- `sw.js` cache bump

Expected UI change:

- None.

Regression:

- `day.html?day=1` to `day.html?day=5` load normally.
- Day bottom menu links still work.
- No console error from missing `day1.html` route.

PASS condition:

- No visible difference.
- Current shared day renderer still active.

---

### Patch 4F-B — Remove old inactive expense dashboard CSS generations

Target:

- `.expense-dashboard-v31` CSS blocks
- `.expense-dashboard-v32` CSS blocks
- Any supporting classes used only by v31/v32 dashboard output, after search confirms not emitted by current `script.js`.

Classification: **SAFE TO DELETE / NEEDS SMALL PILOT**

Expected production code files:

- `styles.css`
- `sw.js` cache bump

Expected UI change:

- None.

Regression:

- `expenses.html` still displays Trip Total, Personal Spend, Settlement, Transaction History.
- Add expense, edit expense, delete expense still update latest-first history.

PASS condition:

- Dashboard remains visually unchanged.

---

### Patch 4F-C — Remove old inactive home logo generations

Target candidates:

- `.v3-hero-logo`
- `.v31-hero-logo`
- `.v32-watermark-home`
- `.home-v31`
- `.home-logo-mark`
- `.home-logo-cameo`
- `.home-logo-watermark`

Classification: **NEEDS PILOT**

Expected production code files:

- `styles.css`
- `sw.js` cache bump

Pre-check:

- Confirm `index.html` active home card uses `.v37-dashboard-home` and `.home-single-watermark` only.

Regression:

- Home remains one viewport.
- Hero card still has correct single bottom-right watermark.
- Bottom nav remains visible.
- Splash still unaffected.

PASS condition:

- Home screenshot before/after is visually identical.

---

### Patch 4F-D — Splash CSS cleanup pilot

Target:

- Remove old splash systems only after identifying final active selectors/keyframes.

Classification: **NEEDS PILOT**

Expected production code files:

- `styles.css`
- `sw.js` cache bump

Important:

- Do not touch logo asset.
- Do not introduce new opacity overrides.
- Do not edit `index.html` unless audit proves markup duplication is the issue.

Regression:

- Hard reload after clearing service worker/cache.
- Confirm exact sequence: logo first → CCMV slogan → VIETNAM 2026.
- Confirm no logo and destination overlap.

PASS condition:

- Sequence identical to current PASS version.

---

### Patch 4F-E — Watermark CSS cleanup pilot

Target:

- Old body/card wallpaper systems that are superseded by current selective watermark rules.

Classification: **NEEDS PILOT**

Expected production code files:

- `styles.css`
- `sw.js` cache bump

Regression:

- Guide popup list: no excessive watermark.
- Moments hero: intended watermark state preserved.
- Expenses hero: intended watermark state preserved.
- Trip Total card watermark preserved.
- Personal Spend and Settlement cards: no unwanted watermark.
- Activity cards still match current Stage 4E choice.

PASS condition:

- No reappearance of deleted/covered/excessive watermarks.

---

### Patch 4F-F — Script lifecycle cleanup

Target:

- Duplicated DOMContentLoaded calls and wrapper chains.

Classification: **NEEDS PILOT / HIGHER RISK**

Expected production code files:

- `script.js`
- `sw.js` cache bump

Do this late, after CSS cleanup is stable.

Regression:

- Friend selection persists.
- Moments modal opens with correct current user.
- Moments add/edit/delete works.
- Expenses modal opens with correct current user.
- Expenses add/edit/delete/totals work.
- Guide category modal still works, especially SHOP directory shortcut.

PASS condition:

- No behaviour change.

## Do not include in Stage 4F cleanup

These are separate feature/architecture stages:

- Converting duplicated HTML modal/nav markup into JS-injected shared components.
- Adding new swipe support for `day.html?day=N`.
- Reworking data schema.
- Redesigning splash or home page.
- Changing logo assets.
- Moving to build tooling/framework.

## Immediate recommended first patch

Start with **Patch 4F-A** only.

Reason: it removes a real stale reference to deleted files, should create zero visual change, and tests the Stage 4F workflow safely:

```text
Audit → Patch → Deploy → Regression Test → PASS → next cleanup
```
