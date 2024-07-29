/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer, ipcMain } from "electron"
import type { API } from "./types/api/API"
import type { IPC } from "./types/ipc/IPC"
import type { IPCChannelAction, InferChannelActionType } from "./types/ipc/_channels"

if (!globalThis.API) globalThis.API = initAPI()
if (!globalThis.IPC) globalThis.IPC = initIPC()

function initAPI(): API {
  return {
    Function: (functionName, params) => {
      console.log(`Function: ${functionName}`, params)
    }
  }
}

function initIPC(): IPC {
  return {
    exposeInMainWorld: (channel, api) => contextBridge.exposeInMainWorld(channel, api),
    rendererInvoke: <T extends IPCChannelAction>(channelAction: T) => {
      return ((...args: any[]) => {
        console.log("RECEIVED:", channelAction, args)
        return ipcRenderer.invoke(channelAction, args)
      }) as InferChannelActionType<T>
    },
    mainHandle: (channelAction, listener) => ipcMain.handle(channelAction, listener)
  }
}
