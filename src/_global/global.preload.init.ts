/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer, ipcMain } from "electron"
import type { API } from "./types/api/API"
import type { IPC } from "./types/ipc/IPC"
import type { IPCChannelAction, InferChannelActionType } from "./types/ipc/channels"

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
      // function wrappedListener(event: Electron.IpcMainInvokeEvent, ...args: any[]) {
      //   return listener(event, ...args)
      // }
      return ipcMain.handle(channelAction, listener)
    }
  }
}
