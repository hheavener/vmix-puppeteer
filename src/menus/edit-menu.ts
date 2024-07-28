import { type MenuItemConstructorOptions } from "electron"

const isMac = process.platform === "darwin"

export default function EditMenu(): MenuItemConstructorOptions {
  const standardOptions: MenuItemConstructorOptions[] = [
    { role: "delete" },
    { type: "separator" },
    { role: "selectAll" }
  ]

  const macOptions: MenuItemConstructorOptions[] = [
    { role: "pasteAndMatchStyle" },
    { role: "delete" },
    { role: "selectAll" },
    { type: "separator" },
    {
      label: "Speech",
      submenu: [{ role: "startSpeaking" }, { role: "stopSpeaking" }]
    }
  ]

  return {
    label: "Edit", // or { role: 'editMenu' }
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      ...(isMac ? macOptions : standardOptions)
    ]
  }
}
