import { app, BrowserWindow, Menu } from "electron"
import path from "path"
import menu from "./menus/_menu"
import fs from "fs"
import os from "os"

const configPath = path.join(os.homedir(), "window-state.json")

function saveWindowState(window: BrowserWindow) {
  const bounds = window.getBounds()
  const state = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height
  }
  fs.writeFileSync(configPath, JSON.stringify(state))
}

function loadWindowState() {
  try {
    if (fs.existsSync(configPath)) {
      const data = fs.readFileSync(configPath)
      return JSON.parse(data.toString("utf8"))
    }
  } catch (error) {
    console.error("Error loading window state:", error)
  }
  return {}
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit()
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  })
  mainWindow.on("close", () => {
    saveWindowState(mainWindow)
  })

  Menu.setApplicationMenu(menu)

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  else mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))

  // Open the DevTools.
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
