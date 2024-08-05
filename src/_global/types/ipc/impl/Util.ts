import util from "node:util"

export const Util = {
  async format(fmt: string, ...args: any[]) {
    return util.format(fmt, ...args)
  }
}
