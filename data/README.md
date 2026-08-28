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
  name: 'Kheshigs',        // required — shown in the app
  id: 'kheshigs',          // required in practice — see "The id field"
  rewardType: 'unit',      // 'unit' | 'weapon' | 'item' (default: 'unit')
  tier: 1,                 // required
  season: 1,               // required — which season this belongs to
  prerequisites: [],       // optional, see below — default: []
  requiredPerStage: 6,     // optional — see "requiredPerStage"
  unitChallenges: [
    { text: 'Defeat 18 bands of wandering rebels.', stage: 1 },
    { text: 'Win 4 Territory Wars.', stage: 2 },
    // tags is optional — see "Tags" below
    { text: 'Destroy a siege engine.', stage: 2, tags: ['engine'] },
    // ...
  ]
}
```

`stage` numbers start at 1 and count up with no gaps.

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

If omitted it defaults to *all* challenges in the stage. Because of that
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
local save. Progress is matched by a challenge id derived from
`unlockId + stage number + the challenge's position in that stage`:

```
kheshigs:s2:0    kheshigs:s2:1    kheshigs:s2:2   ...
```

That position is an **array index**. It is not derived from the challenge
text, so the app cannot tell that a quest moved — it only knows "slot 3 of
stage 2 was done". This makes some edits safe and others quietly destructive:

| Edit | Result |
| --- | --- |
| **Append** a challenge to the end of a stage | Safe. |
| **Fix the text** of a challenge in place | Safe — the id doesn't depend on text. Typo fixes are fine. |
| Add a whole new stage | Safe. |
| **Insert** a challenge anywhere but the end | **Everything after it shifts down one slot.** Each shifted quest inherits the previous occupant's checkmark, and the last one's progress is dropped. |
| **Delete** a challenge | **Everything after it shifts up one slot**, same mis-attribution in the other direction. |
| **Reorder** two challenges | **Their completion states swap.** |
| Change `id` | All progress for that unlock is orphaned; dependent unlocks break. |

Nothing warns the player when this happens. They just find a quest ticked
that they never did, and one they did do unticked.

**So: only ever append to a stage.** If a stage's contents genuinely need to
be reordered or trimmed to match the game, that's fine — just understand
you're resetting that stage for existing players, and say so in the PR so it
can go out in a release note.

## Season display names (optional)

`data/seasons.json`, if present, maps season numbers to a friendlier
display name:

```json
[{ "number": 2, "name": "Season 2: Steppe Campaign" }]
```

Without an entry, a season just shows as "Season N". This file does not
currently exist, so all seasons display generically — adding it is a
welcome, low-risk contribution.
