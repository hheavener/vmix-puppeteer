import type { ProgramProps, SceneProps } from "@@/types/api/scene"
import Scene from "./Scene"

export default class Program {
  private scenes: Scene[]
  private programJson: ProgramProps
  private activeIdx: number
  private logDest: string[] | undefined
  private vmixPresetJson: any

  constructor(program: ProgramProps, presetJson: any, scenes: Scene[], logDest?: string[]) {
    this.activeIdx = -1
    this.programJson = program
    this.vmixPresetJson = presetJson
    this.scenes = scenes
    this.logDest = logDest
  }

  public GetScenesJson(): SceneProps[] {
    return this.programJson.scenes
  }

  public GetCurrentSceneJson(): SceneProps {
    return this.programJson.scenes[this.activeIdx]
  }

  public GetCurrentScene(): Scene | undefined {
    if (this.activeIdx < 0) return undefined
    return this.scenes?.[this.activeIdx]
  }

  public GetNextScene(): Scene | null {
    const nextIdx = this.activeIdx + 1
    if (nextIdx > this.scenes.length - 1) return null
    return this.scenes[nextIdx]
  }

  public GetPreviousScene(): Scene | null {
    const previousIdx = this.activeIdx - 1
    if (previousIdx < 0) return null
    return this.scenes[previousIdx]
  }

  public async MoveToNextScene(): Promise<Scene | undefined> {
    await this._log("Program::MoveToNextScene")
    const nextIdx = this.findNextEnabledScene()
    const nextScene = nextIdx && this.scenes[nextIdx]
    if (nextScene) {
      const input = nextScene.GetActiveInput().title
      this._log(await API.Function("PreviewInput", { Input: input }))
    }

    const current = this.scenes[this.activeIdx]
    await current?.WillTransition()
    await current?.TransitionOut()

    if (nextIdx === null) return
    return this.MoveToScene(nextIdx)
  }

  public async MoveToPreviousScene(): Promise<Scene | undefined> {
    await this._log("Program::MoveToPreviousScene")
    // TODO: Determine how to handle transition to a previous scene
    const prevIdx = this.findPreviousEnabledScene()
    if (prevIdx === null) return
    return this.MoveToScene(prevIdx)
  }

  public async MoveToScene(sceneIdx: number): Promise<Scene> {
    this._log("\n")
    this._log("<b>Program::MoveToScene[%d]</b> - %s", sceneIdx + 1, this.scenes[sceneIdx].title)
    this.activeIdx = sceneIdx
    const scene = this.scenes[sceneIdx]
    await scene.TransitionIn()
    await scene.OnTransitioned()
    await scene.Prepare()
    return scene
  }

  private findNextEnabledScene(): number | null {
    const { activeIdx, scenes } = this
    for (let i = activeIdx + 1; i < scenes.length; i++) {
      if (!scenes[i].disabled) return i
    }
    return null
  }

  private findPreviousEnabledScene(): number | null {
    const { activeIdx, scenes } = this
    for (let i = activeIdx - 1; i >= 0; i--) {
      if (!scenes[i].disabled) return i
    }
    return null
  }

  private async _log(fmt: string, ...params: any[]): Promise<void> {
    const message = await IPC.rendererInvoke("Util:format")(fmt, ...params)
    const htmlMessage = await IPC.rendererInvoke("Util:format")(
      `<span class="green">${fmt}</span>`,
      ...params
    )
    console.log(fmt, ...params)
    this.logDest?.push(htmlMessage)
    IPC.rendererInvoke("FileDialog:debug")(message)
  }
}
