// All the Node.js APIs are available in the preload process.
import {
  type IPCChannel,
  type IPCChannelAction,
  type IPCChannelActionSignature,
  type IPCChannelValue,
  type IPCChannelActionParameters
} from "./channels"

export type IPC = {
  /**
   * // TODO: Create method like `mainHandlers` for preload.js
   */
  exposeInMainWorld<T extends IPCChannel>(channel: T, value: IPCChannelValue<T>): void
  exposeMainWorldInterface(channels: { [K in IPCChannel]: IPCChannelValue<K> }): void
  rendererInvoke<T extends IPCChannelAction>(channelAction: T): IPCChannelActionSignature<T>
  mainHandle<T extends IPCChannelAction>(
    channelAction: T,
    listener: (
      event: Electron.IpcMainInvokeEvent,
      args: IPCChannelActionParameters<T>
    ) => ReturnType<IPCChannelActionSignature<T>>
  ): void
  mainHandlers(handlers: {
    [K in IPCChannelAction]: (
      event: Electron.IpcMainInvokeEvent,
      args: IPCChannelActionParameters<K>
    ) => ReturnType<IPCChannelActionSignature<K>>
  }): void
}
