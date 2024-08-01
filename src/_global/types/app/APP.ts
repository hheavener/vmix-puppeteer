import type { AppWindow } from "./AppWindow"
import type { RecentFiles } from "./RecentFiles"

export type APP = {
  AppWindow: typeof AppWindow
  RecentFiles: typeof RecentFiles
}
