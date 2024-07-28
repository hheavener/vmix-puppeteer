/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BrowserWindow, dialog, type MenuItemConstructorOptions } from "electron"

const isMac = process.platform === "darwin"

export default function FileMenu(): MenuItemConstructorOptions {
  return {
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
        click: openFileExplorer // Need to open file explorer here...
      }
    ]
  }
}

export async function openFileExplorer(): Promise<string | undefined> {
  // Get the current window or create a new one if needed
  const window = BrowserWindow.getFocusedWindow()

  if (!window) return
  try {
    const result = await dialog.showOpenDialog(window, {
      properties: ["openFile"], // or ['openDirectory'] to allow selecting directories
      title: "Select a file",
      filters: [
        { name: "Puppeteer Files", extensions: ["json", "puppetter.json"] },
        { name: "JSON Files", extensions: ["json"] },
        { name: "XML Files", extensions: ["xml"] },
        { name: "All Files", extensions: ["*"] }
      ]
    })
    if (!result.canceled && result.filePaths.length > 0) {
      console.log("Selected file:", result.filePaths[0])
      // You can handle the selected file here
      return result.filePaths[0]
    }
  } catch (err) {
    console.error("Error selecting file:", err)
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
