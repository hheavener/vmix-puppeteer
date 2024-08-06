import { type VmixFunctionCall } from "@@/types/api/VmixFunction"
import { type Input, type SceneProps, type VmixTransition } from "@@/types/api/scene"
import Time from "@@/types/ipc/impl/Time"

export default class ScenePlayer {
  // private title: string
  // private prepare: PTZInput
  // private activeInput: Input
  private scene: SceneProps
  private logDest: string[] | undefined

  public title: string
  public disabled: boolean
  public actions?: VmixFunctionCall[]

  constructor(scene: SceneProps, logDest?: any[]) {
    this.scene = scene
    this.title = scene.title
    this.disabled = !!scene.disabled
    this.actions = scene.actions
    this.logDest = logDest
  }

  // TODO: Input needs a class model
  public GetActiveInput(): Input {
    this._log("ScenePlayer::GetActiveInput")
    return this.scene.activeInput
  }

  public async OnTransitioned(): Promise<void> {
    this._log("ScenePlayer::OnTransitioned")
    await this.callFunctions(this.scene.onTransitioned)
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
      this._log(await API.Function("PTZMoveToVirtualInputPosition", { Input: p.input }))
      this._log("Sleep 3 Seconds")
      await Sleep(3, "Seconds") // TODO: move to some kind of user settings later on?
    }
    // TODO: Get reference to next scene to determine which
    // camera should be active in the preview
  }

  public async WillTransition(): Promise<void> {
    this._log("ScenePlayer::WillTransition")
    await this.callFunctions(this.scene.willTransition)
  }

  public async Transition(): Promise<void> {
    this._log("ScenePlayer::Transition")
    if (this.scene.transition) {
      await this.callFunction(this.scene.transition)
    }
    await this._log("\n")
  }

  public GetSceneProps(): SceneProps {
    return this.scene
  }

  private async callFunction(vfc: VmixFunctionCall | VmixTransition): Promise<void> {
    console.log("ScenePlayer::callFunction")
    try {
      if (typeof vfc === "string") return this._log(await API.Function(vfc, {}))
      await this._log(await API.Function(vfc.function, vfc.params))
      const { amount, unit } = vfc.sleep ?? {}
      if (amount) {
        this._log(`Sleep ${amount} ${unit}`)
        await Sleep(amount, unit)
      }
    } catch (err) {
      console.log(err)
    }
  }

  private async callFunctions(
    list: VmixFunctionCall[] = [],
    delayMilliseconds: number = 1 * Time.Second
  ): Promise<void> {
    if (!list?.length) return
    for (let func of list) {
      await this.callFunction(func)
      if (delayMilliseconds) {
        this._log(`Sleep ${delayMilliseconds} Milliseconds`)
        await Sleep(delayMilliseconds)
      }
    }
  }

  private async _log(fmt: string, ...params: any[]): Promise<void> {
    if (!this.logDest) return console.log(fmt, ...params)
    const message = await IPC.rendererInvoke("Util:format")(fmt, ...params)
    this.logDest.push(message)
  }
}
