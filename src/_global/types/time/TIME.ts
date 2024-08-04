const Millisecond = 1
const Second = Millisecond * 1000
const Minute = Second * 60

export const TIME = {
  Millisecond,
  Milliseconds: Millisecond,
  Second,
  Seconds: Second,
  Minute,
  Minutes: Minute
} as const
