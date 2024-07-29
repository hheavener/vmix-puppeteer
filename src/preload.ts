// All the Node.js APIs are available in the preload process.
// import "@@/global.d.ts"
import "@@/global.setup"
// import FileDialog from "@@/types/ipc/file-dialog"

// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  // console.log("DOM CONTENT LOADED")
  const replaceInnerText = (selector: string, text: string | undefined) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text ?? ""
  }

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceInnerText(`${dependency}-version`, process.versions[dependency])
  }
})

IPC.exposeInMainWorld("FileDialog", {
  getFileContent: IPC.rendererInvoke("FileDialog:getFileContent"),
  getFilePath: IPC.rendererInvoke("FileDialog:getFilePath"),
  getFile: IPC.rendererInvoke("FileDialog:getFile")
})
