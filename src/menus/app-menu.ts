import electron, { type MenuItemConstructorOptions } from "electron"

const { app } = electron
const isMac = process.platform === "darwin"

// { role: 'appMenu' }
export default function AppMenu(): MenuItemConstructorOptions {
  if (!isMac) return { label: "" }
  return {
    label: app.name,
    submenu: [
      { role: "about" },
      { type: "separator" },
      { role: "services" },
      { type: "separator" },
      { role: "hide" },
      { role: "hideOthers" },
      { role: "unhide" },
      { type: "separator" },
      { role: "quit" }
    ]
  }
}
