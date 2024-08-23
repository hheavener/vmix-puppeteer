import type { VmixFunction, VmixFunctionName } from "./VmixFunction"
import type { VmixTransition } from "@/model/types/scene"

// export type API = {
//   /**
//    * Calls the VMIX API with a given function
//    * and its parameters and returns a string
//    * representation of the function call.
//    *
//    * @param functionName the VMIX function
//    * @param params the parameters for the function
//    */
//   Function<Name extends VmixFunctionName | VmixTransition>(
//     functionName: Name,
//     params: VmixFunction["params"]
//   ): Promise<string>

//   /**
//    * Gets the input that is currently active
//    * in the vMix output channel.
//    */
//   GetActiveInput(): Promise<{ number: string; title: string }>
// }

export const API = {
  /**
   * Calls the VMIX API with a given function
   * and its parameters and returns a string
   * representation of the function call.
   *
   * @param functionName the VMIX function
   * @param params the parameters for the function
   */
  Function: async <Name extends VmixFunctionName | VmixTransition>(
    functionName: Name,
    params: VmixFunction["params"],
    logFunc?: (fmt: string, ...args: any[]) => void
  ): Promise<boolean> => {
    const msg = await IPC.rendererInvoke("Util:format")(
      "API.Function:",
      `Name: ${functionName}`,
      `Params: ${params}`
    )
    IPC.rendererInvoke("FileDialog:debug")(msg)
    logFunc?.("API.Function:", `Name = ${functionName},`, "Params =", params)

    const { resOk } = await IPC.rendererInvoke("Http:Get")(window.API_URL, {
      Function: functionName,
      ...params
    })
    IPC.rendererInvoke("FileDialog:debug")(`API.Function OK: ${resOk}`)
    if (!resOk) logFunc?.("API.Function:", "FAILURE")

    return resOk
  },

  /**
   * Queries the vMix API to see which input is
   * currently active in the output and also returns
   * which input is currently in preview.
   *
   * @returns
   */
  GetActiveInputs: async (): Promise<ActiveInputs> => {
    let { resOk, data: xml } = await IPC.rendererInvoke("Http:Get")(window.API_URL, {})

    if (!resOk) {
      // TODO: Remove this?
      console.log("vMix API unavailable - loading sample XML...")
      const sampleXml = await IPC.rendererInvoke("FileDialog:getSampleApiXmlFilePath")()
      xml = (await IPC.rendererInvoke("FileDialog:getFileContent")(sampleXml)) ?? ""
    }

    if (!xml) throw Error("Failed to load vMix API XML")
    const json = await IPC.rendererInvoke("XmlParser:ParseXml")(xml)
    const outputNumber = json.vmix.active
    const previewNumber = json.vmix.preview
    const inputs = json.vmix.inputs.input

    const getInputInfo = (inputNumber: number): InputInfo => ({
      number: String(inputNumber),
      title: inputs[inputNumber - 1]["@_title"],
      shortTitle: inputs[inputNumber - 1]["@_shortTitle"]
    })

    return {
      output: getInputInfo(outputNumber),
      preview: getInputInfo(previewNumber)
    }
  }
}

type InputInfo = { number: string; title: string; shortTitle: string }
type ActiveInputs = { output: InputInfo; preview: InputInfo }
