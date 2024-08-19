import axios from "axios"
import FileDialog from "./FileDialog"

type QueryParams = Record<string, string | number | boolean>

export const Http = {
  async Get(url: string, params: QueryParams): Promise<{ resOk: boolean; data: any }> {
    try {
      const queryString = buildQueryString(params)
      FileDialog.debug(`Http::Get URL: ${url}?${queryString}`)
      const headers = { "Content-Type": "application/xml", Accept: "application/xml" }

      const { status, data } = await axios.get(`${url}?${queryString}`, { headers, timeout: 200 })
      return { resOk: status === 200, data }
    } catch (err) {
      console.log("Http::Get ERROR:", (err as Error).message)
      FileDialog.debug(`Http::Get ERROR: ${(err as Error).message}`)
    }
    return { resOk: false, data: null }
  }
}

function buildQueryString(params: QueryParams): string {
  const paramArray = Object.entries(params)
  return paramArray.map(([key, val]) => `${key}=${val}`).join("&")
}

export default Http
