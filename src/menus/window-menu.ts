import { type MenuItemConstructorOptions } from "electron"

const isMac = process.platform === "darwin"

export default function WindowMenu(): MenuItemConstructorOptions {
  const standardOptions: MenuItemConstructorOptions[] = [{ role: "close" }]

  const macOptions: MenuItemConstructorOptions[] = [
    { type: "separator" },
    { role: "front" },
    { type: "separator" },
    { role: "window" }
  ]
  return {
    label: "Window", // or { role: 'windowMenu' }
    submenu: [{ role: "minimize" }, { role: "zoom" }, ...(isMac ? macOptions : standardOptions)]
  }
}
