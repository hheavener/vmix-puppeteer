import { API as APIImpl } from "./types/api/API"
import type { APP } from "./types/app/APP"
import type { IPC } from "./types/ipc/IPC"
import type { AllIPCChannels } from "./types/ipc/channels"
// import type FileDialog from "./types/ipc/impl/FileDialog"
import { Time as TimeImpl } from "./types/ipc/impl/Time"
// import type { Util } from "./types/ipc/impl/Util"
// import type { LogStream as LogStreamImpl } from "./types/ipc/impl/LogStream"

/* eslint-disable no-var */
export {}
/// <reference types="vite/client" />

/**
 * Global values that are resolved by typescript at
 * compile-time and can be used without needing to
 * specify an import. These values can be initialized
 * in {@link globalInit} as part of the `globalThis`
 * object.
 */
declare global {
  /**
   * Directory for storing app data.
   */
  var API_URL: string // TODO: Global?? Should this be program-specific?
  var APP_DATA_DIR: string
  var console: NodeJS.Console
  var APP: APP
  var IPC: IPC
  var API: typeof APIImpl
  var Time: typeof TimeImpl
  var Sleep: typeof Time.Sleep
  var Logs: string[]

  interface Window extends AllIPCChannels {}

  interface Console {
    red(message?: any, ...optionalParams: any[]): void
    green(message?: any, ...optionalParams: any[]): void
    yellow(message?: any, ...optionalParams: any[]): void
    blue(message?: any, ...optionalParams: any[]): void
  }
}
