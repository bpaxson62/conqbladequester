# Quest data

Everything in `data/unlocks/` ships with the app and loads automatically on
startup — no manual import needed. This is the actual game content
(seasons, unlocks, stages, challenges); it's separate from a player's own
progress, which is saved locally on their machine and is never touched by
these files except to add new challenges or update challenge text.

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
  rewardType: 'unit',      // 'unit' | 'weapon' | 'item' (default: 'unit')
  tier: 1,                 // required
  season: 1,                // required — which season this belongs to
  prerequisites: [],        // optional, see below — default: []
  unitChallenges: [
    { text: 'Defeat 18 bands of wandering rebels.', stage: 1 },
    { text: 'Win 4 Territory Wars.', stage: 2 },
    // tags is optional — see "Tags" below
    { text: 'Destroy a siege engine.', stage: 2, tags: ['engine'] },
    // ...
  ]
}
```

### Tags

The app's quest search has four built-in tags — Siege, Free Battle, Death
Match, Territory War — that match automatically against a challenge's own
text (loosely: "Death Match" matches "Deathmatches", "Territory War"
matches "Territory Wars", etc), so most challenges don't need anything
extra to be findable by them.

Add an optional `tags: string[]` to any challenge in `unitChallenges` for
cases the built-in keyword matching won't catch — a synonym, an
abbreviation, a game-specific term. Custom tags show up as extra filter
chips in the search bar automatically, and also match free-text search.

- `stage` numbers should start at 1 and count up with no gaps. A stage is
  considered complete once every challenge listed under that stage number
  is checked off in the app.
- `id` is optional — it defaults to a slug of `name` (e.g. "Kheshigs" →
  `kheshigs`). Only set it explicitly if you need a stable id independent
  of the display name, or if two unlocks would otherwise slugify to the
  same id.

### Prerequisites

An unlock with no `prerequisites` is available from the start of its
season. To require other unlocks first:

```js
prerequisites: [
  { unlockId: 'some-other-unlock', requiredStages: 3 },
  { unlockId: 'another-unlock', requiredStages: 3 }
]
```

`unlockId` refers to another unlock's `id` (or its slugified `name` if it
doesn't set `id` explicitly) — it must be in the **same season**.
`requiredStages` is how many of that unlock's stages must be fully
completed.

## Season display names (optional)

`data/seasons.json`, if present, maps season numbers to a friendlier
display name:

```json
[{ "number": 2, "name": "Season 2: Steppe Campaign" }]
```

Without an entry, a season just shows as "Season N".

## How this works under the hood

On every app start, every file here is parsed and merged into the
player's local save: new challenges are added, edited challenge text
updates, and anything the player already checked off stays checked —
matching is done by a stable id derived from the unlock + stage + the
challenge's position in that stage, not by random ids. Avoid reordering
existing challenges within a stage in a way that changes their position,
since that's what that id is derived from; adding new ones at the end of
a stage is safe.
