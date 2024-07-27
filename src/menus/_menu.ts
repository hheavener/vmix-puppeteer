import { Menu } from "electron"
import AppMenu from "./app-menu"
import FileMenu from "./file-menu"
import EditMenu from "./edit-menu"
import ViewMenu from "./view-menu"
import HelpMenu from "./help-menu"
import WindowMenu from "./window-menu"

export default Menu.buildFromTemplate([
  AppMenu(),
  FileMenu(),
  EditMenu(),
  ViewMenu(),
  WindowMenu(),
  HelpMenu()
])
