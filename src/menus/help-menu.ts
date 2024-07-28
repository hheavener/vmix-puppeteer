import electron, { type MenuItemConstructorOptions } from "electron"

export default function HelpMenu(): MenuItemConstructorOptions {
  return {
    role: "help", // or { role: 'helpMenu' }
    submenu: [
      {
        label: "Learn More",
        click: async () => await electron.shell.openExternal("https://electronjs.org")
      }
    ]
  }
}
