import { type MenuItemConstructorOptions } from "electron"

export default function ViewMenu(): MenuItemConstructorOptions {
  return {
    label: "View", // or { role: 'viewMenu' }
    submenu: [
      { role: "reload" },
      { role: "forceReload" },
      { role: "toggleDevTools" },
      { type: "separator" },
      { role: "resetZoom" },
      { role: "zoomIn" },
      { role: "zoomOut" },
      { type: "separator" },
      { role: "togglefullscreen" }
    ]
  }
}
