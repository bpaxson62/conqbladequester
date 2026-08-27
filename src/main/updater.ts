import { app, dialog } from 'electron'
import { autoUpdater } from 'electron-updater'
import { is } from '@electron-toolkit/utils'

/**
 * Wires up electron-updater against the GitHub Releases publish target
 * configured in electron-builder.yml.
 *
 * How it finds updates: on every run it checks the latest *published*
 * (non-draft, non-prerelease) GitHub Release for this repo and compares
 * its version to app.getVersion(). Draft releases are invisible to it —
 * that's what makes "build a draft, then publish when ready" a safe
 * two-step release process.
 *
 * Caveat: this checks in unsigned. Windows and Linux auto-update fine
 * without a code-signing certificate. macOS effectively requires the app
 * to be signed + notarized for auto-update to apply cleanly — on an
 * unsigned mac build, treat updates as "download the new installer
 * yourself" until you set up an Apple developer certificate.
 */
export function initAutoUpdater(): void {
  // Don't run against a dev build — there's no packaged app to replace,
  // and it would just fail trying to read update metadata that doesn't exist.
  if (is.dev) return

  autoUpdater.autoDownload = true
  autoUpdater.autoInstallOnAppQuit = true

  autoUpdater.on('error', (error) => {
    console.error('[auto-updater] error:', error)
  })

  autoUpdater.on('checking-for-update', () => {
    console.log('[auto-updater] checking for update…')
  })

  autoUpdater.on('update-available', (info) => {
    console.log('[auto-updater] update available:', info.version)
  })

  autoUpdater.on('update-not-available', () => {
    console.log('[auto-updater] already on the latest version')
  })

  autoUpdater.on('update-downloaded', (info) => {
    console.log('[auto-updater] update downloaded:', info.version)

    dialog
      .showMessageBox({
        type: 'info',
        buttons: ['Restart now', 'Later'],
        defaultId: 0,
        cancelId: 1,
        title: 'Update ready',
        message: `Version ${info.version} has been downloaded.`,
        detail: 'Restart the app to apply the update. It will also apply automatically next time you quit.'
      })
      .then(({ response }) => {
        if (response === 0) {
          autoUpdater.quitAndInstall()
        }
      })
  })

  // Check on launch, then every 4 hours while the app stays open.
  autoUpdater.checkForUpdates().catch((error) => {
    console.error('[auto-updater] initial check failed:', error)
  })
  setInterval(
    () => {
      autoUpdater.checkForUpdates().catch((error) => {
        console.error('[auto-updater] periodic check failed:', error)
      })
    },
    4 * 60 * 60 * 1000
  )

  app.on('before-quit', () => {
    // no-op placeholder: autoInstallOnAppQuit already handles apply-on-quit
  })
}
