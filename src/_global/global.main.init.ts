/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppWindow } from "./types/app/AppWindow"
import { RecentFiles } from "./types/app/RecentFiles"

if (!globalThis.APP) initAPP()
export function initAPP(): void {
  if (globalThis.APP) return
  globalThis.APP = {
    AppWindow: AppWindow,
    RecentFiles: RecentFiles
  }
}

// Define color codes
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m"
}

// Extend console with custom methods
globalThis.console.red = function (...params: any[]) {
  console.log(colors.red, ...params, colors.reset)
}

globalThis.console.green = function (...params: any[]) {
  console.log(colors.green, ...params, colors.reset)
}

globalThis.console.yellow = function (...params: any[]) {
  console.log(colors.yellow, ...params, colors.reset)
}

globalThis.console.blue = function (...params: any[]) {
  console.log(colors.blue, ...params, colors.reset)
}
