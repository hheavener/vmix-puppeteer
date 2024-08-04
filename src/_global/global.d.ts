import type { API } from "./types/api/API"
import type { APP } from "./types/app/APP"
import type { IPC } from "./types/ipc/IPC"
import type FileDialog from "./types/ipc/impl/FileDialog"
import { TIME as ENUM_TIME } from "./types/time/TIME"

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
  var Sleep: (amount: number, unit = Time.Milliseconds) => Promise<void>
  var TIME: typeof ENUM_TIME

  interface Window {
    FileDialog: typeof FileDialog
  }

  interface Console {
    red(message?: any, ...optionalParams: any[]): void
    green(message?: any, ...optionalParams: any[]): void
    yellow(message?: any, ...optionalParams: any[]): void
    blue(message?: any, ...optionalParams: any[]): void
  }
}
