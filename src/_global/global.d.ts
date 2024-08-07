import { API as APIImpl } from "./types/api/API"
import type { APP } from "./types/app/APP"
import type { IPC } from "./types/ipc/IPC"
import type FileDialog from "./types/ipc/impl/FileDialog"
import { Time as TimeImpl } from "./types/ipc/impl/Time"
import type { Util } from "./types/ipc/impl/Util"
import type { LogStream as LogStreamImpl } from "./types/ipc/impl/LogStream"

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
  var APP_DATA_DIR: string
  var API: typeof APIImpl
  var IPC: IPC
  var APP: APP
  var console: NodeJS.Console
  var Time: typeof TimeImpl
  var Sleep: typeof Time.Sleep
  var LogStream: typeof LogStreamImpl
  var Logs: string[]

  interface Window {
    FileDialog: typeof FileDialog
    LogStream: typeof LogStreamImpl
    Logs: string[]
    Time: typeof TimeImpl
    Util: typeof Util
  }

  interface Console {
    red(message?: any, ...optionalParams: any[]): void
    green(message?: any, ...optionalParams: any[]): void
    yellow(message?: any, ...optionalParams: any[]): void
    blue(message?: any, ...optionalParams: any[]): void
  }
}
