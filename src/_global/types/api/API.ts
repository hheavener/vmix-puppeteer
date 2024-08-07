import type { VmixFunction, VmixFunctionName } from "./VmixFunction"
import type { VmixTransition } from "./scene"

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
    params: VmixFunction["params"]
  ): Promise<string> => IPC.rendererInvoke("Util:format")("API.Function:", functionName, params),

  /**
   * Queries the vMix API to see which input is
   * currently active in the output and also returns
   * which input is currently in preview.
   *
   * @returns
   */
  GetActiveInputs: async (): Promise<ActiveInputs> => {
    const res = await fetch("http://127.0.0.1:8088/API", {
      headers: { "Content-Type": "application/xml", Accept: "application/xml" }
    }).catch((err) => console.log(err))

    let xml: string
    if (res?.status !== 200) {
      // TODO: Remove this
      const sampleXml = "/Users/hunter.heavener/Documents/Projects/vMix/v3/sample.vmix.xml"
      xml = (await IPC.rendererInvoke("FileDialog:getFileContent")(sampleXml)) ?? ""
    } else xml = await res.text()

    const json = await IPC.rendererInvoke("XmlParser:ParseXml")(xml)
    const outputNumber = json.vmix.active
    const previewNumber = json.vmix.preview
    const inputs = json.vmix.inputs.input

    return {
      output: {
        number: outputNumber,
        title: inputs[outputNumber - 1]["@_title"]
      },
      preview: {
        number: previewNumber,
        title: inputs[previewNumber - 1]["@_title"]
      }
    }
  }
}

type InputInfo = { number: string; title: string }
type ActiveInputs = { output: InputInfo; preview: InputInfo }
