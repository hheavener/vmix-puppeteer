// All the Node.js APIs are available in the preload process.

// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string | undefined) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text ?? ""
  }

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})

IPC.exposeInMainWorld("FileDialog", {
  getFileContent: () => IPC.rendererInvoke("FileDialog:getFileContent"),
  getFilePath: () => IPC.rendererInvoke("FileDialog:getFilePath")
})
