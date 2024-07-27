import electron, { type MenuItemConstructorOptions } from "electron"

// { role: 'helpMenu' }
export default function HelpMenu(): MenuItemConstructorOptions {
  return {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click: async () => await electron.shell.openExternal("https://electronjs.org")
      }
    ]
  }
}
