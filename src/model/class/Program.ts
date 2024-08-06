import type { SceneProps } from "@@/types/api/scene"
import Scene from "./Scene"

export default class Program {
  private program: Scene[]
  private programJson: SceneProps[]
  private activeIdx: number
  private logDest: string[] | undefined

  constructor(scenes: SceneProps[], logDest?: string[]) {
    this.program = scenes.map((s) => new Scene(s, logDest))
    this.programJson = scenes
    this.activeIdx = -1
    this.logDest = logDest
  }

  public GetScenesJson(): SceneProps[] {
    return this.programJson
  }

  public GetCurrentSceneJson(): SceneProps {
    return this.programJson[this.activeIdx]
  }

  public GetCurrentScene(): Scene | undefined {
    if (this.activeIdx < 0) return undefined
    return this.program[this.activeIdx]
  }

  public GetNextScene(): Scene | null {
    const nextIdx = this.activeIdx + 1
    if (nextIdx > this.program.length - 1) return null
    return this.program[nextIdx]
  }

  public GetPreviousScene(): Scene | null {
    const previousIdx = this.activeIdx - 1
    if (previousIdx < 0) return null
    return this.program[previousIdx]
  }

  public async MoveToNextScene(): Promise<Scene | undefined> {
    await this._log("Program::MoveToNextScene")
    const current = this.program[this.activeIdx]
    await current?.WillTransition()
    await current?.Transition?.()

    const nextIdx = this.findNextEnabledScene()
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
    this._log("Program::MoveToScene[%d]", sceneIdx)
    IPC.rendererInvoke("LogStream:Push")("Program::MoveToScene[%d]", sceneIdx)
    this.activeIdx = sceneIdx
    const scene = this.program[sceneIdx]
    await scene.OnTransitioned()
    await scene.Prepare()
    return scene
  }

  private findNextEnabledScene(): number | null {
    const { activeIdx, program } = this
    for (let i = activeIdx + 1; i < program.length; i++) {
      if (!program[i].disabled) return i
    }
    return null
  }

  private findPreviousEnabledScene(): number | null {
    const { activeIdx, program } = this
    for (let i = activeIdx - 1; i >= 0; i--) {
      if (!program[i].disabled) return i
    }
    return null
  }

  private async _log(fmt: string, ...params: any[]): Promise<void> {
    if (!this.logDest) return console.log(fmt, ...params)
    const message = await IPC.rendererInvoke("Util:format")(fmt, ...params)
    this.logDest.push(message)
  }
}

function startScene(scene: SceneProps): void {}
