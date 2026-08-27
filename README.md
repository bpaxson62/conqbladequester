# My Electron App

An open-source, cross-platform desktop app built with [Electron](https://www.electronjs.org/), [Vue 3](https://vuejs.org/), and TypeScript, using [electron-vite](https://electron-vite.org/) for the dev/build tooling and [electron-builder](https://www.electron.build/) for packaging installers.

## Requirements

- [Node.js](https://nodejs.org/) 20+
- npm 10+

## Project setup

```bash
npm install
```

## Develop

Runs the app in dev mode with hot reload for the renderer.

```bash
npm run dev
```

## Lint, typecheck, test

```bash
npm run lint
npm run typecheck
npm test
```

## Build installers

```bash
# current platform, unpacked (fast, for local testing)
npm run build:unpack

# platform-specific installers
npm run build:win     # .exe (NSIS)
npm run build:mac     # .dmg
npm run build:linux   # .AppImage + .deb
```

Cross-compiling for another OS from your machine is possible in some cases (electron-builder docs cover this) but the CI workflow below is the reliable way to get all three platforms built.

## Releasing

Push a tag matching `v*` (e.g. `v0.1.0`) and GitHub Actions (`.github/workflows/build.yml`) builds installers for Windows, macOS, and Linux and attaches them as a **draft** GitHub Release. Review the draft, edit the release notes, and publish it manually.

```bash
git tag v0.1.0
git push origin v0.1.0
```

## Project structure

```
src/
  main/        # Electron main process (Node.js side — window/app lifecycle)
  preload/     # Preload scripts — the only bridge between main and renderer
  renderer/    # Vue 3 app — the UI, sandboxed, no direct Node access
resources/     # App icon and other packaged assets
build/         # electron-builder resources (entitlements, icons for packaging)
```

Main and renderer are intentionally isolated (`contextIsolation: true`, `nodeIntegration: false`). Anything the UI needs from the OS/filesystem goes through a narrow, explicit API defined in `src/preload/index.ts` and exposed via `contextBridge` — never expose `ipcRenderer` or Node APIs directly to the renderer.

## Icon

`resources/icon.png` is a placeholder — replace it with your app's real icon before your first release. electron-builder derives the platform-specific formats (`.ico` for Windows, `.icns` for macOS) from it automatically in most setups; see the [electron-builder icon docs](https://www.electron.build/icons) if you want to provide per-platform icons explicitly.

## License

[MIT](./LICENSE)
