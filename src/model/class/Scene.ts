import {
  type VmixFunctionCall,
  type VmixFunctionName,
  type VmixFunctionParams
} from "@@/types/api/VmixFunction"
import { type Action, type Input, type SceneProps, type VmixTransition } from "@/model/types/scene"
import { PreventWhenDisabled } from "../decorators/PreventWhenDisabled"

const LogPrefix = "ScenePlayer:"

export default class ScenePlayer {
  private scene: SceneProps
  private virtualKeyMap: Record<string, string>
  private logDest: string[] | undefined

  public disabled: boolean
  public title: string
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
  @PreventWhenDisabled
  public async OnTransitionIn(): Promise<void> {
    const { onTransitionIn = [] } = this.scene
    if (onTransitionIn.length) {
      this._log(LogPrefix, "OnTransitionIn")
      const functionList = JSON.parse(JSON.stringify(onTransitionIn))
      await this.callFunctions(functionList)
    }
  }

  @PreventWhenDisabled
  public async TransitionIn(): Promise<void> {
    this._log(LogPrefix, "TransitionIn")
    const { output: activeOutput } = await API.GetActiveInputs()
    const { transition = "Merge", primaryView: sceneInput } = this.scene
    await this.API_Function("PreviewInput", { Input: sceneInput.title })

    for (let layer of sceneInput.layers ?? []) {
      await this.API_Function("SetLayer", {
        Input: sceneInput.title,
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

  @PreventWhenDisabled
  public async OnTransitioned(): Promise<void> {
    const { onTransitioned } = this.scene
    if (!onTransitioned?.length) return
    this._log(LogPrefix, "OnTransitioned")
    await this.callFunctions(onTransitioned)
    await this.previewSecondary()
  }

  @PreventWhenDisabled
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
  @PreventWhenDisabled
  public async Prepare(safePrepare: boolean = false): Promise<void> {
    this._log(LogPrefix, "Prepare", safePrepare ? "(safe)" : "")
    const { primaryView, prepare = [] } = this.scene
    prepare.unshift(primaryView)

    const { output } = await API.GetActiveInputs()

    for (let input of prepare) {
      const { title, layers = [] } = input
      // TODO: don't move camera if same as output
      if (safePrepare && [output.title, output.shortTitle].includes(title)) {
        this._log(`WARNING: Cannot prepare input '${title}' which uses 
          the same PTZ optic as the current output '${output.title}'`)
        continue
      }
      await this.API_Function("PTZMoveToVirtualInputPosition", { Input: title })
      for (let layer of layers) {
        await this.API_Function("SetLayer", {
          Input: title,
          Value: `${layer.index},${layer.input}`
        })
      }
    }

    this._log(LogPrefix, await Sleep(200, "Milliseconds"))
  }

  @PreventWhenDisabled
  public async PrepareSecondary(): Promise<void> {
    if (!this.scene.secondaryView) return
    this._log(LogPrefix, "PrepareSecondary")
    const { input } = this.scene.secondaryView

    for (let layer of input.layers ?? []) {
      await this.API_Function("SetLayer", {
        Input: input.title,
        Value: `${layer.index},${layer.input}`
      })
    }

    this._log(LogPrefix, await Sleep(200, "Milliseconds"))
  }

  /*
   * ==================================
   *      User-Initiated Functions
   * ==================================
   */
  @PreventWhenDisabled
  public async Alternate(): Promise<void> {
    if (!this.scene.secondaryView) return
    this._log(LogPrefix, "Alternate")

    const secondary = this.scene.secondaryView
    const { preview, output } = await API.GetActiveInputs()
    const transition = async () => {
      await this.API_Function(secondary.transition || "Merge", {})
    }

    console.log("Alternate Info:", {
      primary: { title: this.scene.primaryView.title },
      secondary: { title: secondary.input.title },
      output: { title: output.title, shortTitle: output.shortTitle }
    })

    if ([output.title, output.shortTitle].includes(secondary.input.title)) {
      const active = this.scene.primaryView
      await this.API_Function("PreviewInput", { Input: active.title })
      await this._log(LogPrefix, await Sleep(100, "Milliseconds"))
      if (secondary.onTransitionOut) {
        const functionList = JSON.parse(JSON.stringify(secondary.onTransitionOut))
        await this.callFunctions(functionList)
      }
      await transition()
    } else {
      const secondaryNotInPreview = ![preview.title, preview.shortTitle].includes(
        secondary.input.title
      )
      if (secondaryNotInPreview) await this.previewSecondary()
      if (secondary.onTransitionIn) {
        const functionList = JSON.parse(JSON.stringify(secondary.onTransitionIn))
        await this.callFunctions(functionList)
      }
      this._log(LogPrefix, await Sleep(100, "Milliseconds"))
      await transition()
    }
  }

  @PreventWhenDisabled
  public async CallAction(idx: number): Promise<void> {
    // TODO: Parameters from the DOM require serialization
    const action: Action = JSON.parse(JSON.stringify(this.scene.actions?.[idx]))
    if (!action) return
    this._log(LogPrefix, "[Action]", action.label)
    await this.callFunctions(action.functions)
  }

  /*
   * =================
   *      Getters
   * =================
   */
  // TODO: Does input need a class instead of a basic type?
  public GetActiveInput(): Input {
    return this.scene.primaryView
  }

  public GetSceneProps(): SceneProps {
    return this.scene
  }

  public HasSecondaryView(): boolean {
    return !!this.scene.secondaryView
  }

  public ShouldPrepareNext(): boolean {
    return !!this.scene.prepareNextSceneOnTransition
  }

  /*
   * =================
   *      Private
   * =================
   */
  private async previewSecondary(): Promise<void> {
    if (!this.scene.secondaryView) return
    this._log(LogPrefix, "previewSecondary")

    const alt = this.scene.secondaryView
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
    const { FileDialog, Util } = window
    const color = fmt.startsWith("API") ? "blue" : "orange"
    const message = await Util.format(fmt, ...params)
    const htmlMessage = await Util.format(
      `<span class="${color}">${fmt}</span>`,
      ...(params?.[0] === "FAILURE" ? [`<span class="error">${params[0]}</span>`] : params)
    )
    if (this.logDest) this.logDest?.push(htmlMessage)
    else console.log(fmt, ...params)
    FileDialog.debug(message)
  }
}
