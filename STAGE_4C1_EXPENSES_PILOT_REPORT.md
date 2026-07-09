# Stage 4C-1 — Expenses Open/Save Pilot

## Scope

Changed files:

- `script.js`
- `sw.js`

No HTML, CSS, itinerary, place, Moments, or data schema changes.

## What changed

A final explicit Stage 4C-1 canonical active handler block was appended to `script.js` for:

- `window.openExpenseModal`
- `window.saveExpense`

It also assigns `window.resetExpenseForm` because open/save depends on the same reset behavior for current-user payer defaults.

The existing older expense wrapper chain is retained as deferred legacy code in this pilot. The new Stage 4C-1 block runs last, so the live active open/save pair is now explicit in one place without changing storage schema or UI copy.

## Preserved behavior

- Expense modal stays open after save for fast multiple entries.
- Paid-by UI panel remains available.
- New expense defaults to current selected friend.
- Personal expense mode and shared split mode are preserved.
- Existing `expenses` localStorage schema is unchanged.
- Existing `renderExpenses()` remains unchanged.
- Moments code was not touched.

## Deferred

The older expense wrapper blocks remain in `script.js` for this pilot. They are inactive for open/save after the final Stage 4C-1 assignment, but should only be deleted after browser regression passes.

Suggested next step after PASS: Stage 4C-2 can safely remove or consolidate legacy expense wrappers and clean `renderExpenses` / `editExpense` / reset chains.

## Manual regression checklist

Test in browser after deploy:

- Open Expenses modal from Home/Day/Guide.
- Save a shared expense.
- Save a personal expense.
- Confirm modal stays open after save.
- Confirm payer defaults back to current friend after save.
- Confirm Expenses page totals update.
- Confirm transaction history updates.
- Edit an existing expense.
- Delete an expense.
- Confirm Moments still works.
