import { type VmixFunctionCall } from "@@/types/api/VmixFunction"
import { type Input, type SceneProps, type VmixTransition } from "@/model/types/scene"
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
    this._log("ScenePlayer:", "TransitionIn")
    const inputs = await API.GetActiveInputs()
    const sceneInputTitle = this.scene.activeInput.title
    if (sceneInputTitle !== inputs.output.title) {
      await API.Function("Merge", { Input: sceneInputTitle }, (fmt, ...args) =>
        this._log(fmt, ...args)
      )
    }
  }

  public async OnTransitioned(): Promise<void> {
    this._log("ScenePlayer:", "OnTransitioned")
    await this.callFunctions(this.scene.onTransitioned)
  }

  public async Prepare(): Promise<void> {
    this._log("ScenePlayer:", "Prepare")
    const { prepare } = this.scene
    if (!prepare?.length) return

    const activeTitle = this.scene.activeInput.title
    for (let i = 0; i < prepare.length; i++) {
      const prepareTitle = prepare[i].input
      const activeKey = this.virtualKeyMap[activeTitle]
      const prepareKey = this.virtualKeyMap[prepareTitle]

      if (activeKey === prepareKey) {
        this._log(`WARNING: Cannot prepare input '${prepareTitle}' which uses 
          the same PTZ optic as the active input '${activeTitle}'`)
        continue
      }

      await API.Function("PTZMoveToVirtualInputPosition", { Input: prepareTitle }, (fmt, ...args) =>
        this._log(fmt, ...args)
      )
      if (i < prepare.length - 1) this._log("ScenePlayer:", await Sleep(3, "Seconds")) // TODO: move to some kind of user settings later on?
    }
  }

  public async WillTransition(): Promise<void> {
    this._log("ScenePlayer:", "WillTransition")
    await this.callFunctions(this.scene.willTransition)
  }

  public async TransitionOut(): Promise<void> {
    this._log("ScenePlayer:", "TransitionOut")
    if (this.scene.transition) {
      await this.callFunction(this.scene.transition)
    }
  }

  // TODO: Input needs a class model?
  public GetActiveInput(): Input {
    return this.scene.activeInput
  }

  public GetSceneProps(): SceneProps {
    return this.scene
  }

  private async callFunction(vfc: VmixFunctionCall | VmixTransition): Promise<void> {
    console.log("ScenePlayer:callFunction")
    try {
      if (typeof vfc === "string") {
        await API.Function(vfc, {}, (fmt, ...args) => this._log(fmt, ...args))
        return
      }
      await API.Function(vfc.function, vfc.params, (fmt, ...args) => this._log(fmt, ...args))
      const { amount, unit } = vfc.sleep ?? {}
      if (amount) this._log("ScenePlayer:", await Sleep(amount, unit))
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
      if (delayMilliseconds) this._log("ScenePlayer:", await Sleep(delayMilliseconds))
    }
  }

  private async _log(fmt: string, ...params: any[]): Promise<void> {
    const color = fmt.startsWith("API") ? "blue" : "orange"
    const message = await IPC.rendererInvoke("Util:format")(fmt, ...params)
    const htmlMessage = await IPC.rendererInvoke("Util:format")(
      `<span class="${color}">${fmt}</span>`,
      ...params
    )
    console.log(fmt, ...params)
    this.logDest?.push(htmlMessage)
    IPC.rendererInvoke("FileDialog:debug")(message)
  }
}
