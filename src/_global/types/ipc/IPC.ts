// All the Node.js APIs are available in the preload process.
import {
  type IPCChannel,
  type IPCChannelAction,
  type ActionableSignature,
  type IPCChannelValue
} from "./channels"

export type IPC = {
  exposeInMainWorld<T extends IPCChannel>(channel: T, value: IPCChannelValue<T>): void
  rendererInvoke<T extends IPCChannelAction>(channelAction: T): ActionableSignature<T>
  mainHandle(
    channelAction: IPCChannelAction,
    listener: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any
  ): void
}
