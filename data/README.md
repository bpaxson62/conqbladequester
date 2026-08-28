# Quest data

Everything in `data/unlocks/` ships with the app and loads automatically on
startup — no manual import needed. This is the actual game content
(seasons, unlocks, stages, challenges); it's separate from a player's own
progress, which is saved locally on their machine.

> **Read [Editing existing files](#editing-existing-files-read-this) before
> changing any file that's already shipped.** Some edits that look harmless
> will silently attach a player's completed checkmarks to the wrong quest.

## Contributing an unlock

Add one file per unlock under `data/unlocks/`, named after the unlock
(e.g. `Kheshigs.js`). Either `.js` (CommonJS `module.exports`) or `.json`
works — pick whichever is easier to hand-write; `.js` is usually nicer
since trailing commas and comments are allowed.

Files can be organized into subfolders however's convenient — for
example one folder per season, like `data/unlocks/season1/Kheshigs.js`.
This is purely for keeping the repo tidy; the app scans every subfolder
recursively, and it's each file's own `season` field (not its folder)
that determines which season an unlock actually belongs to.

```js
module.exports = {
  name: 'Kheshigs', // required — shown in the app
  id: 'kheshigs', // required in practice — see "The id field"
  rewardType: 'unit', // 'unit' | 'weapon' | 'item' (default: 'unit')
  tier: 1, // required
  season: 1, // required — which season this belongs to
  prerequisites: [], // optional, see below — default: []
  requiredPerStage: 6, // optional — see "requiredPerStage"
  unitChallenges: [
    // `key` is a permanent id for this challenge within its stage.
    // Assign once, never renumber — see "Editing existing files".
    { key: 0, text: 'Defeat 18 bands of wandering rebels.', stage: 1 },
    { key: 0, text: 'Win 4 Territory Wars.', stage: 2 },
    // tags is optional — see "Tags" below
    { key: 1, text: 'Destroy a siege engine.', stage: 2, tags: ['engine'] }
    // ...
  ]
}
```

`stage` numbers start at 1 and count up with no gaps. Keys are numbered
per stage, so every stage starts again from 0.

### The `id` field

`id` is what every other file's `prerequisites` point at, and what the app
matches a player's saved progress against. It technically defaults to a slug
of `name` ("Liao's Rangers" → `liao-s-rangers`), but **every file in this repo
sets it explicitly, and new files should too.**

The reason: if `id` is left implicit, renaming a unit changes its id, and that
quietly does three bad things at once — the player's progress for that unit is
orphaned (all checkmarks reset), the orphaned copy sticks around forever as a
duplicate card, and every other unit whose `prerequisites` referenced the old
id becomes permanently unavailable with no error shown.

**Treat a published `id` as immutable.** Change `name` freely — it's only a
display label. Never change `id` on a file that has already shipped.

### `requiredPerStage`

How many challenges in a stage a player must tick off for that stage to count
as complete. The game generally doesn't require all of them — a stage of 12
challenges might only need 10.

If omitted it defaults to _all_ challenges in the stage. Because of that
default, adding or removing a challenge in a stage that has no explicit
`requiredPerStage` also moves the completion threshold, which can re-lock
stages a player had already cleared. Set it explicitly.

### Tags

The app's quest search has built-in tags — Siege, Free Battle, Death Match,
Territory War, Open World, Fief Quests — that match automatically against a
challenge's own text (loosely: "Death Match" matches "Deathmatches",
"Territory War" matches "Territory Wars"), so most challenges don't need
anything extra to be findable by them.

Add an optional `tags: string[]` to any challenge for cases the built-in
keyword matching won't catch — a synonym, an abbreviation, a game-specific
term. Custom tags show up as extra filter chips automatically.

### Prerequisites

An unlock with no `prerequisites` is available from the start of its
season. To require other unlocks first:

```js
prerequisites: [
  { unlockId: 'some-other-unlock', requiredStages: 3 },
  { unlockId: 'another-unlock', requiredStages: 3 }
]
```

`unlockId` refers to another unlock's `id` — it must be in the **same
season**. `requiredStages` is how many of that unlock's stages must be fully
completed. A reference to an id that doesn't exist makes the unlock
permanently unavailable, silently, so double-check spelling against the
target file's `id`.

## Editing existing files (read this)

On every app start, each file here is re-parsed and merged into the player's
local save. Progress is matched by a challenge id built from
`unlockId + stage number + the challenge's key`:

```
kheshigs:s2:0    kheshigs:s2:1    kheshigs:s2:2   ...
```

That trailing number is the challenge's **`key`**, not its position in the
array. It happens to have started life as the position — keys were seeded
from array order when they were introduced, so existing ids didn't change —
but from now on the two are independent. Rows can move; keys don't.

| Edit                                                | Safe?                                                                            |
| --------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Append** a challenge to a stage (next unused key) | Yes                                                                              |
| **Fix the text** of a challenge                     | Yes — ids don't depend on text                                                   |
| **Reorder** challenges within a stage               | Yes, as long as each row keeps its own `key`                                     |
| **Delete** a challenge                              | Yes — retire its key, don't reuse it                                             |
| Add a whole new stage                               | Yes                                                                              |
| **Renumber or reuse a `key`**                       | **No — this silently moves players' completed checkmarks onto the wrong quests** |
| Change an unlock's `id`                             | **No — orphans all progress for that unit and breaks dependent unlocks**         |

The one rule: **a `key` is assigned once and never changes.** When you add a
challenge, give it one higher than the highest key already used in that stage,
even if that leaves gaps — gaps are completely fine and expected. Never
"tidy up" keys back into 0,1,2,… order.

Run `npm test` before opening a PR. It validates every data file: missing or
duplicate keys, unresolvable or cross-season prerequisites, impossible
`requiredPerStage` values, and stage numbering. It cannot detect a _renumbered_
key, though — that one is on you and your reviewer, which is exactly why keys
are written explicitly in the file where a diff will show them changing.

## Season display names (optional)

`data/seasons.json`, if present, maps season numbers to a friendlier
display name:

```json
[{ "number": 2, "name": "Season 2: Steppe Campaign" }]
```

Without an entry, a season just shows as "Season N". This file does not
currently exist, so all seasons display generically — adding it is a
welcome, low-risk contribution.
