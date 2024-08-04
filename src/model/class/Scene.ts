import { type VmixFunctionCall } from "@@/types/api/VmixFunction"
import { type Input, type Scene, type VmixTransition } from "@@/types/api/scene"

export default class ScenePlayer {
  // private title: string
  // private prepare: PTZInput
  // private activeInput: Input
  private scene: Scene

  public title: string
  public disabled: boolean
  public actions?: VmixFunctionCall[]

  constructor(scene: Scene) {
    this.scene = scene
    this.title = scene.title
    this.disabled = !!scene.disabled
    this.actions = scene.actions
  }

  // TODO: Input needs a class model
  public GetActiveInput(): Input {
    return this.scene.activeInput
  }

  public async OnTransitioned(): Promise<void> {
    await callFunctions(this.scene.onTransitioned)
  }

  public async Prepare(): Promise<void> {
    // TODO: Query the save file to determine if
    // PTZ Input source is the same as the active
    // camera. If it is, don't do it.
    const { prepare } = this.scene
    if (!prepare?.length) return
    for (let p of prepare) {
      const activeSource = this.scene.activeInput.source
      if (p.source === activeSource) {
        console.yellow(
          `WARNING: Cannot prepare input '${p.input}' which uses 
          the same PTZ optic as the active input '${activeSource}'`
        )
        continue
      }
      await API.Function("PTZMoveToVirtualInputPosition", { Input: p.input })
      await Sleep(3, Time.Seconds) // TODO: move to some kind of user settings later on?
    }
    // TODO: Get reference to next scene to determine which
    // camera should be active in the preview
  }

  public async WillTransition(): Promise<void> {
    await callFunctions(this.scene.willTransition)
  }

  public async Transition(): Promise<void> {
    await this.WillTransition()
    if (this.scene.transition) {
      await callFunction(this.scene.transition)
    }
  }
}

async function callFunction(fc: VmixFunctionCall | VmixTransition): Promise<void> {
  if (typeof fc === "string") return await API.Function(fc, {})
  await API.Function(fc.function, fc.params)
  const { amount, unit } = fc.sleep ?? {}
  if (amount) await Sleep(amount, unit)
}

async function callFunctions(
  list: VmixFunctionCall[] = [],
  delayMilliseconds: number = 1 * Time.Second
): Promise<void> {
  if (!list?.length) return
  for (let func of list) {
    await callFunction(func)
    if (delayMilliseconds) await Sleep(delayMilliseconds)
  }
}
