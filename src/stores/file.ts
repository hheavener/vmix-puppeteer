import { ref } from "vue"
import { defineStore } from "pinia"

export const useFileStore = defineStore("file", () => {
  let filePath = ref("")
  let fileContent = ref("")

  async function getFile() {
    const { FileDialog } = window
    try {
      filePath.value = (await FileDialog.getFilePath()) ?? ""
      if (filePath.value) {
        fileContent.value = (await FileDialog.getFileContent(filePath.value, "utf8")) ?? ""
      }
    } catch (err) {
      alert(`Failed to open file:\n\n${err}`)
      console.error("Failed to open file:", err)
    }
  }

  return { filePath, fileContent, getFile }
})
