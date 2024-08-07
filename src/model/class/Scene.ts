import { type VmixFunctionCall } from "@@/types/api/VmixFunction"
import { type Input, type SceneProps, type VmixTransition } from "@@/types/api/scene"
import Time from "@@/types/ipc/impl/Time"

export default class ScenePlayer {
  // private title: string
  // private prepare: PTZInput
  // private activeInput: Input
  private scene: SceneProps
  private virtualKeyMap: Record<string, string>
  private logDest: string[] | undefined

  public title: string
  public disabled: boolean
  public actions?: VmixFunctionCall[]

  constructor(scene: SceneProps, virtualKeyMap: Record<string, string>, logDest?: any[]) {
    this.scene = scene
    this.virtualKeyMap = virtualKeyMap
    this.title = scene.title
    this.disabled = !!scene.disabled
    this.actions = scene.actions
    this.logDest = logDest
  }

  public async TransitionIn(): Promise<void> {
    this._log("ScenePlayer::TransitionIn")
    const inputs = await API.GetActiveInputs()
    const sceneInputTitle = this.scene.activeInput.title
    if (sceneInputTitle !== inputs.output.title) {
      this._log(await API.Function("Merge", { Input: sceneInputTitle }))
    }
  }

  public async OnTransitioned(): Promise<void> {
    this._log("ScenePlayer::OnTransitioned")
    await this.callFunctions(this.scene.onTransitioned)
  }

  public async Prepare(): Promise<void> {
    this._log("ScenePlayer::Prepare")
    console.log(this.virtualKeyMap)
    const { prepare } = this.scene
    if (!prepare?.length) return

    const activeTitle = this.scene.activeInput.title
    for (let i = 0; i < prepare.length; i++) {
      const prepareTitle = prepare[i].input
      const activeKey = this.virtualKeyMap[activeTitle]
      const prepareKey = this.virtualKeyMap[prepareTitle]
      console.log({ activeTitle, prepareTitle })
      console.log({ activeKey, prepareKey })

      if (activeKey === prepareKey) {
        this._log(`WARNING: Cannot prepare input '${prepareTitle}' which uses 
          the same PTZ optic as the active input '${activeTitle}'`)
        continue
      }

      this._log(await API.Function("PTZMoveToVirtualInputPosition", { Input: prepareTitle }))

      if (i < prepare.length - 1) {
        this._log("Sleep 3 Seconds")
        await Sleep(3, "Seconds")
        this.logDest?.pop()
      } // TODO: move to some kind of user settings later on?
    }
  }

  public async WillTransition(): Promise<void> {
    this._log("ScenePlayer::WillTransition")
    await this.callFunctions(this.scene.willTransition)
  }

  public async TransitionOut(): Promise<void> {
    this._log("ScenePlayer::TransitionOut")
    if (this.scene.transition) {
      await this.callFunction(this.scene.transition)
    }
    await this._log("\n")
  }

  // TODO: Input needs a class model?
  public GetActiveInput(): Input {
    this._log("ScenePlayer::GetActiveInput")
    return this.scene.activeInput
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
        this.logDest?.pop()
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
        this.logDest?.pop()
      }
    }
  }

  private async _log(fmt: string, ...params: any[]): Promise<void> {
    if (!this.logDest) return console.log(fmt, ...params)
    const color = fmt.startsWith("API") ? "blue" : "orange"
    const message = await IPC.rendererInvoke("Util:format")(
      `<span class="${color}">${fmt}</span>`,
      ...params
    )
    this.logDest.push(message)
  }
}
