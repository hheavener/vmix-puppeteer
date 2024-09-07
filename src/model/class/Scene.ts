import {
  type VmixFunctionCall,
  type VmixFunctionName,
  type VmixFunctionParams
} from "@@/types/api/VmixFunction"
import { type Input, type SceneProps, type VmixTransition } from "@/model/types/scene"

const LogPrefix = "ScenePlayer:"

export default class ScenePlayer {
  private scene: SceneProps
  private virtualKeyMap: Record<string, string>
  private logDest: string[] | undefined

  public title: string
  public disabled: boolean
  public actions?: (typeof this.scene)["actions"]

  constructor(scene: SceneProps, virtualKeyMap: Record<string, string>, logDest?: any[]) {
    this.scene = scene
    this.virtualKeyMap = virtualKeyMap
    this.title = scene.title
    this.disabled = !!scene.disabled
    this.actions = scene.actions
    this.logDest = logDest
  }

  /*
   * =====================
   *      Transitions
   * =====================
   */
  public async OnTransitionIn(): Promise<void> {
    const { onTransitionIn = [] } = this.scene
    if (onTransitionIn.length) {
      this._log(LogPrefix, "OnTransitionIn")
      const functionList = JSON.parse(JSON.stringify(onTransitionIn))
      await this.callFunctions(functionList)
    }
  }
  public async TransitionIn(): Promise<void> {
    this._log(LogPrefix, "TransitionIn")
    const { output: activeOutput } = await API.GetActiveInputs()
    const { transition = "Merge", activeInput: sceneInput } = this.scene
    await this.API_Function("PreviewInput", { Input: sceneInput.title })

    for (let layer of sceneInput.layers ?? []) {
      await this.API_Function("SetLayer", {
        Value: `${layer.index},${layer.input}`
      })
    }

    if (sceneInput.title !== activeOutput.title) {
      await (typeof transition === "string"
        ? this.API_Function(transition, { Input: sceneInput.title })
        : this.callFunction(transition))
      this._log(LogPrefix, await Sleep(1, "Second"))
    } else {
      this._log(LogPrefix, `Cannot merge '${sceneInput.title}' because of '${activeOutput.title}'`)
    }
  }

  public async OnTransitioned(): Promise<void> {
    const { onTransitioned } = this.scene
    if (!onTransitioned?.length) return
    this._log(LogPrefix, "OnTransitioned")
    await this.callFunctions(onTransitioned)
    await this.previewAlternate()
  }

  public async OnTransitionOut(): Promise<void> {
    const { onTransitionOut } = this.scene
    if (!onTransitionOut?.length) return
    this._log(LogPrefix, "OnTransitionOut")
    await this.callFunctions(onTransitionOut)
    this._log(LogPrefix, await Sleep(1, "Second"))
  }

  /*
   * =============================
   *      Pre/Post Operations
   * =============================
   */
  public async Prepare(): Promise<void> {
    const { prepare } = this.scene
    if (!prepare?.length) return
    this._log(LogPrefix, "Prepare")

    const activeTitle = this.scene.activeInput.title
    for (let input of prepare) {
      const { title, layers = [] } = input
      const activeKey = this.virtualKeyMap[activeTitle]
      const prepareKey = this.virtualKeyMap[title]

      if (activeKey === prepareKey) {
        this._log(`WARNING: Cannot prepare input '${title}' which uses 
          the same PTZ optic as the active input '${activeTitle}'`)
        continue
      }

      await this.API_Function("PTZMoveToVirtualInputPosition", { Input: title })
      for (let layer of layers) {
        await this.API_Function("SetLayer", {
          Value: `${layer.index},${layer.input}`
        })
      }
    }

    this._log(LogPrefix, await Sleep(200, "Milliseconds"))
  }

  /*
   * ==================================
   *      User-Initiated Functions
   * ==================================
   */
  public async Alternate(): Promise<void> {
    if (!this.scene.alternate) return
    this._log(LogPrefix, "Alternate")

    const alt = this.scene.alternate
    const { preview, output } = await API.GetActiveInputs()
    const transition = async () => {
      await this.API_Function(alt.transition || "Merge", {})
    }

    console.log("Alternate Info:", {
      active: { title: this.scene.activeInput.title },
      alt: { title: alt.input.title },
      output: { title: output.title, shortTitle: output.shortTitle }
    })

    if ([output.title, output.shortTitle].includes(alt.input.title)) {
      const active = this.scene.activeInput
      await this.API_Function("PreviewInput", { Input: active.title })
      await this._log(LogPrefix, await Sleep(100, "Milliseconds"))
      if (alt.onTransitionOut) {
        const functionList = JSON.parse(JSON.stringify(alt.onTransitionOut))
        await this.callFunctions(functionList)
      }
      await transition()
    } else {
      const altViewNotInPreview = ![preview.title, preview.shortTitle].includes(alt.input.title)
      if (altViewNotInPreview) await this.previewAlternate()
      if (alt.onTransitionIn) {
        const functionList = JSON.parse(JSON.stringify(alt.onTransitionIn))
        await this.callFunctions(functionList)
      }
      this._log(LogPrefix, await Sleep(100, "Milliseconds"))
      await transition()
    }
  }

  public async CallAction(idx: number): Promise<void> {
    // TODO: Parameters from the DOM require serialization
    const action = JSON.parse(JSON.stringify(this.scene.actions?.[idx]))
    if (!action) return
    this._log(LogPrefix, "[Action]", action.title)
    await this.callFunction(action)
  }

  /*
   * =================
   *      Getters
   * =================
   */
  // TODO: Does input need a class instead of a basic type?
  public GetActiveInput(): Input {
    return this.scene.activeInput
  }

  public GetSceneProps(): SceneProps {
    return this.scene
  }

  public HasAlternateInput(): boolean {
    return !!this.scene.alternate
  }

  /*
   * =================
   *      Private
   * =================
   */
  private async previewAlternate(): Promise<void> {
    if (!this.scene.alternate) return
    this._log(LogPrefix, "previewAlternate")

    const alt = this.scene.alternate
    const { preview, output } = await API.GetActiveInputs()
    if (alt.input.title === preview.title) return

    const altKey = this.virtualKeyMap[alt.input.title]
    const outputKey = this.virtualKeyMap[output.title]
    console.log({ altKey, outputKey })

    if ((outputKey || altKey) && outputKey === altKey) {
      return this._log(`WARNING: Cannot preview input '${alt.input.title}' which uses 
        the same PTZ optic as the active output '${output.title}'`)
    }

    await this.API_Function("PreviewInput", { Input: alt.input.title })
  }

  private async callFunction(vfc: VmixFunctionCall | VmixTransition): Promise<void> {
    console.log("ScenePlayer:callFunction")
    try {
      if (typeof vfc === "string") {
        await this.API_Function(vfc, {})
        return
      }
      await this.API_Function(vfc.function, vfc.params)
      const { amount, unit } = vfc.sleep ?? {}
      if (amount) this._log(LogPrefix, await Sleep(amount, unit))
    } catch (err) {
      console.log(err)
    }
  }

  private async callFunctions(
    list: VmixFunctionCall[] = [],
    delayMilliseconds: number = 0
  ): Promise<void> {
    if (!list?.length) return
    for (let func of list) {
      await this.callFunction(func)
      if (delayMilliseconds) this._log(LogPrefix, await Sleep(delayMilliseconds))
    }
  }

  private async API_Function(
    name: VmixFunctionName | VmixTransition,
    params: VmixFunctionParams
  ): Promise<void> {
    await API.Function(name, params, (fmt, ...args) => this._log(fmt, ...args))
  }

  private async _log(fmt: string, ...params: any[]): Promise<void> {
    const color = fmt.startsWith("API") ? "blue" : "orange"
    const message = await IPC.rendererInvoke("Util:format")(fmt, ...params)
    const htmlMessage = await IPC.rendererInvoke("Util:format")(
      `<span class="${color}">${fmt}</span>`,
      ...params
    )
    if (this.logDest) this.logDest?.push(htmlMessage)
    else console.log(fmt, ...params)
    IPC.rendererInvoke("FileDialog:debug")(message)
  }
}
