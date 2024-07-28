import { BrowserWindow, dialog } from "electron"
import { readFileSync } from "fs"

const FileDialog = {
  getFilePath: async (): Promise<string | undefined> => {
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
  },
  getFileContent: async (): Promise<Buffer | undefined> => {
    try {
      const fileName = await FileDialog.getFilePath()
      if (fileName) return readFileSync(fileName)
    } catch (err) {
      console.error("Error opening file:", err)
    }
  }
}

export default FileDialog
