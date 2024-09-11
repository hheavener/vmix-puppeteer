// All the Node.js APIs are available in the preload process.
import {
  type IPCChannel,
  type IPCChannelAction,
  type IPCChannelActionSignature,
  type IPCChannelValue,
  type IPCChannelActionParameters
} from "./channels"

export type IPC = {
  exposeInMainWorld<T extends IPCChannel>(channel: T, value: IPCChannelValue<T>): void
  rendererInvoke<T extends IPCChannelAction>(channelAction: T): IPCChannelActionSignature<T>
  mainHandle<T extends IPCChannelAction>(
    channelAction: T,
    listener: (
      event: Electron.IpcMainInvokeEvent,
      args: IPCChannelActionParameters<IPCChannelActionSignature<T>>
    ) => ReturnType<IPCChannelActionSignature<T>>
  ): void
  mainHandlers(handlers: {
    [K in IPCChannelAction]: (
      event: Electron.IpcMainInvokeEvent,
      args: IPCChannelActionParameters<IPCChannelActionSignature<K>>
    ) => ReturnType<IPCChannelActionSignature<K>>
  }): void
}
