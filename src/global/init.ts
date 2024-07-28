import { app } from "electron"
import path from "path"
import os from "os"
import fs from "fs"
import { type API } from "./types/api/api"

globalThis.APP_DATA_DIR = path.join(os.homedir(), `.${app.name}`)
if (!fs.existsSync(APP_DATA_DIR)) fs.mkdirSync(APP_DATA_DIR)

globalThis.API = {
  Function: (functionName, params) => {
    console.log(`Function: ${functionName}`, params)
  }
} as API
