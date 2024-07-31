import type { VmixFunction } from "./functions"

export type API = {
  Function<Name extends keyof VmixFunction>(functionName: Name, params: VmixFunction[Name]): void
}
