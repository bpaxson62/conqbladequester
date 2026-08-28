import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { initAutoUpdater } from './updater'
import { registerIpcHandlers } from './ipc'
import { syncBundledContent } from './content'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    title: 'CB Quest Log',
    width: 1320,
    height: 860,
    minWidth: 1000,
    minHeight: 650,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // Open external links in the OS browser instead of a new Electron window.
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// Only one copy of the app may run at a time: two instances would both
// write the same electron-store progress file, and the last one to save
// would silently clobber the other's checked-off quests. A second launch
// instead focuses the window that's already open.
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
}

app.on('second-instance', () => {
  const [existing] = BrowserWindow.getAllWindows()
  if (!existing) return
  if (existing.isMinimized()) existing.restore()
  existing.focus()
})

app.whenReady().then(async () => {
  // Windows-specific app user model id for taskbar grouping / notifications
  electronApp.setAppUserModelId('com.bpaxson62.cbquestlog')

  // Default open/close DevTools shortcut (F12) and other dev conveniences.
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('app:getVersion', () => app.getVersion())
  registerIpcHandlers()

  // Merge bundled quest data (data/unlocks/*) into the local store before
  // the window loads, so the app opens already populated — no manual
  // import needed for content the app ships with.
  await syncBundledContent()

  createWindow()

  initAutoUpdater()

  app.on('activate', function () {
    // On macOS it's common to re-create a window when the dock icon is
    // clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user
// quits explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
