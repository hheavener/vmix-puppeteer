import path from "path"
import fs from "fs"

const stateFile = path.join(APP_DATA_DIR, "recent-files.json")

export const RecentFiles = {
  save(path: string) {
    const recents = RecentFiles.load()
    const uniques = new Set(recents).add(path)
    if (uniques.size === recents.length) return

    try {
      recents.unshift(path)
      fs.writeFileSync(stateFile, JSON.stringify(recents.slice(0, 10)))
    } catch (error) {
      console.error("Error saving recent file:", error)
    }
  },

  load(): string[] {
    try {
      if (fs.existsSync(stateFile)) {
        const data = fs.readFileSync(stateFile)
        return JSON.parse(data.toString("utf8"))
      }
    } catch (error) {
      console.error("Error loading recent files:", error)
    }
    return []
  },

  clear(): void {
    try {
      fs.writeFileSync(stateFile, JSON.stringify([]))
    } catch (error) {
      console.error("Error clearing recent files:", error)
    }
  }

  // updateOpenRecentMenu(menu: Electron.Menu) {
  //   const recentFiles = RecentFiles.load()
  //   const openRecentMenu = menu.getMenuItemById("file:open-recent")?.submenu

  //   if (openRecentMenu) {
  //     const submenu = recentFiles.map((file) => {
  //       return new MenuItem({
  //         label: path.basename(file),
  //         click: () => {
  //           // Handle opening the file here
  //           console.log("Opening file:", file)
  //           FileDialog.getFile(file)
  //           // e.g., your openFileFunction(file);
  //         }
  //       })
  //     })

  //     submenu.push(new MenuItem({ type: "separator" }))
  //     submenu.push(
  //       new MenuItem({
  //         label: "Clear Recent Files",
  //         click: () => {
  //           // Clear recent files functionality
  //           fs.writeFileSync(stateFile, JSON.stringify([]))
  //           RecentFiles.updateOpenRecentMenu(menu) // Refresh menu
  //         }
  //       })
  //     )

  //     openRecentMenu.submenu = Menu.buildFromTemplate(submenu)
  //   }
  // }
}
