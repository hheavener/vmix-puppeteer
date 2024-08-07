import type { ProgramProps } from "@@/types/api/scene"
import Scene from "./Scene"
import Program from "./Program"

export default class ProgramBuilder {
  private program: ProgramProps | undefined
  private vmixPresetJson: any
  private scenes: Scene[] | undefined
  private logDest: string[] | undefined

  public From(program: ProgramProps) {
    this.program = program
    return this.setLogStep()
  }

  private setLogStep() {
    return {
      SetLogDestination: (value: string[]) => {
        this.logDest = value
        return this.createStep()
      },
      ...this.createStep()
    }
  }

  private createStep() {
    return {
      Initialize: async (): Promise<Program> => {
        const vmixPresetJson = await window.FileDialog.getVmixPreset(this.program!.vmixPreset)
        this.vmixPresetJson = vmixPresetJson
        const virtualKeyMap = getVirtualKeyMap(vmixPresetJson)
        this.scenes = this.program!.scenes.map((s) => new Scene(s, virtualKeyMap, this.logDest))
        return new Program(this.program!, this.vmixPresetJson, this.scenes, this.logDest)
      }
    }
  }
}

function getVirtualKeyMap(preset: any): Record<string, string> {
  const vInputKeyMap: Record<string, string> = {}
  preset.XML.Input.forEach((i: any) => {
    const key: string = i["@_VirtualInputKey"]
    const title: string = i["@_Title"] || i["@_OriginalTitle"]
    vInputKeyMap[title] = key
  })
  return vInputKeyMap
}
