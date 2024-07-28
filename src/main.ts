import "./global/init"
import { app, BrowserWindow, Menu } from "electron"
import path from "path"
import menu from "./menus/_menu"
import { loadWindowState, saveWindowState } from "./app_data/WindowState"

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) app.quit()

const createWindow = () => {
  const windowState = loadWindowState()
  const mainWindow = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width || 800,
    height: windowState.height || 600,
    webPreferences: { preload: path.join(__dirname, "preload.js") }
  })
  Menu.setApplicationMenu(menu)
  mainWindow.on("close", () => saveWindowState(mainWindow))

  API.Function("ActivatorRefresh", {})

  // Load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  else mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))

  // Open the DevTools (can be toggled with "Cmd+Option+i").
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()
  app.on("activate", () => {
    const noWindowsOpen = BrowserWindow.getAllWindows().length === 0
    if (noWindowsOpen) createWindow()
  })
})

// Quit app when all windows closed unless on mac
app.on("window-all-closed", () => process.platform !== "darwin" && app.quit())
