import type { ProgramProps, SceneProps } from "@/model/types/scene"
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

  public GetNextScene(): Scene | undefined {
    const nextIdx = this.findNextEnabledScene()
    if (nextIdx == null || nextIdx > this.scenes.length - 1) return undefined
    return this.scenes[nextIdx]
  }

  public GetPreviousScene(): Scene | undefined {
    const previousIdx = this.findPreviousEnabledScene()
    if (!previousIdx || previousIdx < 0) return undefined
    return this.scenes[previousIdx]
  }

  public async MoveToNextScene(): Promise<Scene | undefined> {
    await this._log("Program:", "MoveToNextScene")
    const nextIdx = this.findNextEnabledScene()
    if (nextIdx !== null) return this.MoveToScene(nextIdx)
    this._log("Program:", "FAILURE: No next scene found!")
  }

  public async MoveToPreviousScene(): Promise<Scene | undefined> {
    await this._log("Program::MoveToPreviousScene")
    const prevIdx = this.findPreviousEnabledScene()
    if (prevIdx !== null) return this.MoveToScene(prevIdx)
    this._log("Program:", "FAILURE: No previous scene found!")
  }

  public GetScene(sceneIdx: number): Scene | undefined {
    if (sceneIdx < 0 || sceneIdx > this.scenes.length - 1) return
    return this.scenes[sceneIdx]
  }

  public async MoveToScene(sceneIdx: number): Promise<Scene | undefined> {
    const current = this.scenes[this.activeIdx]
    await current?.OnTransitionOut()

    this._log("\n")
    const logFmt = "<b>Program::MoveToScene[%d]</b> - %s"
    if (sceneIdx < 0 || sceneIdx > this.scenes.length - 1) {
      this._log(logFmt, sceneIdx, "FAILURE: Scene out of bounds!")
      return
    }

    this._log(logFmt, sceneIdx + 1, this.scenes[sceneIdx].title)
    this.activeIdx = sceneIdx

    const scene = this.scenes[sceneIdx]
    await scene.Prepare()
    await scene.OnTransitionIn()
    await scene.TransitionIn()
    await scene.OnTransitioned()

    if (scene.ShouldPrepareNext()) {
      const nextSceneIdx = this.findNextEnabledScene()
      if (nextSceneIdx !== null) {
        const nextScene = this.GetScene(nextSceneIdx)
        if (nextScene) await nextScene?.Prepare(true)
      }
    }

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
    const color = fmt.startsWith("API") ? "blue" : "green"
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
