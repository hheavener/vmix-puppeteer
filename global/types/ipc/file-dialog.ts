import { BrowserWindow, dialog } from "electron"
import { readFileSync } from "fs"

const FileDialog = {
  /**
   * Opens the system file dialog and prompts the user to
   * select a file and will return the path to that file.
   *
   * @returns path to a file
   */
  getFilePath: async (): Promise<string | undefined> => {
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
        return result.filePaths[0]
      }
    } catch (err) {
      console.error("Error selecting file:", err)
    }
  },

  /**
   * Reads the file at the path provided and returns the
   * content of that file as a string. If no path is provided,
   * will open the system file dialog and prompts the user to
   * select a file.
   *
   * @param filePath (optional) the path to the file to open
   * @param encoding (optional) specify the file encoding (default utf-8)
   * @returns the content of a file as a string
   */
  getFileContent: async (
    filePath?: string,
    encoding: BufferEncoding = "utf8"
  ): Promise<string | undefined> => {
    try {
      const path = filePath || (await FileDialog.getFilePath())
      if (path) return readFileSync(path)?.toString(encoding)
    } catch (err) {
      console.error("Error opening file:", err)
    }
  },

  /**
   * Opens the system file dialog and prompts the user to
   * select a file and will return the path to that file
   * and the contents of the file.
   *
   * @param path (optional) the path to the file to open
   * @param encoding (optional) specify the file encoding (default utf-8)
   * @returns the file path and the content of the file as a string
   */
  getFile: async (path?: string, encoding: BufferEncoding = "utf8"): Promise<File | undefined> => {
    // console.log("GET FILE INVOKED", [path, encoding])
    if (!path) path = await FileDialog.getFilePath()
    if (!path) return

    const content = await FileDialog.getFileContent(path, encoding)
    if (content) return { path, content }
  }
}

type File = {
  path: string
  content: string
}

export default FileDialog
