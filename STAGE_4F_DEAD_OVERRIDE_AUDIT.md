# STAGE 4F — Dead Override / Legacy Directive Audit

Baseline ZIP: `Travel-Engine-main-splash-sequence-fix.zip`  
Audit mode: **Audit Only — no production code changed**  
Repository root inspected: `Travel-Engine-main/`

## 0. Protocol files read first

Read and used as constraints:

- `ENGINE_CHANGE_PROTOCOL.md`
- `ENGINE_FILE_MAP.md`
- `HOW_TO_UPDATE_TRIP.md`

Key rules confirmed:

- Content active source: `data.js`
- Shared day renderer: `day.html?day=1` through `day.html?day=5`
- Shared place renderer: `place.html?id=...`
- UI active source: `styles.css`
- Behaviour active source: `script.js`
- PWA/offline active source: `sw.js`
- Legacy individual day pages and place pages should remain deleted.

## 1. File inventory / active render path

Current production files found:

```text
index.html
trip.html
guide.html
itinerary.html
day.html
place.html
moments.html
expenses.html
memory.html
offline.html
styles.css
script.js
data.js
sw.js
manifest.json
ccmv-logo-calibrated.png
splash-logo.png
logo-monogram-transparent.png
logo-watermark-monogram.png
icon-192.png
icon-512.png
```

Removed legacy pages were not present in the ZIP:

- `day1.html`–`day5.html` absent
- legacy place pages such as `fusion.html`, `lune.html`, `bakes.html` absent
- `styles.clean.css` absent

Active render path confirmed:

```text
Trip / Places / Itinerary / Bookings data
→ data.js
→ script.js render helpers
→ shared HTML shells
   - day.html?day=N
   - place.html?id=PLACE_ID
   - guide.html / trip.html / moments.html / expenses.html
→ styles.css
```

## 2. High-level audit summary

| Area | Finding | Risk |
|---|---|---|
| `styles.css` | 1,828 lines, 958 parsed rule blocks, 155 duplicate selectors, 1,876 `!important` declarations | High maintenance risk; active rule often depends on late-file order |
| Splash CSS | Multiple splash systems still coexist: v4 block, Stage 1.1 block, 11.43a, 11.43b, 11.43c/d-era final sequence | Medium risk; recent opacity bug came from this pattern |
| Watermark CSS | Multiple historical watermark systems coexist: body wallpaper, card watermark, modal watermark, hero watermark, selective feature watermark | High risk; many rules intentionally override earlier systems |
| `script.js` | 905 lines; several known override chains remain, especially navigation, Moments, Expenses, friend selection | Medium-high risk; behaviour depends on last assignment order |
| HTML | Shared pages are active, but modal/bottom-nav markup is duplicated in most pages; inline boot scripts exist in page shells | Medium risk; component edits require multi-page consistency |
| `sw.js` | Cache list matches current file set and does not cache deleted legacy pages | Low risk; cache name already bumped for splash fix |

## 3. `styles.css` audit

### 3.1 Duplicate selectors found

Parsed CSS found **155 duplicate selector groups**. Not all duplicates are wrong: some are responsive overrides and some are intentional late-stage fixes. But many are historical layers that make Active Source hard to determine.

Representative high-impact duplicate selectors:

| Selector | Lines | Notes |
|---|---:|---|
| `.timeline-item` | 65, 204, 220, 238 | Multiple layout definitions; likely legacy + later compact-day fixes |
| `.timeline-actions` | 66, 205, 225 | Earlier and later grid/action button definitions overlap |
| `.timeline-actions button,.timeline-actions a` | 42, 226, 593 | Button sizing/readability repeatedly overridden |
| `body.home-bg::before` | 81, 96, 107 | Home background/watermark history; line 107 sets `display:none!important` |
| `.home-logo-mark` | 199, 234, 250 | Later v3.2 rule hides `.home-logo-mark` globally |
| `.home-brand-card.v3-hero-logo` | 253, 276 | Old v3 home hero no longer appears active |
| `.home-brand-card.v32-watermark-home h1` | 342, 388, 409 | Older home generation retained |
| `.home-single-watermark` | 387, 408, 453, 493, 1178 | Several generations of hero watermark logic coexist |
| `.moments-sheet,.tools-sheet` | 351, 390, 613, 619, 645, 670, 1023, 1038 | Heavy modal override chain; high-risk cleanup area |
| `.moments-sheet h2,.tools-sheet h2` | 353, 391, 614, 619, 647, 671, 1038 | Same modal heading repeatedly tuned |
| `.expense-dashboard-v31...` / `.expense-dashboard-v32...` / `.expense-dashboard-v33...` | 311 onward, 377 onward, 422 onward | Older expense dashboard styles remain beside active v33 output |
| `.app-nav a,.app-nav button` | 20, 81, 485, 585, 1207 | App nav styling repeated across several generations |
| `.mini-menu a,.mini-menu button` | 25, 1211, 1360 | Duplicated menu button styling |

### 3.2 `!important` density

Found **612 CSS rule blocks containing `!important`** and **1,876 total `!important` declarations**.

This is the single biggest maintainability warning. In this file, `!important` is no longer just for emergency patches; it is effectively part of the normal cascade. That means normal edits earlier in the file often do nothing.

High-risk `!important` areas:

- splash/loading sequence
- modal sheets
- moments/expenses popup layout
- watermarks
- home hero viewport fit
- bottom navigation
- timeline/day cards

### 3.3 Splash/loading CSS audit

Current splash-relevant blocks:

| Lines | Block | Status |
|---:|---|---|
| 1099–1114 | `CCMV Splash / Loading Screen (v4)` | Earlier splash system still present |
| 1215–1226 | Stage 1.1 visual alignment splash/card system | Partly overridden later |
| 1227 onward | 11.43a loading sequence hotfix | Active/pilot candidate |
| 1253 onward | 11.43b elegant splash + hero watermark | Active/pilot candidate |
| Later 11.43c/d sequence rules | Latest active sequence area | Active source for fixed logo → slogan → Vietnam sequence |

Important audit point: the latest bug was caused by old `opacity: !important` declarations overriding animation. The current file still contains several splash systems in the same stylesheet, so Stage 4F should isolate the final splash rules only after a visual regression test.

Classification:

- **Safe to delete after pilot:** old hidden/overridden splash card rules that are not referenced by active `#ccmvSplash` markup.
- **Needs pilot:** all splash keyframes and opacity/timing rules.
- **Do not touch yet:** latest 11.43 fixed sequence until screenshot/video regression confirms exact order.

### 3.4 Watermark CSS audit

Multiple watermark systems coexist:

| Lines | System | Finding |
|---:|---|---|
| 97–108 | v2.1.9/v2.1.11 body/card wallpaper watermark | Largely superseded by later global/card systems |
| 625–666 | Global watermark using `body::before` and hero cards | Later Stage 1.1 also defines body background/watermark |
| 759–813 | Card watermark variable system | Superseded/modified by later v3.9.6a hotfixes |
| 826–987 | v3.9.6a modal/card watermark hotfixes | Relevant but duplicated by later “REAL hotfix” |
| 1199 onward | “Remove repeated decorative watermark systems” and home mark | Later product-family alignment layer |
| 1260 onward | 11.43b/4E hero and feature watermark system | Likely current active UI polish layer |

Classification:

- **Safe to delete after pilot:** old `body::after` wallpaper and early `.dash-card::after` watermark rules if current screenshots prove Stage 1.1/11.43 system owns global branding.
- **Needs pilot:** modal sheet watermark rules because they have been repeatedly patched for scroll/close behaviour.
- **Do not touch yet:** current selective hero/card watermark rules requested in Stage 4E, especially Trip Total retained, Moments/Expenses hero handling, and deleted modal list watermarks.

### 3.5 CSS selectors likely unused or legacy

Static scan found many CSS classes not present in current HTML or generated strings in `script.js`. Some may be historical and safe to delete; some may be injected by data or browser state and need confirmation.

Likely legacy / high-confidence cleanup candidates:

```text
v3-hero-logo
v31-hero-logo
v32-watermark-home
home-v31
home-logo-mark
home-logo-cameo
home-logo-watermark
home-countdown
home-launch-grid
expense-dashboard-v31
expense-dashboard-v32
expense-mini-grid
expense-page-grid
expense-top-panel
expense-summary
expense-summary-block
latest-transactions
friend-progress
progress-bar
progress-meta
start-link
hero-subtitle
section-title
trip-grid
trip-list-compact
```

Needs pilot / check before deletion:

```text
dash-card
dash-hero
day-lite-note
day-swipe-hint
journey-note
next-hop
shopping-flow-list
settlement-card
mama-sheet
unexpected-form
```

Reason: these may be old page shells, old generated markup, or dormant modals. Some classes are referenced only in CSS comments or old blocks.

### 3.6 Fully overridden / dead declarations observed

High-confidence examples:

- `.dash-logo { ... display:none!important }` near line 76 appears to permanently suppress an older logo element.
- `body.home-bg::before` has multiple definitions and the v2.1.11 version sets `display:none!important`, making earlier opacity/background settings dead.
- `.home-logo-cameo,.home-logo-mark,.home-logo-watermark{display:none!important}` at v3.2 likely makes previous `.home-logo-mark` sizing rules dead.
- `.expense-dashboard-v31` and `.expense-dashboard-v32` styles are likely dead because active render output uses `.expense-dashboard-v33` in `script.js` line 863.
- Earlier `.moments-sheet,.tools-sheet` dimensions are repeatedly superseded by later rules around lines 645, 670, 1023, 1038.

## 4. `script.js` audit

### 4.1 Duplicate function declarations / override chains

Static function scan found these duplicate or reassigned symbols:

| Symbol | Lines | Finding |
|---|---:|---|
| `toggleMenu` | 36, 444 | Initial function then v3.9.3 `window.toggleMenu` override with positioning |
| `toggleTripMenu` | 37, 453 | Initial function then v3.9.3 override |
| `toggleGuideMenu` | 37, 454 | Initial function then v3.9.3 override |
| `toggleDays` | 37, 455 | Initial function then v3.9.3 override |
| `setFriend` | 41, 527 | Initial function then wrapper to reset expense/moments UI |
| `renderLatestExpenseMini` | 201, 387 | Earlier function then window assignment inside v3.2 block |
| `polishExpenseCopy` | 415, 426 | Internal function then exposed on window |
| `simplifyMomentsAuthor` | 515, 524 | Internal function then exposed on window |

### 4.2 Runtime function reassignment

The file still relies on runtime reassignment as an intentional architecture pattern:

- lines 241–250: `openGuideCategory` is wrapped for SHOP directory shortcut.
- lines 444–455: navigation functions are overwritten with positioned mini-menu versions.
- lines 526–531: `setFriend` is wrapped to update open modals.
- lines 693–740: final `openExpenseModal`, `saveExpense`, `resetExpenseForm` assigned in Stage 4C-1.
- lines 836–899: final `renderExpenses`, `editExpense`, `deleteExpense` assigned in Stage 4C-2.

This is functional but fragile. A future cleanup should consolidate these into final declarations rather than wrappers.

### 4.3 Legacy fallback / compatibility code

Found legacy-compatible code that is probably intentional but should be classified:

| Lines | Code | Classification |
|---:|---|---|
| 76–82 | `var openMomentsModal, saveMoments...` placeholders | Needs pilot; may be removable after verifying global onclick timing |
| 361–373 | Reads old `moment_` localStorage keys into `moments_list` | Do not touch yet unless old saved data migration is intentionally dropped |
| 540–583 | Booking helper functions not called anywhere | Safe to delete or move to deferred docs, unless near-term bookings UI planned |
| 693–740 / 836–899 | Stage 4C canonical expense handlers | Do not touch now; current deploy PASS depends on them |

### 4.4 References to deleted files/pages

Critical finding:

`script.js` still contains a legacy swipe handler for deleted day pages:

```text
lines 459–470:
location.pathname.match(/day([1-5])\.html$/)
window.location.assign(`day${next}.html`)
```

Because active day pages are now `day.html?day=1` through `day.html?day=5`, this block no longer matches the active route and would navigate to deleted files if it ever did match.

Classification: **SAFE TO DELETE or REPLACE WITH NEW SHARED DAY SWIPE PILOT**.

Because this block currently does not run on `day.html?day=N`, deleting it is low risk. Replacing it with active query-param swipe would be a feature change and should be a separate pilot.

### 4.5 Duplicate DOMContentLoaded work

Multiple DOMContentLoaded listeners call the same render functions:

- line 116: `updateFriendLabels(); renderMoments(); renderUnexpected(); renderExpenses(); loadChecklist(); renderDashboard();`
- line 401: `renderMoodButtons([]); renderMoments(); renderExpenses();`
- line 407–410: removes `.summary-link-row`, then `renderExpenses(); renderMoments();`
- line 533–535: `simplifyMomentsAuthor();`
- line 740: expense paid-by UI setup
- line 901–903: paid-by UI setup + render expenses

This is not necessarily broken, but it is a performance/maintainability smell. It also makes Active Render Path harder to reason about.

Classification: **Needs pilot**. Consolidate only after Moments/Expenses regression test is defined.

## 5. HTML audit

### 5.1 Shared HTML shells are active

Current pages use the intended shared model:

- `day.html` contains the shared day renderer and loads `data.js` + `script.js`.
- `place.html` contains the shared place renderer and loads `data.js` + `script.js`.
- page links use `day.html?day=N` and `place.html?id=...`.

### 5.2 Inline scripts

Inline scripts are present in most pages. Some are active bootstraps, not necessarily dead:

| File | Inline script purpose | Status |
|---|---|---|
| `index.html` | splash hide/register service worker + modal markup | Active |
| `day.html` | render current day from `ITINERARY_DATA` | Active |
| `place.html` | read `id` param and call `renderPlacePage` | Active |
| `guide.html` | static guide directory plus common modals | Active but content partly duplicates `data.js`/guide structures |
| `trip.html` | static trip content plus common modals | Needs pilot; some trip card data also exists in `data.js` |
| `moments.html` / `expenses.html` | page shell + modals | Active |

### 5.3 Duplicated markup across pages

Most HTML files duplicate:

- top app nav
- mini menus
- day links
- friend modal
- moments modal
- expenses modal
- bottom nav

This is expected for a static/PWA build, but it is a maintenance risk. Cleanup should not try to remove this during Stage 4F unless a shared component injection system is intentionally introduced.

Classification: **NEEDS PILOT**, not safe-delete.

### 5.4 Deleted-file links

No active HTML links to deleted `day1.html`–`day5.html` or old place pages were found in production HTML. References to removed pages appear only in documentation files and the stale swipe block in `script.js`.

## 6. `sw.js` audit

### 6.1 Cache name

Current cache:

```js
const CACHE_NAME = 'ccmv-travel-engine-stage4e22-splash-sequence-fix';
```

This matches the latest splash-fix context.

### 6.2 Cached files

`sw.js` caches current active app files:

```text
./
./index.html
./styles.css
./script.js
./data.js
./manifest.json
./place.html
./day.html
./offline.html
./icon-192.png
./icon-512.png
./logo-watermark-monogram.png
./logo-monogram-transparent.png
./splash-logo.png
./ccmv-logo-calibrated.png
./guide.html
./itinerary.html
./memory.html
./moments.html
./expenses.html
./trip.html
```

No stale cache entries found for:

- `day1.html`–`day5.html`
- old place pages
- `styles.clean.css`

### 6.3 Strategy consistency

Strategy appears consistent:

- install: pre-cache app shell
- activate: delete old caches
- navigation/html: network-first with offline fallback
- assets: cache-first / cache update pattern

Classification: **DO NOT TOUCH** except bump `CACHE_NAME` after any real production patch.

## 7. Classification list

### SAFE TO DELETE — after one small pilot PR/patch

These have high confidence but still should be removed in a small patch, not all at once:

1. Legacy day swipe block in `script.js` lines 459–500 because active page is `day.html?day=N`, not `dayN.html`.
2. Unused Stage 1.5 booking helper functions in `script.js` lines 540–583, if no bookings UI is planned in the next stage.
3. CSS for `.expense-dashboard-v31` and `.expense-dashboard-v32`, because active `renderExpenses()` outputs `.expense-dashboard-v33`.
4. Old home logo classes hidden by later rules: `.home-logo-mark`, `.home-logo-cameo`, `.home-logo-watermark`, plus old `.v3-hero-logo`, `.v31-hero-logo`, `.v32-watermark-home` blocks, after confirming `index.html` uses `.v37-dashboard-home` only.
5. Early `body.home-bg::before` definitions that are later set to `display:none!important`, after screenshot check.

### NEEDS PILOT

1. Splash/loading CSS consolidation. Must preserve exact logo → slogan → Vietnam sequence.
2. Watermark system consolidation. Must preserve current Stage 4E decisions: Guide popup list watermarks removed, Moments/Expenses hero watermark handling, Trip Total retained.
3. Modal sheet CSS consolidation for `.moments-sheet,.tools-sheet,.guide-sheet,.trip-sheet,.mama-sheet` because scroll/close behaviour has been fragile.
4. DOMContentLoaded render consolidation in `script.js` because Moments/Expenses rely on repeated late calls.
5. `openGuideCategory` wrapper consolidation because SHOP directory behaviour is active.
6. HTML shared component deduplication, if desired, because it changes architecture beyond simple cleanup.
7. Replacing legacy day swipe with active query-param swipe. Deleting old block is cleanup; adding new swipe is feature work.

### DO NOT TOUCH NOW

1. `data.js` canonical data structures.
2. Current Stage 4C-1/4C-2 Expenses handlers in `script.js` lines 693–899.
3. Current Moments append/edit/delete implementation in `script.js` lines 277–402, except after a dedicated Moments regression test.
4. Latest splash sequence rules until visual regression is captured.
5. `sw.js` cache list, except cache-name bump after a real patch.
6. Existing logo assets. No redraw.

## 8. Recommended Stage 4F cleanup order

This is not a patch plan yet; it is the audit-derived safest order.

1. **Pilot A — delete stale deleted-page references only**
   - Remove or disable legacy `dayN.html` swipe block.
   - No UI should change.
   - Regression: `day.html?day=1`–`5`, bottom day links, Guide place links.

2. **Pilot B — remove obviously dead old dashboard CSS**
   - Target only `.expense-dashboard-v31`, `.expense-dashboard-v32`, old home logo generations that are not in HTML or active JS output.
   - Regression: Home, Expenses dashboard, Moments page.

3. **Pilot C — splash CSS isolation**
   - First write down final active splash selectors/keyframes.
   - Then remove old splash systems one generation at a time.
   - Regression: hard refresh + service worker cache check + visible loading sequence.

4. **Pilot D — watermark CSS consolidation**
   - Consolidate from broad global/card wallpaper systems to final selective watermark system.
   - Regression: Home, Trip, Guide modal list, Moments hero, Expenses hero, Trip Total, personal spend, settlement.

5. **Pilot E — script render lifecycle cleanup**
   - Consolidate duplicated DOMContentLoaded calls only after visual/UI cleanup is stable.
   - Regression: Moments add/edit/delete, Expenses add/edit/delete/totals, friend switch while modal open.

## 9. Stage 4F audit conclusion

The ZIP is functionally in a good state, but `styles.css` is not yet a clean Engine Master. It still reads like a long patch history where the final UI depends heavily on late selectors and `!important`. `script.js` is cleaner after Stage 4C/4D, but still uses wrapper chains and legacy compatibility blocks.

The safest next action is **not** a broad cleanup. Start with a very small cleanup pilot that cannot visually change the site: remove the stale `day1.html`–`day5.html` swipe block or mark it inactive, then deploy/regression test. After that, remove old inactive CSS generations in small groups.
