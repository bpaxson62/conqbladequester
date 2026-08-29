# Changelog

All notable changes to this project are documented in this file.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/); this project follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.2.0] - 2026-08-29

First public release.

### Added

- Season / unit / stage / challenge quest tracking for Conqueror's Blade seasonal unlocks, with cross-unit prerequisites.
- Bundled quest data for seasons 1–16, merged into local progress on every launch so content updates never overwrite what you've completed.
- Derived completion model — stage, unit and season status are always computed from individual challenges, never stored as a flag.
- Undo guards that prevent retroactively unchecking a stage that later progress depends on.
- Quest search with fuzzy matching, plus tag filters (Siege, Free Battle, Death Match, Territory War, Open World, Fief Quests).
- Search match summary panel grouping matching quests by unlock.
- Auto-update via GitHub Releases (Windows and Linux; macOS builds are unsigned and do not auto-update).
- Single-instance lock so two copies can't clobber each other's saved progress.
- Renamed to CB Quest Log, with the packaging metadata (app id, product name, executable name, categories) de-templated from the electron-vite scaffold.
- Explicit immutable `id` on every unlock data file, so renaming a unit can no longer orphan progress or break the unlocks that depend on it.
- Linux desktop integration: an `.rpm` target for Fedora/RHEL, a proper executable name, and a `StartupWMClass` so GNOME can match the window to its icon instead of showing a generic placeholder.
- A real app icon (fortress mark) plus the `build/` platform icon set, replacing the placeholder.
- Stage progress shown on each unlock card, in place of an unused "Tier" field that was always 1.
- Stable per-challenge `key` in every data file. Challenge ids are now built from that key rather than array position, so quest content can be reordered, inserted into, or trimmed without moving players' completed checkmarks onto the wrong quests. Keys were seeded from existing positions, so no progress changed when this landed.
- `npm test` now validates all quest data (missing/duplicate keys, unresolvable or cross-season prerequisites, impossible `requiredPerStage`, stage numbering) instead of being a no-op.
- Real app icon, plus the `build/` platform icon set so packaged Windows/macOS builds no longer ship the default Electron logo.

### Fixed

- Locked unlocks could be completed anyway: the card showed a lock badge but its click handlers only checked stage ordering, not whether the unit's prerequisites were met.
