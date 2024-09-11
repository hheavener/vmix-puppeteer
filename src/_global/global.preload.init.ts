/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcMain, ipcRenderer } from "electron"
import { API } from "./types/api/API"
import type { IPC } from "./types/ipc/IPC"
import type {
  IPCChannelAction,
  IPCChannelActionParameters,
  IPCChannelActionSignature
} from "./types/ipc/channels"
import { Time } from "./types/ipc/impl/Time"

if (!globalThis.IPC) globalThis.IPC = initIPC()
if (!globalThis.Logs) globalThis.Logs = []
if (!globalThis.API) globalThis.API = API
if (!globalThis.Time) globalThis.Time = Time
if (!globalThis.Sleep) globalThis.Sleep = Time.Sleep
// TODO: Move this to UI input/setting/config
// if (!globalThis.API_URL) globalThis.API_URL = "http://127.0.0.1:8088/API"
if (!globalThis.API_URL) globalThis.API_URL = "http://192.168.1.232:8088/API"

function initIPC(): IPC {
  return {
    exposeInMainWorld: (channel, api) => {
      console.log("EXPOSE MAIN:", channel)
      contextBridge.exposeInMainWorld(channel, api)
    },
    rendererInvoke: <T extends IPCChannelAction>(channelAction: T) => {
      return ((...args: IPCChannelActionParameters<IPCChannelActionSignature<T>>) => {
        // console.log("RENDER INVOKE:", channelAction, args)
        return ipcRenderer.invoke(channelAction, args)
      }) as IPCChannelActionSignature<T>
    },
    mainHandle: (listeners) => {
      for (const action of Object.keys(listeners) as IPCChannelAction[]) {
        // console.log("MAIN HANDLE:", action)
        const listener = listeners[action] as (
          event: Electron.IpcMainInvokeEvent,
          ...args: any[]
        ) => any
        ipcMain.handle(action, listener)
      }
    }
  }
}
