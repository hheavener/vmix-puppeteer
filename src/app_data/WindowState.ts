import { BrowserWindow } from "electron"
import path from "path"
import fs from "fs"

type WindowState = {
  x: number
  y: number
  width: number
  height: number
}

const stateFile = path.join(APP_DATA_DIR, "window-state.json")

export function saveWindowState(window: BrowserWindow) {
  const bounds = window.getBounds()
  const state: WindowState = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height
  }
  try {
    fs.writeFileSync(stateFile, JSON.stringify(state))
  } catch (error) {
    console.error("Error saving window state:", error)
  }
}

export function loadWindowState(): WindowState {
  try {
    if (fs.existsSync(stateFile)) {
      const data = fs.readFileSync(stateFile)
      return JSON.parse(data.toString("utf8"))
    }
  } catch (error) {
    console.error("Error loading window state:", error)
  }
  return {} as WindowState
}
