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

IPC.exposeMainWorldInterface({
  API,
  API_URL,
  FileDialog: {
    getFile: IPC.rendererInvoke("FileDialog:getFile"),
    getFilePath: IPC.rendererInvoke("FileDialog:getFilePath"),
    getFileContent: IPC.rendererInvoke("FileDialog:getFileContent"),
    getVmixPreset: IPC.rendererInvoke("FileDialog:getVmixPreset"),
    debug: IPC.rendererInvoke("FileDialog:debug"),
    getSampleApiXmlFilePath: IPC.rendererInvoke("FileDialog:getSampleApiXmlFilePath")
  },
  Http: { Get: IPC.rendererInvoke("Http:Get") },
  Logs,
  LogStream: {
    Clear: IPC.rendererInvoke("LogStream:Clear"),
    Get: IPC.rendererInvoke("LogStream:Get"),
    Push: IPC.rendererInvoke("LogStream:Push")
  },
  Sleep: Time.Sleep,
  Time,
  Util: { format: IPC.rendererInvoke("Util:format") },
  XmlParser: { ParseXml: IPC.rendererInvoke("XmlParser:ParseXml") }
})

// ipcRenderer.on("test-event", (e, data) => console.log(data))
