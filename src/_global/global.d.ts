import type { API } from "./types/api/API"
import type { APP } from "./types/app/APP"
import type { IPC } from "./types/ipc/IPC"
import type FileDialog from "./types/ipc/impl/FileDialog"
import { Time as TimeImpl } from "./types/ipc/impl/Time"

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
  var API: API
  var IPC: IPC
  var APP: APP
  var console: NodeJS.Console
  var Time: typeof TimeImpl
  var Sleep: typeof Time.Sleep

  interface Window {
    FileDialog: typeof FileDialog
    Time: typeof TimeImpl
  }

  interface Console {
    red(message?: any, ...optionalParams: any[]): void
    green(message?: any, ...optionalParams: any[]): void
    yellow(message?: any, ...optionalParams: any[]): void
    blue(message?: any, ...optionalParams: any[]): void
  }
}
