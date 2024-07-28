/* eslint-disable @typescript-eslint/no-explicit-any */
import { app, contextBridge, ipcMain, ipcRenderer } from "electron"
import path from "path"
import os from "os"
import fs from "fs"
import { type API } from "./types/api/API"
import type { IPC } from "./types/ipc/IPC"
import type { IPCChannelAction } from "./types/ipc/_channels"

globalThis.APP_DATA_DIR = path.join(os.homedir(), `.${app.name}`)
if (!fs.existsSync(APP_DATA_DIR)) fs.mkdirSync(APP_DATA_DIR)

globalThis.API = {
  Function: (functionName, params) => {
    console.log(`Function: ${functionName}`, params)
  }
} as API

globalThis.IPC = {
  exposeInMainWorld: (channel, api) => contextBridge.exposeInMainWorld(channel, api),
  rendererInvoke: (channelAction: IPCChannelAction, ...args: any[]) =>
    ipcRenderer.invoke(channelAction, args),
  mainHandle: (channelAction, listener) => ipcMain.handle(channelAction, listener)
} as IPC
