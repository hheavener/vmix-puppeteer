import type { TimeUnit } from "../ipc/impl/Time"
import FunctionReference from "./VmixFunctionReference"

export type VmixFunctionName = (typeof FunctionReference)[number]["name"]
// TODO: Make all of these able to be loaded async
export type VmixFunctionParams = {
  Input?: string
  Value?: string | number
  Duration?: number
  Channel?: number
  SelectedName?: string
  SelectedIndex?: string
  Mix?: string
}
export type VmixFunction = {
  name: VmixFunctionName
  description: string
  params: VmixFunctionParams
}
export type VmixFunctionCall = {
  function: VmixFunctionName
  params: VmixFunctionParams
  /**
   * Amount of time to sleep after calling the function.
   */
  sleep?: {
    amount: number
    unit: TimeUnit
  }
}
