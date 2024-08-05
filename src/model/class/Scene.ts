import { type VmixFunctionCall } from "@@/types/api/VmixFunction"
import { type Input, type SceneProps, type VmixTransition } from "@@/types/api/scene"
import Time from "@@/types/ipc/impl/Time"

export default class ScenePlayer {
  // private title: string
  // private prepare: PTZInput
  // private activeInput: Input
  private scene: SceneProps
  private logStream: any[] | undefined

  public title: string
  public disabled: boolean
  public actions?: VmixFunctionCall[]

  constructor(scene: SceneProps, logStream?: any[]) {
    this.scene = scene
    this.title = scene.title
    this.disabled = !!scene.disabled
    this.actions = scene.actions
    this.logStream = logStream
  }

  // TODO: Input needs a class model
  public GetActiveInput(): Input {
    this._log("ScenePlayer::GetActiveInput")
    return this.scene.activeInput
  }

  public async OnTransitioned(): Promise<void> {
    this._log("ScenePlayer::OnTransitioned")
    await callFunctions(this.scene.onTransitioned)
  }

  public async Prepare(): Promise<void> {
    this._log("ScenePlayer::Prepare")
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
      await Sleep(3, "Seconds") // TODO: move to some kind of user settings later on?
    }
    // TODO: Get reference to next scene to determine which
    // camera should be active in the preview
  }

  public async WillTransition(): Promise<void> {
    this._log("ScenePlayer::WillTransition")
    await callFunctions(this.scene.willTransition)
  }

  public async Transition(): Promise<void> {
    this._log("ScenePlayer::Transition")
    if (this.scene.transition) {
      await callFunction(this.scene.transition)
    }
  }

  public _getRaw() {
    // this._log("ScenePlayer:_getRaw")
    return this.scene
  }

  public _getJSON(indent = 2) {
    // this._log("ScenePlayer:_getJSON")
    return JSON.stringify(this.scene, null, indent)
  }

  public _getPrintable(indent = 2) {
    // this._log("ScenePlayer:_getPrintable")

    let output = ""
    const recurse = (root: Object = this.scene, level = 0) => {
      Object.entries(root).forEach(([key, val]) => {
        output += " ".repeat(level * indent)
        if (["string", "number", "boolean"].includes(typeof val)) {
          output += `${key}: ${val}\n`
        } else {
          output += `${key}:\n`
          output += recurse(val, level + 1)
        }
      })
    }
    return output
  }

  private async _log(fmt: string, ...args: any[]): Promise<void> {
    if (this.logStream) {
      const format = await window.Util.format(fmt, ...args)
      console.log("Pushing to log stream...", format)
      this.logStream.push(format)
    } else console.log(...args)
  }
}

async function callFunction(fc: VmixFunctionCall | VmixTransition): Promise<void> {
  console.log("ScenePlayer:callFunction")
  try {
    if (typeof fc === "string") return await API.Function(fc, {})
    console.log(fc)
    await API.Function(fc.function, fc.params)
    const { amount, unit } = fc.sleep ?? {}
    if (amount) await Sleep(amount, unit)
  } catch (err) {
    console.log(err)
  }
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
