import type { API } from "../api/API"
import type { IPC } from "./IPC"
import FileDialog from "./impl/FileDialog"
import Http from "./impl/Http"
import XmlParser from "./impl/XmlParser"
import Time from "./impl/Time"
import type { LogStream } from "./impl/LogStream"
import type { Util } from "./impl/Util"

type FunctionType = (...params: any[]) => unknown
type AsyncFunctionType = (...params: any[]) => Promise<unknown>
type ChannelMember = string | boolean | number | any[] | FunctionType | AsyncFunctionType

type Channel = Record<string, ChannelMember>
/**
 * Infers the available list of actions from all channels.
 */
type ChannelProperties<T extends Record<string, Channel | ChannelMember>> = {
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
  IPC: IPC
  API: typeof API
  API_URL: string
  Http: typeof Http
  Util: typeof Util
  Time: typeof Time
  Sleep: typeof Time.Sleep
  FileDialog: typeof FileDialog
  XmlParser: typeof XmlParser
  LogStream: typeof LogStream
  Logs: any[]
}
