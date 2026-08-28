# Changelog

All notable changes to this project are documented in this file.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/); this project follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.1.0] - TBD

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

### Fixed

- Locked unlocks could be completed anyway: the card showed a lock badge but its click handlers only checked stage ordering, not whether the unit's prerequisites were met.
