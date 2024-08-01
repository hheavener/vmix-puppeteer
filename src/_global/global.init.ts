/* eslint-disable @typescript-eslint/no-explicit-any */
import { app } from "electron"
import path from "path"
import os from "os"
import fs from "fs"

globalThis.APP_DATA_DIR = path.join(os.homedir(), `.${app.name}`)
if (!fs.existsSync(APP_DATA_DIR)) fs.mkdirSync(APP_DATA_DIR)
