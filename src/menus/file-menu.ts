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

function openFileExplorer() {
  // Get the current window or create a new one if needed
  const window = BrowserWindow.getFocusedWindow()

  if (window) {
    dialog
      .showOpenDialog(window, {
        properties: ["openFile"], // or ['openDirectory'] to allow selecting directories
        title: "Select a file",
        filters: [
          { name: "Text Files", extensions: ["txt"] },
          { name: "Images", extensions: ["jpg", "png"] },
          { name: "All Files", extensions: ["*"] }
        ]
      })
      .then((result) => {
        if (!result.canceled && result.filePaths.length > 0) {
          console.log("Selected file:", result.filePaths[0])
          // You can handle the selected file here
        }
      })
      .catch((err) => {
        console.error("Error selecting file:", err)
      })
  } else {
    console.error("No focused window to show dialog in.")
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
