import type { VmixFunction, VmixFunctionName } from "./VmixFunction"
import type { VmixTransition } from "./scene"

export type API = {
  Function<Name extends VmixFunctionName | VmixTransition>(
    functionName: Name,
    params: VmixFunction["params"]
  ): Promise<void>
}
