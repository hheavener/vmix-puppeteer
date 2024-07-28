import type { API } from "./types/api/api"

/* eslint-disable no-var */
export {}
/// <reference types="vite/client" />

// Allows TypeScript to recognize Vue file extensions
declare module "*.vue"

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
}
