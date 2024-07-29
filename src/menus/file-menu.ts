/* eslint-disable @typescript-eslint/no-non-null-assertion */
import FileDialog from "@@/types/ipc/impl/FileDialog"
import { BrowserWindow, dialog, type MenuItemConstructorOptions } from "electron"

const isMac = process.platform === "darwin"

export default function FileMenu(): MenuItemConstructorOptions {
  return {
    id: "file",
    label: "File", // or { role: 'fileMenu' }
    submenu: [
      isMac ? { role: "close" } : { role: "quit" },
      { type: "separator" },
      {
        label: "Custom",
        submenu: [
          {
            label: "Custom Sub-Menu Item",
            click: showTestDialog
          }
        ]
      },
      {
        label: "Call API Function",
        click: () => API.Function("SetLayer", { Input: "InputName", Value: "LayerNumber" })
      },
      {
        label: "Open...",
        click: () => {
          FileDialog.getFile()
          // TODO: Load file in editor
          // TODO: Have an 'Open Recent' menu option
        }
      },
      {
        label: "Open Recent",
        role: "recentDocuments",
        submenu: [
          {
            label: "Clear Recent",
            role: "clearRecentDocuments"
          }
        ]
      }
    ]
  }
}

async function showTestDialog() {
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
