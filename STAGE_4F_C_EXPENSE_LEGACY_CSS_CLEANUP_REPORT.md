# STAGE 4F-C — Expense Legacy CSS Cleanup Report

## Baseline

`Travel-Engine-main-stage4f-b-merged-css-cleanup.zip`

Stage 4F-B had already passed the user's deploy regression check.

## Scope

Small cleanup pilot only. No HTML, data, render logic, navigation, logo asset, or expense behaviour was changed.

## Active Source Confirmation

The active expense dashboard is generated in `script.js` as:

- `.expense-dashboard-v33`
- `.expense-total-card`
- `.expense-focus-grid`
- `.expense-focus-card`
- `.expense-history-block`

No production HTML, `script.js`, or `data.js` reference was found for:

- `.expense-dashboard-v31`
- `.expense-dashboard-v32`

## Production Changes

### `styles.css`

Removed only CSS rules/selectors tied to the inactive dashboard generations:

- `.expense-dashboard-v31 ...`
- `.expense-dashboard-v32 ...`

Where those selectors appeared in a mixed selector list, only the inactive selectors were removed. Active generic expense selectors and `.expense-dashboard-v33` selectors were retained.

### `sw.js`

Cache name bumped to:

`ccmv-travel-engine-stage4f-c-expense-legacy-css-cleanup`

## Files Added or Deleted

- Production files deleted: **0**
- Production files added: **0**
- Report file added: **1**

## Static Regression Checks

- `script.js` syntax: PASS
- `data.js` syntax: PASS
- `sw.js` syntax: PASS
- CSS brace balance: PASS
- CSS parser top-level errors: 0
- `.expense-dashboard-v31` remaining references: 0
- `.expense-dashboard-v32` remaining references: 0
- Active `.expense-dashboard-v33` render path retained: PASS
- Service-worker precache files all exist: PASS
- Diff limited to `styles.css`, `sw.js`, and this report: PASS

## Expected UI Change

None.

## Deploy Regression Checklist

1. Open `expenses.html` after the new service worker activates.
2. Confirm Trip Total card is visually unchanged and still keeps its watermark.
3. Confirm Personal Spend and Settlement cards remain visually unchanged and have no unwanted watermark.
4. Add one expense.
5. Edit the expense.
6. Delete the expense.
7. Confirm Transaction History remains latest-first.
8. Confirm totals and settlement update correctly.
9. Confirm cache name is `ccmv-travel-engine-stage4f-c-expense-legacy-css-cleanup`.

## Status

**READY FOR DEPLOY PILOT — not production PASS until live regression is confirmed.**
