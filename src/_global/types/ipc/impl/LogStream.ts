import { Util } from "./Util"

export const LogStream = {
  Push(fmt: string, ...args: any[]): void {
    Util.format(fmt, ...args).then((log) => Logs.push(log))
  },
  Get(): string[] {
    return globalThis.Logs
  },
  Clear(): void {
    globalThis.Logs = []
  }
}
