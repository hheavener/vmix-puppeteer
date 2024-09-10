import type { API } from "../api/API"
import type { IPC } from "./IPC"
import FileDialog from "./impl/FileDialog"
import Http from "./impl/Http"
import XmlParser from "./impl/XmlParser"
import Time from "./impl/Time"
import type { LogStream } from "./impl/LogStream"
import type { Util } from "./impl/Util"

/**
 * Indicates that the value for a given channel
 * is strictly for consuming and is not able to
 * be invoked as a function.
 */
type ReadOnly<T> = T & { __readonly__: never }

/*
 * =====================================
 *      List available IPC Channels
 * =====================================
 */
type AllIPCChannels = {
  IPC: ReadOnly<IPC>
  API: typeof API
  API_URL: ReadOnly<string>
  Http: typeof Http
  Util: typeof Util
  Time: typeof Time
  Sleep: typeof Time.Sleep
  FileDialog: typeof FileDialog
  XmlParser: typeof XmlParser
  LogStream: typeof LogStream
  Logs: ReadOnly<any[]>
}

/*
 * ====================================================
 *      Magic Allowing Type-Safe IPC Communication
 * ====================================================
 */
type FunctionType = (...params: any[]) => unknown
type AsyncFunctionType = (...params: any[]) => Promise<unknown>
type ChannelMember = string | boolean | number | any[] | FunctionType | AsyncFunctionType
type Channel = Record<string, ChannelMember>

/**
 * Infers the available list of actions from all channels.
 */
type ActionableChannelMember<T extends Record<string, Channel | ChannelMember>> = {
  [K in keyof T]: T[K] extends ReadOnly<T[K]> ? never : `${K & string}:${keyof T[K] & string}`
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
/**
 * Name of an available IPC Channel.
 */
export type IPCChannel = keyof AllIPCChannels
/**
 * Name of an available IPC Channel value.
 */
export type IPCChannelValue<T extends keyof AllIPCChannels> =
  AllIPCChannels[T] extends ReadOnly<infer U> ? U : AllIPCChannels[T]
/**
 * Name of an available IPC Channel action.
 */
export type IPCChannelAction = ActionableChannelMember<AllIPCChannels>
