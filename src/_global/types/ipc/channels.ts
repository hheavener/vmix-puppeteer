import type { API } from "../api/API"
import FileDialog from "./impl/FileDialog"
import Http from "./impl/Http"
import XmlParser from "./impl/XmlParser"
import Time from "./impl/Time"
import type { LogStream } from "./impl/LogStream"
import type { Util } from "./impl/Util"

/*
 * =====================================
 *      List available IPC Channels
 * =====================================
 */
export type AllIPCChannels = {
  API: typeof API
  API_URL: ReadOnly<string>
  Http: typeof Http
  Util: typeof Util
  Time: ReadOnly<Omit<typeof Time, "Sleep">>
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
/**
 * Indicates that the value for a given channel
 * is strictly for consuming and is not able to
 * be invoked as a function.
 */
type ReadOnly<T> = T & { __readonly__: never }
type FunctionType = (...params: any[]) => unknown
type AsyncFunctionType = (...params: any[]) => Promise<unknown>
type ChannelMember = string | boolean | number | any[] | FunctionType | AsyncFunctionType
type Channel = Record<string, ChannelMember>

/**
 * Determines if a type is an object with keys.
 *
 * TS treats many types as objects, so this checks
 * to see if it's a hashmap-type object.
 */
type IsObjectWithKeys<T> = T extends Function
  ? false
  : T extends object
    ? keyof T extends never
      ? false
      : true
    : false

/**
 * Infers the available list of actions from all channels.
 */
type ActionableChannelMember<T extends Record<string, Channel | ChannelMember>> = {
  [K in keyof T]: T[K] extends ReadOnly<T[K]>
    ? never
    : IsObjectWithKeys<T[K]> extends true
      ? `${K & string}:${keyof T[K] & string}`
      : `${K & string}`
}[keyof T]

/**
 * The type of a specific channel action.
 */
export type IPCChannelActionSignature<T extends IPCChannelAction> =
  T extends `${infer Channel extends IPCChannel}:${infer Action}`
    ? Action extends keyof AllIPCChannels[Channel]
      ? AllIPCChannels[Channel][Action]
      : never
    : T extends `${infer Action extends IPCChannel}`
      ? AllIPCChannels[Action]
      : never

/**
 * Name of an available IPC Channel.
 */
export type IPCChannel = keyof AllIPCChannels
/**
 * Value of an available IPC Channel.
 */
export type IPCChannelValue<T extends IPCChannel> =
  AllIPCChannels[T] extends ReadOnly<infer U> ? U : AllIPCChannels[T]
/**
 * Name of an available IPC Channel action.
 */
export type IPCChannelAction = ActionableChannelMember<AllIPCChannels>
/**
 * Returns the parameters of an IPC Channel action as an array.
 */
export type IPCChannelActionParameters<T extends IPCChannelAction> =
  IPCChannelActionSignature<T> extends (...args: infer Params) => any ? Params : never
