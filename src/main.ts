import { app, BrowserWindow, Menu } from "electron"
import path from "path"
import menu from "./menus/_menu"

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
    // Create window if none open
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit app when all windows closed unless on mac
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})

// const createWindow2 = () => {
//     const mainWindow = new BrowserWindow({
//         width: 800,
//         height: 600,
//         webPreferences: {
//             preload: path.join(__dirname, "preload.ts"),
//         },
//     });

//     const app = createApp(App);
//     app.use(createPinia());
//     app.use(router);
//     app.mount("#app");

//     // and load the index.html of the app.
//     mainWindow.loadFile("index.html");

//     // Open the DevTools.
//     // mainWindow.webContents.openDevTools()
// };
