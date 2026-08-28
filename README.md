# CB Quest Log

An open-source desktop tracker for **Conqueror's Blade** seasonal unit unlocks.

Each season gates its units behind multi-stage challenge lists, with later units
requiring earlier ones to be partly finished first. CB Quest Log keeps that whole
dependency tree in one place: what you've cleared, what's available to work on
right now, and what's still locked behind a prerequisite.

- **Tracks the full unlock chain** — seasons, units, stages, and per-stage challenge lists, including cross-unit prerequisites.
- **Nothing is stored as "complete"** — stage, unit and season completion are always derived from the individual challenges you tick off, so unchecking one thing never silently resets another.
- **Search and tag filtering** across every quest currently active in a season.
- **Ships with the quest data built in** — new and corrected content arrives with app updates; your progress is never overwritten.
- **Your progress stays local.** No account, no telemetry, no network calls except the update check.

> Unofficial fan project. Not affiliated with, endorsed by, or sponsored by
> Booming Games or MY.GAMES. _Conqueror's Blade_ and all related content are the
> property of their respective owners.

## Install

Download the installer for your platform from the
[latest release](https://github.com/bpaxson62/conqbladequester/releases):

| Platform | File                                                   |
| -------- | ------------------------------------------------------ |
| Windows  | `conqbladequester-<version>-setup.exe`                 |
| macOS    | `conqbladequester-<version>-<arch>.dmg`                |
| Linux    | `conqbladequester-<version>-<arch>.AppImage` or `.deb` |

macOS builds are currently unsigned — on first launch use **right-click → Open**
to get past Gatekeeper.

## Where your progress is saved

Progress lives in a JSON file in your OS user-data directory, separate from the
app install, so updates never touch it:

| Platform | Path                                                     |
| -------- | -------------------------------------------------------- |
| Windows  | `%APPDATA%\CB Quest Log\config.json`                     |
| macOS    | `~/Library/Application Support/CB Quest Log/config.json` |
| Linux    | `~/.config/CB Quest Log/config.json`                     |

Running from source (`npm run dev`) uses `conqbladequester` instead of
`CB Quest Log` in those paths, so your dev and installed progress are separate.

There is currently **no in-app export or backup** — if you care about your
progress, copy that `config.json` somewhere safe. See
[Known limitations](#known-limitations).

## Contributing quest data

Quest content is plain data files under `data/unlocks/`, one per unit — no app
changes needed to add a season. See **[data/README.md](./data/README.md)** for the
file format and, importantly, the rules about editing existing files without
corrupting players' saved progress.

## Development

Requires [Node.js](https://nodejs.org/) 20+ and npm 10+.

```bash
npm install
npm run dev
```

```bash
npm run lint
npm run typecheck
npm test          # validates every quest data file
```

### Build installers

```bash
# current platform, unpacked (fast, for local testing)
npm run build:unpack

# platform-specific installers
npm run build:win     # .exe (NSIS)
npm run build:mac     # .dmg
npm run build:linux   # .AppImage + .deb
```

CI is the reliable way to produce all three platforms; cross-compiling locally
works only in some cases.

### Releasing

Push a tag matching `v*` and GitHub Actions builds installers for all three
platforms and attaches them to a **draft** GitHub Release. Review, write the
notes, and publish it manually — auto-update clients only see it once published.

```bash
git tag v0.1.0
git push origin v0.1.0
```

## Project structure

```
src/
  main/        # Electron main process — window/app lifecycle, store, IPC
  preload/     # The only bridge between main and renderer
  renderer/    # Vue 3 UI — no direct Node access
  shared/      # Types shared across the process boundary
data/
  unlocks/     # Quest content, grouped into per-season folders
resources/     # Runtime assets (Linux window icon)
build/         # electron-builder packaging resources
```

Main and renderer are isolated (`contextIsolation: true`,
`nodeIntegration: false`). Anything the UI needs from the OS goes through the
narrow API in `src/preload/index.ts` — `ipcRenderer` and Node APIs are never
exposed to the renderer.

The `data/` folder ships alongside the app (`extraResources`) and is merged into
your local store on every launch, which is how content updates reach existing
installs without touching progress.

## Known limitations

Honest list of what isn't done yet:

- **No progress export/import or backup.** Losing `config.json` loses everything.
- **No unit tests for app logic.** `npm test` validates the quest data files, but the merge/progress code itself is untested.
- **Importing a `.js` unlock file executes it** with full Node privileges. Only import data files you wrote or trust — treat them as programs, not documents.
- **No progress migration mechanism**, so a future breaking change to the save format would need one written by hand.
- **macOS builds are unsigned**, so auto-update does not work on macOS.

## License

[MIT](./LICENSE)
