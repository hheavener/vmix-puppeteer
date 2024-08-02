import type { Scene } from "@@/types/api/scene"

export default class Program {
  private program: Scene[]
  private activeIdx: number

  constructor(program: Scene[]) {
    this.program = program
    this.activeIdx = -1
  }

  public GetCurrentScene(): Scene {
    return this.program[this.activeIdx]
  }

  public NextScene(): Scene {
    return this.program[++this.activeIdx]
  }

  public PreviousScene(): Scene {
    return this.program[--this.activeIdx]
  }

  public JumpToScene(sceneIdx: number): Scene {
    this.activeIdx = sceneIdx
    return this.GetCurrentScene()
  }
}

function startScene(scene: Scene): void {}
