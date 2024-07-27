/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BrowserWindow, dialog, type MenuItemConstructorOptions } from "electron"

const isMac = process.platform === "darwin"

// { role: 'fileMenu' }
export default function FileMenu(): MenuItemConstructorOptions {
  return {
    label: "File",
    submenu: [
      isMac ? { role: "close" } : { role: "quit" },
      {
        label: "Custom",
        submenu: [
          {
            label: "Custom Menu Item",
            click: async () => {
              const res = await dialog.showMessageBox(BrowserWindow.getFocusedWindow()!, {
                type: "info",
                title: "Information",
                message: "This is an alert message.",
                detail: "Some detail",
                buttons: ["Ok", "Screw You", "Cancel"]
              })
              dialog.showMessageBox(BrowserWindow.getFocusedWindow()!, {
                type: "info",
                title: "Information",
                message: String(res.response)
              })
            }
          }
        ]
      },
      {
        label: "Custom2",
        submenu: [
          {
            label: "Custom Menu Item"
          }
        ]
      }
    ]
  }
}
