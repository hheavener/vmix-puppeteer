import FileDialog from "./impl/FileDialog"

type FunctionType = () => unknown
type AsyncFunctionType = () => Promise<unknown>
type ChannelMember = string | boolean | number | FunctionType | AsyncFunctionType

type Channel = Record<string, ChannelMember>
/**
 * Infers the available list of actions from all channels.
 */
type ChannelProperties<T extends Record<string, Channel>> = {
  [K in keyof T]: `${string & K}:${keyof T[K] & string}`
}[keyof T]
/**
 * Infers the type of a specific channel action.
 */
export type InferChannelActionType<T extends IPCChannelAction> =
  T extends `${infer Channel extends IPCChannel}:${infer Action}`
    ? Action extends keyof AllIPCChannels[Channel]
      ? AllIPCChannels[Channel][Action]
      : never
    : never

export type IPCChannel = keyof AllIPCChannels
export type IPCChannelAction = ChannelProperties<AllIPCChannels>
export type AllIPCChannels = {
  FileDialog: typeof FileDialog
}
