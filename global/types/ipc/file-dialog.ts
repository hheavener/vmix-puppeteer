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
          { name: "Puppeteer Files", extensions: ["json", "puppeteer.json"] },
          { name: "JSON Files", extensions: ["json"] }
          // { name: "XML Files", extensions: ["xml"] },
          // { name: "All Files", extensions: ["*"] }
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

  getFileContent: async (filePath?: string): Promise<Buffer | undefined> => {
    try {
      const path = filePath || (await FileDialog.getFilePath())
      if (path) return readFileSync(path)
    } catch (err) {
      console.error("Error opening file:", err)
    }
  },

  getFile: async (): Promise<File | undefined> => {
    const path = await FileDialog.getFilePath()
    if (!path) return

    const content = await FileDialog.getFileContent(path)
    if (content) return { path, content: content.toString("utf8") }
  }
}

type File = {
  path: string
  content: string
}

export default FileDialog
