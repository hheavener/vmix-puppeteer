import { BrowserWindow } from "electron"
import path from "path"
import fs from "fs"

const stateFile = path.join(APP_DATA_DIR, "window-state.json")

export type AppWindowState = {
  x: number
  y: number
  width: number
  height: number
  devToolsOpen: boolean
}

export const AppWindow = {
  saveWindowState(window: BrowserWindow) {
    const bounds = window.getBounds()
    const { webContents } = window
    const state: AppWindowState = {
      x: bounds.x,
      y: bounds.y,
      width: bounds.width,
      height: bounds.height,
      devToolsOpen: webContents.isDevToolsOpened()
    }
    try {
      fs.writeFileSync(stateFile, JSON.stringify(state))
    } catch (error) {
      console.error("Error saving window state:", error)
    }
  },

  loadWindowState(): AppWindowState {
    try {
      if (fs.existsSync(stateFile)) {
        const data = fs.readFileSync(stateFile)
        return JSON.parse(data.toString("utf8"))
      }
    } catch (error) {
      console.error("Error loading window state:", error)
    }
    return {} as AppWindowState
  }
}
