const Millisecond = 1
const Second = Millisecond * 1000
const Minute = Second * 60

export const TimeUnits = {
  Millisecond,
  Milliseconds: Millisecond,
  Second,
  Seconds: Second,
  Minute,
  Minutes: Minute
} as const

export type TimeUnit = keyof typeof TimeUnits

export const Time = {
  ...TimeUnits,
  Sleep: async (amount: number, unit: TimeUnit = "Milliseconds"): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, amount * Time[unit]))
    return IPC.rendererInvoke("Util:format")("Sleep", amount, unit)
  }
} as const

export default Time
