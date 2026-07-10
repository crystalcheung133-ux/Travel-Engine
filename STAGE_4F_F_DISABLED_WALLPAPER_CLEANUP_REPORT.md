# STAGE 4F-F — Disabled Wallpaper Pseudo-Element Cleanup

Baseline: Stage 4F-E (Deploy Regression PASS)

## Scope

Removed only the early v2.1.9 / v2.1.11 wallpaper pseudo-element chain that was already disabled inside the same historical layer and disabled again by later active visual layers.

Removed:

- early repeating `body::after` wallpaper
- early repeating card/modal `::after` watermark images
- their obsolete mobile sizing override
- the rollback declarations that immediately forced those pseudo-elements to `display:none!important` / `content:none!important`
- the old hidden `body.home-bg::before` logo background

Retained:

- card/modal `position:relative; overflow:hidden` foundation
- child `position:relative; z-index:1` stacking foundation
- all current Stage 4E selective watermark decisions
- Trip Total watermark
- current Home, Guide, Moments and Expenses visuals

## Production changes

- `styles.css`: removed the self-disabled historical pseudo-element chain
- `script.js`: visible build marker updated to `Build · Stage 4F-F`
- `sw.js`: cache name bumped

Production files deleted: **0**
Production files added: **0**

## Static checks

- JavaScript syntax: PASS
- Service-worker syntax: PASS
- CSS brace balance: PASS
- All precache paths exist: PASS
- Shared day/place routes retained: PASS
- Legacy deleted-day swipe code absent: PASS

## Deploy regression focus

- Confirm visible marker: `Build · Stage 4F-F`
- Home background and hero remain unchanged
- Activity cards remain solid and readable
- Guide popup rows have no unwanted watermark
- Moments / Expenses hero watermark state remains unchanged
- Trip Total watermark remains visible
- Personal Spend / Settlement remain without watermark
