import type { Functions } from "./functions"

export type API = {
  Function<Name extends keyof Functions>(functionName: Name, params: Functions[Name]): void
}

export function initAPI(): API {
  return {
    Function: (functionName, params) => {
      console.log(`Function: ${functionName}`, params)
    }
  }
}
