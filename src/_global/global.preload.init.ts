/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer, ipcMain } from "electron"
import type { API } from "./types/api/API"
import type { IPC } from "./types/ipc/IPC"
import type { IPCChannelAction, InferChannelActionType } from "./types/ipc/channels"
import { Time } from "./types/ipc/impl/Time"

if (!globalThis.Logs) globalThis.Logs = []
if (!globalThis.IPC) globalThis.IPC = initIPC()
if (!globalThis.API) globalThis.API = initAPI()
if (!globalThis.Time) globalThis.Time = Time
if (!globalThis.Sleep) globalThis.Sleep = Time.Sleep

function initAPI(): API {
  return {
    Function: async (functionName, params) => {
      IPC.rendererInvoke("LogStream:Push")("API.Function:", functionName, params)
      console.log("API.Function:", functionName, params)
    }
  }
}

function initIPC(): IPC {
  return {
    exposeInMainWorld: (channel, api) => {
      console.log("EXPOSE MAIN:", channel)
      contextBridge.exposeInMainWorld(channel, api)
    },
    rendererInvoke: <T extends IPCChannelAction>(channelAction: T) => {
      return ((...args: any[]) => {
        console.log("RENDER INVOKE:", channelAction, args)
        return ipcRenderer.invoke(channelAction, args)
      }) as InferChannelActionType<T>
    },
    mainHandle: (channelAction, listener) => {
      console.log("MAIN HANDLE:", channelAction)
      return ipcMain.handle(channelAction, listener)
    }
  }
}
