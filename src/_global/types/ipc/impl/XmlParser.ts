import { XMLParser } from "fast-xml-parser"

const XmlParser = {
  async ParseXml<T = any>(xml: string): Promise<T> {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      allowBooleanAttributes: true
    })
    return parser.parse(xml) as T
  }
}

export default XmlParser
