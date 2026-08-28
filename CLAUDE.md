# conqbladequester — project context for AI coding assistants

Read this before making changes. It captures conventions and design
decisions that aren't obvious from the code alone.

## What this is

A cross-platform desktop quest tracker (Electron + Vue 3 + TypeScript) for
a video game whose seasonal content unlocks units/weapons/items through
multi-stage challenge lists with cross-unlock prerequisites. Built with
`electron-vite` (dev/build) and `electron-builder` (packaging/publishing).

## Core domain model

`Season -> Unlock -> Stage -> Challenge`, plus `Prerequisite` (unlock B
can require unlock A to have N stages completed).

**Nothing about completion is ever stored as a flag.** Stage/unlock/season
"complete" status is always _derived_ from the leaf `Challenge.done`
booleans, computed in `src/renderer/src/lib/progress.ts`
(`isStageComplete`, `isUnlockComplete`, `isSeasonComplete`,
`isUnlockAvailable`, etc). If you're tempted to add a stored `complete`
field anywhere, don't — recompute it instead.

## Content vs. progress — the most important separation in this app

- **Content** (the game's actual seasons/unlocks/stages/challenges) lives
  in version-controlled data files under `data/unlocks/**/*.js` (or
  `.json`). See `data/README.md` for the authoring format contributors
  use.
- **Progress** (which challenges a player has personally checked off) is
  saved locally per-install via `electron-store` and is never touched by
  a content update except to preserve it across a merge.
- On every app launch, `src/main/content.ts`'s `syncBundledContent()`
  re-parses every data file and merges it into the user's saved state,
  preserving `done` by challenge id. This is how a new app version's
  content updates "just work" without wiping anyone's progress.
- **Challenge ids are deterministic**, not random: `${unlockId}:s${stage}:${index}`
  (see `src/main/unlockFile.ts`). This is what makes the merge-without-
  losing-progress trick work — never change this to a random/UUID scheme.
- Data files can live in any subfolder structure under `data/unlocks/`
  (e.g. `data/unlocks/season5/Landsknechts.js`) — the folder is purely
  organizational. It's each file's own `season` field that determines
  which season an unlock actually belongs to. `findUnlockFiles()` scans
  recursively.
- Season sync (`syncBundledContent`) rebuilds the season list from what's
  actually referenced by current data files each run — it both adds new
  seasons and prunes ones no longer referenced, so a season
  renumber/rename cleans itself up automatically. Don't change this back
  to "only ever add" — that caused a real ghost-season bug once.

## Conventions to follow when adding/editing unlock data

- **Every file sets an explicit `id`, and a published `id` is immutable.**
  It defaults to a slug of `name`, but relying on that default means a
  later rename orphans all progress for that unlock, leaves a permanent
  duplicate ghost card, and silently breaks every `prerequisites` entry
  pointing at the old id. `name` is just a display label and can change
  freely; `id` cannot.
- `requiredPerStage` is set explicitly on every unlock. The default when
  omitted is "all challenges in the stage", which also means the
  completion threshold moves whenever the challenge count changes — so
  never leave it off. Typical values seen so far: 6 for the first unlock
  of a season, 8 for the second, 10 for the third, but always follow what
  the user states for the specific unit.
- `prerequisites` reference another unlock by its `id`, and it must be in
  the same season. Confirm the target file's actual `id` field before
  wiring one up — a reference to a nonexistent id makes the unlock
  permanently unavailable with no error shown.
- **Every challenge carries a permanent `key`, and challenge ids are
  `unlockId:s<stage>:<key>`.** Keys were seeded from array position, so
  they look like indices, but they are NOT positions — they never change
  once assigned. Reordering, inserting and deleting are all safe provided
  each row keeps its own key; a new challenge takes one higher than the
  highest key already used in that stage, and gaps are expected. Never
  renumber keys back into 0,1,2,… order: that silently moves players'
  completed checkmarks onto the wrong quests, and it's the one failure
  the validator can't catch. Editing challenge _text_ is always safe.
- **Run `npm test` after touching any data file.** It's
  `scripts/validate-data.mjs` and it checks missing/duplicate keys,
  unresolvable or cross-season prerequisites, impossible
  `requiredPerStage`, and stage numbering.
- Stage numbers start at 1, no gaps.
- Optional per-challenge `tags: string[]` — see "Search & tags" below.
- When transcribing quest text from a screenshot: fix obvious typos
  silently (this has been the established practice), but if part of the
  text is genuinely cut off/illegible, say so explicitly and ask rather
  than guessing at numbers — quest requirements need to be accurate.

## Progress-lock rule (important, easy to get wrong)

A user should never be able to uncheck a stage/unlock's progress if doing
so would silently invalidate a _later_ unlock's or stage's progress that
already depends on it being complete. This is implemented as a **dynamic,
recomputed-on-every-check guard**, not a stored lock flag — see
`canUndoStage`, `canUncheckChallenge`, `canUndoUnlock` in `progress.ts`.
Checking things off is always safe and never gated; only unchecking is
guarded. If the guard currently blocks an uncheck and the downstream
progress is later cleared, the guard releases automatically (it's just a
function of current state, not a flag that needs to be manually reset).

## Search & tags

`src/renderer/src/lib/search.ts` implements a **display-only** search: it
never filters, hides, or alters the actual unlock/stage/challenge tracking
UI. It only drives (a) a live match-count badge per season tab and (b) a
yellow highlight on matching (not-yet-done) challenge rows. Keep it that
way unless explicitly asked to change the interaction model — this was a
deliberate, explicit user request after an earlier version did filter the
UI.

- Default tags (`DEFAULT_TAG_KEYWORDS`) match one or more loose keywords
  against challenge text — a tag can list multiple keywords (e.g. "Open
  World" matches "open world", "loot site", _and_ "rebel").
- Custom tags come from a data file's optional per-challenge `tags`
  array, and show up as extra chips automatically.
- All tag chips are single-select — picking one clears whichever was
  active before, including other default tags. (Not a multi-select
  toggle — this was explicitly requested.)
- The fuzzy text matcher (`fuzzyScore`) prefers literal substrings and
  only falls back to loose subsequence matching for a single word, within
  a tight character span. It deliberately does **not** do subsequence
  matching across multi-word phrases — an earlier looser version matched
  almost everything in long quest sentences by coincidence. Don't loosen
  this without testing against real quest text first.

## Dev workflow — always verify before considering a change done

```bash
npm run typecheck
npm run lint
npm run build   # if `out/` already exists from a previous run and can't
                 # be deleted in your environment, `mv` it aside first
                 # rather than skipping the build check
```

All three should be clean before treating a task as finished.

## Release pipeline

Feature branch → PR → CI (typecheck/lint/test/build matrix) → merge to
`main` → push a `v*` tag → CI builds installers for
Windows/macOS/Linux → drafts a GitHub Release → **manually publish** the
draft → existing installs pick up the update via `electron-updater`
(checks on launch + every 4 hours). First installs are still manual
(download from the published release). See `.github/workflows/build.yml`
and `electron-builder.yml`.

- Linux: ship AppImage (auto-updatable); `deb` is included but isn't
  auto-updatable and doesn't work everywhere (e.g. Fedora) — AppImage is
  the one to actually test/use.
- macOS builds are unsigned (`CSC_IDENTITY_AUTO_DISCOVERY: false`) — fine
  for now, but auto-update reliability on macOS may need signing/
  notarization eventually.

## Contributing

See `CONTRIBUTING.md` for the human-facing PR checklist, and
`data/README.md` for the unlock data file format if you're adding or
editing quest content rather than app code.
