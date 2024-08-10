import { BrowserWindow, app, dialog } from "electron"
import { appendFileSync, readFileSync } from "fs"
import AdmZip from "adm-zip"
import VmixPreset from "@/model/class/VmixPreset"
import { Util } from "./Util"
import path from "path"

const debugFile = path.join(APP_DATA_DIR, "debug.log")

const FileDialog = {
  /**
   * Opens the system file dialog and prompts the user to
   * select a file and will return the path to that file.
   *
   * @returns path to a file
   */
  async getFilePath(): Promise<string | undefined> {
    const window = BrowserWindow.getFocusedWindow()
    if (!window) return

    try {
      const result = await dialog.showOpenDialog(window, {
        properties: ["openFile"], // or ['openDirectory'] to allow selecting directories
        title: "Select a file",
        filters: [
          { name: "vMix Archive", extensions: ["vmixZip"] },
          { name: "Puppeteer Files", extensions: ["json", "puppeteer.json"] },
          { name: "JSON Files", extensions: ["json"] }
          // { name: "XML Files", extensions: ["xml"] },
          // { name: "All Files", extensions: ["*"] }
        ]
      })
      if (!result.canceled && result.filePaths.length > 0) {
        const path = result.filePaths[0]
        app.addRecentDocument(path)
        return path
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
  async getFileContent(
    filePath?: string,
    encoding: BufferEncoding = "utf8"
  ): Promise<string | undefined> {
    const path = filePath || (await FileDialog.getFilePath())
    if (!path) return

    const buffer = await getFileBuffer(path)
    const content = buffer?.toString(encoding)
    debug(await Util.format("FileDialog::getFileBuffer: BufferExists -", !!content))
    return content
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
  async getFile(path?: string, encoding: BufferEncoding = "utf8"): Promise<File | undefined> {
    path = path || (await FileDialog.getFilePath())
    if (!path) return

    const content = await FileDialog.getFileContent(path, encoding)
    if (content) return { path, content }
  },

  /**
   * Gets the vMix preset data at the file path provided
   * or prompts the user to select a vMix ZIP archive if
   * a file path is not provided.
   *
   * Returns the preset data (saved as XML) as a JSON object.
   * Attributes for XML nodes are parsed as properties that
   * being with `@_`.
   *
   * @param vmixZip vMix ZIP archive
   * @returns presets XML as a string
   */
  async getVmixPreset(filePath?: string): Promise<any> {
    const path = filePath || (await FileDialog.getFilePath())
    if (!path) return
    const buffer = await getFileBuffer(path)
    if (!buffer) return

    const zip = new AdmZip(buffer)
    return new VmixPreset(zip).getXmlData()
  },
  debug,
  getSampleApiXmlFilePath
}

export default FileDialog

type File = {
  path: string
  content: string
}

async function getFileBuffer(filePath?: string): Promise<Buffer | undefined> {
  try {
    const path = filePath || (await FileDialog.getFilePath())

    debug(await Util.format("FileDialog::getFileBuffer: path:", path))
    if (!path) return debug("No file path") as undefined
    const buffer = readFileSync(path)
    debug(
      await Util.format("FileDialog::getFileBuffer: bufferHasContent:", !!buffer.toString("utf8"))
    )
    return buffer
  } catch (err) {
    debug(await Util.format("Error opening file:", err))
    console.error("Error opening file:", err)
  }
}

function debug(data: string | Uint8Array) {
  console.log(data)
  appendFileSync(debugFile, `${data}\n`)
}

function getSampleApiXmlFilePath(): string {
  const fileName = "sample.vmix.xml"
  debug(`FileDialog::app.isPackaged=${app.isPackaged}`)
  return app.isPackaged
    ? path.join(process.resourcesPath, fileName)
    : path.join("src/resources", fileName)
}
