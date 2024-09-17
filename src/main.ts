import "@@/global.init"
import "@@/global.main.init"
import "@@/global.preload.init"
import { app, BrowserWindow, Menu, session } from "electron"
import path from "path"
import menu from "./menus/_menu"
import FileDialog from "@@/types/ipc/impl/FileDialog"
import { Util } from "@@/types/ipc/impl/Util"
import { LogStream } from "@@/types/ipc/impl/LogStream"
import XmlParser from "@@/types/ipc/impl/XmlParser"
import Http from "@@/types/ipc/impl/Http"

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
    webPreferences: { preload: preloadScript, contextIsolation: true },
    title: "vMix Puppeteer"
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
  if (windowState.devToolsOpen) mainWindow.webContents.openDevTools()
  mainWindow.on("close", () => APP.AppWindow.saveWindowState(mainWindow))
}

app.whenReady().then(() => {
  createWindow()
  app.commandLine.appendSwitch("disable-features", "Autofill")
  app.on("activate", () => {
    const noWindowsOpen = BrowserWindow.getAllWindows().length === 0
    if (noWindowsOpen) createWindow()
  })
  // Attach CSP to application headers
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          "default-src 'self';",
          "img-src 'self' data:;",
          "script-src 'self' 'unsafe-inline';",
          "style-src-elem 'self' 'unsafe-inline';",
          "connect-src 'self';"
        ].join("")
      }
    })
  })
})

// Quit app when all windows closed unless on mac
app.on("window-all-closed", () => process.platform !== "darwin" && app.quit())
app.on("open-file", (_, path) => console.yellow("OPENING", path))

IPC.mainHandlers({
  "API:Function": (_, [func, args]) => API.Function(func, args),
  "API:GetActiveInputs": API.GetActiveInputs,
  "FileDialog:debug": (_, [data]) => FileDialog.debug(data),
  "FileDialog:getFile": (_, [path, encoding]) => FileDialog.getFile(path, encoding),
  "FileDialog:getFileContent": (_, [path]) => FileDialog.getFileContent(path),
  "FileDialog:getFilePath": FileDialog.getFilePath,
  "FileDialog:getSampleApiXmlFilePath": FileDialog.getSampleApiXmlFilePath,
  "FileDialog:getVmixPreset": (_, [zip]) => FileDialog.getVmixPreset(zip),
  "Http:Get": (_, [url, params]) => Http.Get(url, params),
  "LogStream:Clear": LogStream.Clear,
  "LogStream:Get": LogStream.Get,
  "LogStream:Push": (_, [fmt, ...args]) => LogStream.Push(fmt, ...args),
  "Util:format": (_, [fmt, ...args]) => Util.format(fmt, ...args),
  "XmlParser:ParseXml": (_, [xml]) => XmlParser.ParseXml(xml),
  Sleep: (_, [amount, unit]) => Sleep(amount, unit)
})

// ipcMain.on("test-event", (_, data) => console.log(data))
