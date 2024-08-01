// All the Node.js APIs are available in the preload process.
import {
  type IPCChannel,
  type AllIPCChannels,
  type IPCChannelAction,
  type InferChannelActionType
} from "./channels"

export type IPC = {
  exposeInMainWorld<T extends IPCChannel>(channel: T, api: AllIPCChannels[T]): void
  rendererInvoke<T extends IPCChannelAction>(channelAction: T): InferChannelActionType<T>
  mainHandle(
    channelAction: IPCChannelAction,
    listener: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any
  ): void
}
