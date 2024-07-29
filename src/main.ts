import "@@/global.init"
import "@@/global.main.init"
import "@@/global.preload.init"
import { app, BrowserWindow, Menu } from "electron"
import path from "path"
import menu from "./menus/_menu"
import FileDialog from "@@/types/ipc/impl/FileDialog"

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) app.quit()

const createWindow = () => {
  const windowState = APP.AppWindow.loadWindowState()
  const preloadScript = path.join(__dirname, "preload.js")
  const mainWindow = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width || 800,
    height: windowState.height || 600,
    webPreferences: { preload: preloadScript, contextIsolation: true }
  })
  Menu.setApplicationMenu(menu)

  // Load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  else mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))

  // mainWindow.webContents.once("did-finish-load", () => {
  //   console.log("Window finished loading, sending init-data event")
  //   mainWindow.webContents.send("test-event", "Hello from main!")
  // })

  // Open the DevTools (can be toggled with "Cmd+Option+i").
  mainWindow.webContents.openDevTools()
  mainWindow.on("close", () => APP.AppWindow.saveWindowState(mainWindow))
}

app.whenReady().then(() => {
  createWindow()
  app.on("activate", () => {
    const noWindowsOpen = BrowserWindow.getAllWindows().length === 0
    if (noWindowsOpen) createWindow()
  })
  console.log(FileDialog)
})

// Quit app when all windows closed unless on mac
app.on("window-all-closed", () => process.platform !== "darwin" && app.quit())
app.on("open-file", (_, path) => console.yellow("OPENING", path))

IPC.mainHandle("FileDialog:getFilePath", FileDialog.getFilePath)
IPC.mainHandle("FileDialog:getFileContent", (_, [path]) => FileDialog.getFileContent(path))
IPC.mainHandle("FileDialog:getFile", (_, [path, encoding]) => FileDialog.getFile(path, encoding))
