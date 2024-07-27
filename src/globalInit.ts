import { app } from "electron"
import path from "path"
import os from "os"

(globalThis as any).APP_DATA_DIR = path.join(os.homedir(), `.${app.name}`)
