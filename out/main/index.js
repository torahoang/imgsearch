"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const icon = path.join(__dirname, "../../resources/icon.png");
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false,
      webSecurity: false,
      // Disable web security
      allowRunningInsecureContent: true
      // Allow loading local resources
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.ipcMain.handle("open-file", async (_, filePath) => {
    const cleanPath = filePath.replace(/\//g, "\\").replace(/^\\/, "").replace(/^([A-Z])\\/, "$1:\\");
    console.log("Opening file:", cleanPath);
    await electron.shell.openPath(cleanPath);
    return true;
  });
  electron.ipcMain.handle("open-folder-dialog", async () => {
    const result = await electron.dialog.showOpenDialog({
      properties: ["openDirectory"]
    });
    console.log("Selected folder:", result);
    return result;
  });
  createWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", {
      ipcRenderer: {
        invoke: (channel, ...args) => {
          const validChannels = ["open-file"];
          if (validChannels.includes(channel)) {
            return electron.ipcRenderer.invoke(channel, ...args);
          }
          throw new Error(`Invalid channel: ${channel}`);
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
}
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
