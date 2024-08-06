import type { VmixFunction, VmixFunctionName } from "./VmixFunction"
import type { VmixTransition } from "./scene"

export type API = {
  /**
   * Calls the VMIX API with a given function
   * and its parameters and returns a string
   * representation of the function call.
   *
   * @param functionName the VMIX function
   * @param params the parameters for the function
   */
  Function<Name extends VmixFunctionName | VmixTransition>(
    functionName: Name,
    params: VmixFunction["params"]
  ): Promise<string>
}
