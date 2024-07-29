// All the Node.js APIs are available in the preload process.
import { type IPCChannel, type AllIPCChannels, type IPCChannelAction } from "@@/types/ipc/_channels"
import { contextBridge, ipcMain, ipcRenderer } from "electron"

export type IPC = {
  exposeInMainWorld<T extends IPCChannel>(channel: T, api: AllIPCChannels[T]): void
  rendererInvoke(channelAction: IPCChannelAction, ...args: any[]): Promise<any>
  mainHandle(
    channelAction: IPCChannelAction,
    listener: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any
  ): void
}

export function initIPC(): IPC {
  return {
    exposeInMainWorld: (channel, api) => contextBridge.exposeInMainWorld(channel, api),
    rendererInvoke: (channelAction: IPCChannelAction, ...args: any[]) =>
      ipcRenderer.invoke(channelAction, args),
    mainHandle: (channelAction, listener) => ipcMain.handle(channelAction, listener)
  }
}

// export function exposeInMainWorld<T extends IPCChannel>(channel: T, api: AllIPCChannels[T]): void {
//   contextBridge.exposeInMainWorld(channel, api)
// }
// export function ipcRendererInvoke(channelAction: IPCChannelAction, ...args: any[]): Promise<any> {
//   return ipcRenderer.invoke(channelAction, args)
// }

// exposeInMainWorld("FileDialog", {
//   getFileContent: () => ipcRendererInvoke("FileDialog:getFileContent"),
//   getFilePath: () => ipcRendererInvoke("FileDialog:getFilePath")
// })
