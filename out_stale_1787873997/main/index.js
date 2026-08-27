import { dialog, app, ipcMain, BrowserWindow, shell } from "electron";
import { join } from "path";
import { is, electronApp, optimizer } from "@electron-toolkit/utils";
import { autoUpdater } from "electron-updater";
import __cjs_mod__ from "node:module";
const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const require2 = __cjs_mod__.createRequire(import.meta.url);
const icon = join(__dirname, "../../resources/icon.png");
function initAutoUpdater() {
  if (is.dev) return;
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.on("error", (error) => {
    console.error("[auto-updater] error:", error);
  });
  autoUpdater.on("checking-for-update", () => {
    console.log("[auto-updater] checking for update…");
  });
  autoUpdater.on("update-available", (info) => {
    console.log("[auto-updater] update available:", info.version);
  });
  autoUpdater.on("update-not-available", () => {
    console.log("[auto-updater] already on the latest version");
  });
  autoUpdater.on("update-downloaded", (info) => {
    console.log("[auto-updater] update downloaded:", info.version);
    dialog.showMessageBox({
      type: "info",
      buttons: ["Restart now", "Later"],
      defaultId: 0,
      cancelId: 1,
      title: "Update ready",
      message: `Version ${info.version} has been downloaded.`,
      detail: "Restart the app to apply the update. It will also apply automatically next time you quit."
    }).then(({ response }) => {
      if (response === 0) {
        autoUpdater.quitAndInstall();
      }
    });
  });
  autoUpdater.checkForUpdates().catch((error) => {
    console.error("[auto-updater] initial check failed:", error);
  });
  setInterval(
    () => {
      autoUpdater.checkForUpdates().catch((error) => {
        console.error("[auto-updater] periodic check failed:", error);
      });
    },
    4 * 60 * 60 * 1e3
  );
  app.on("before-quit", () => {
  });
}
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1e3,
    height: 700,
    show: false,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}
app.whenReady().then(() => {
  electronApp.setAppUserModelId("com.yourname.myelectronapp");
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });
  ipcMain.handle("app:getVersion", () => app.getVersion());
  createWindow();
  initAutoUpdater();
  app.on("activate", function() {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
