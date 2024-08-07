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

IPC.exposeInMainWorld("IPC", IPC)
IPC.exposeInMainWorld("API", API)
IPC.exposeInMainWorld("Time", Time)
IPC.exposeInMainWorld("Sleep", Time.Sleep)
IPC.exposeInMainWorld("Logs", Logs)
IPC.exposeInMainWorld("FileDialog", {
  getFile: IPC.rendererInvoke("FileDialog:getFile"),
  getFilePath: IPC.rendererInvoke("FileDialog:getFilePath"),
  getFileContent: IPC.rendererInvoke("FileDialog:getFileContent"),
  getVmixPreset: IPC.rendererInvoke("FileDialog:getVmixPreset")
})
IPC.exposeInMainWorld("XmlParser", { ParseXml: IPC.rendererInvoke("XmlParser:ParseXml") })
IPC.exposeInMainWorld("Util", { format: IPC.rendererInvoke("Util:format") })
IPC.exposeInMainWorld("LogStream", {
  Push: IPC.rendererInvoke("LogStream:Push"),
  Get: IPC.rendererInvoke("LogStream:Get"),
  Clear: IPC.rendererInvoke("LogStream:Clear")
})

// ipcRenderer.on("test-event", (e, data) => console.log(data))
