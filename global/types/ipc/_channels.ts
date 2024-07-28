import FileDialog from "./file-dialog"

type FunctionType = () => unknown
type AsyncFunctionType = () => Promise<unknown>
type Channel = Record<string, ChannelMember>
type ChannelMember = string | boolean | number | FunctionType | AsyncFunctionType
type ChannelProperties<T extends Record<string, Channel>> = {
  [K in keyof T]: `${string & K}:${keyof T[K] & string}`
}[keyof T]

export type IPCChannel = keyof AllIPCChannels
export type IPCChannelAction = ChannelProperties<AllIPCChannels>
export type AllIPCChannels = {
  FileDialog: typeof FileDialog
}
