import type AdmZip from "adm-zip"
import { XMLParser } from "fast-xml-parser"

/**
 * Read-only representation of a Vmix save file
 * that is loaded for information to populate the
 * user interface.
 */
export default class VmixPreset {
  private static XML_FILE = "preset.xml"
  private xmlParser: XMLParser
  private data: Object

  // /Users/hunter.heavener/Documents/Projects/vMix/Backup/HunterExperimentalPresets.vmixZip
  constructor(vmixZip: AdmZip) {
    this.xmlParser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      allowBooleanAttributes: true
    })
    const zipEntry = vmixZip.getEntry(VmixPreset.XML_FILE)
    if (!zipEntry) throw Error("vMix presets not found in ZIP archive!")
    const xmlString = zipEntry.getData().toString("utf8")
    this.data = this.xmlParser.parse(xmlString)
  }

  // TODO: Need a type for data?
  getXmlData() {
    return this.data
  }
}

// function parseXmlString(xmlString: string) {
//   const parser = new DOMParser()
//   const xmlDoc = parser.parseFromString(xmlString, "application/xml")

//   function evaluateXPath(xpath: string) {
//     const evaluator = new XPathEvaluator()
//     const result = evaluator.evaluate(
//       xpath,
//       xmlDoc,
//       null,
//       XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
//       null
//     )
//     const nodes = []
//     for (let i = 0; i < result.snapshotLength; i++) nodes.push(result.snapshotItem(i))
//     return nodes
//   }

//   let inputNodes = evaluateXPath("/XML/Input")
//   const map = inputNodes
//     .map((n) => n.attributes)
//     .reduce((total, node) => {
//       let json = {}
//       Object.entries(node).forEach(([key, val]) => {
//         json[val.name] = val.value
//       })
//       return { ...total, [node.Title?.value || node.OriginalTitle.value]: json }
//     }, {})

//   console.log(
//     "Input Virtual Keys:",
//     Object.entries(map).map(([key, val]) => ({ [key]: val.VirtualInputKey }))
//   )

//   // Recursive function to print XML structure
//   function printXMLStructure(node, depth = 0) {
//     if (node.nodeType === Node.ELEMENT_NODE) {
//       // Print the tag name with indentation
//       console.log("  ".repeat(depth) + node.nodeName)

//       // Recursively print each child node
//       for (let i = 0; i < node.childNodes.length; i++) {
//         printXMLStructure(node.childNodes[i], depth + 1)
//       }
//     }
//   }
// }
