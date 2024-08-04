// All the Node.js APIs are available in the preload process.
import "@@/global.preload.init"

// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM CONTENT LOADED")
  const replaceInnerText = (selector: string, text: string | undefined) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text ?? ""
  }

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceInnerText(`${dependency}-version`, process.versions[dependency])
  }
})

IPC.exposeInMainWorld("FileDialog", {
  getFile: IPC.rendererInvoke("FileDialog:getFile"),
  getFilePath: IPC.rendererInvoke("FileDialog:getFilePath"),
  getFileContent: IPC.rendererInvoke("FileDialog:getFileContent"),
  getVmixPresets: IPC.rendererInvoke("FileDialog:getVmixPresets")
})

// ipcRenderer.on("test-event", (e, data) => console.log(data))
