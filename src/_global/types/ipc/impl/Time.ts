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

// type Time = {
//   Millisecond: number
//   Milliseconds: number
//   Second: number
//   Seconds: number
//   Minute: number
//   Minutes: number
//   Sleep: (amount: number, unit: keyof typeof Units) => Promise<void>
// }

export const Time = {
  ...TimeUnits,
  Sleep: async (amount: number, unit: TimeUnit = "Milliseconds"): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, amount * Time[unit]))
  }
} as const

export default Time

// export default class Time {
//   static Millisecond = 1
//   static Second = Time.Millisecond * 1000
//   static Minute = Time.Second * 60

//   public static async Sleep(amount: number, unit: keyof typeof TimeEnum = "Milliseconds"): Promise<void> {
//     await new Promise((resolve) => setTimeout(resolve, amount * TimeEnum[unit]))
//   }
// }
