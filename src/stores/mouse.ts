import { ref } from "vue"
import { useEventListener } from "./event"
import { defineStore } from "pinia"

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, "mousemove", (event) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}

export const useMouseStore = defineStore("mousemove", () => {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, "mousemove", (event) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
})
