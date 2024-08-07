<script setup lang="ts">
import { useProgramStore } from "@/stores/program"
import JsonViewer from "./JsonViewer.vue"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shadcn/ui/resizable"
import { watch } from "vue"

const store = useProgramStore()
const loadProgram = async () => await store.loadProgram()

// TODO: Move logs container into separate component
function smoothScrollToBottom() {
  const container = document.querySelector("[data-panel-id='log-container']")
  if (!container) return
  const targetScrollTop = container.scrollHeight
  const startScrollTop = container.scrollTop
  const duration = 2000 // Duration in milliseconds
  let startTime: number | null = null

  function animateScroll(currentTime: number) {
    if (startTime === null) startTime = currentTime
    const elapsedTime = currentTime - startTime
    const progress = Math.min(elapsedTime / duration, 1)
    container!.scrollTop =
      startScrollTop + (targetScrollTop - startScrollTop) * easeInOutQuad(progress)

    if (elapsedTime < duration) requestAnimationFrame(animateScroll)
    else container!.scrollTop = targetScrollTop // Ensure it’s exactly at the bottom
  }
  requestAnimationFrame(animateScroll)
}

// Easing function for smooth animation
function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

watch(store.logs, smoothScrollToBottom, { deep: true })
</script>

<template>
  <div v-if="!store.programLoaded" class="button-container">
    <button @click="loadProgram">Load Program</button>
  </div>

  <div v-else class="program">
    <div class="button-container">
      <button @click="store.previous"><< Previous</button>
      <button @click="store.clearLogs">Clear Logs</button>
      <button @click="store.next">Next >></button>
    </div>
    <div class="program-container">
      <ul>
        <li v-for="scene of store.scenes">
          <div v-if="scene.title === store.scene?.title" class="active">{{ scene.title }}</div>
          <div v-else>{{ scene.title }}</div>
        </li>
      </ul>
      <ResizablePanelGroup id="resize-group" direction="horizontal">
        <ResizablePanel :min-size="10" collapsible>
          <!-- <div class="scroll"> -->
          <JsonViewer v-if="store.scene" :json="store.scene?.GetSceneProps()" />
          <!-- </div> -->
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel :min-size="10" collapsible id="log-container">
          <!-- <div class="logs"> -->
          <ul>
            <li v-for="(log, idx) in store.logs" :key="idx" v-html="log"></li>
          </ul>
          <!-- </div> -->
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  </div>
</template>

<style scoped>
.program {
  width: 80vw;
  max-height: 20vh;
  position: relative;
}
.button-container {
  display: grid;
  grid-auto-flow: column;
  justify-items: center;
  justify-content: space-between;

  button {
    width: 150px;
  }
}
.program-container {
  display: grid;
  grid-template-columns: auto 1fr;
  border: 1px solid white;
  height: 70vh;
  overflow: hidden;

  & > [data-panel-group-id="resize-group"] > div:nth-of-type(odd) {
    max-height: inherit;
    overflow: scroll !important;
    white-space: nowrap;
    height: 70vh;
    border-left: 1px solid;
    & > * {
      padding: 10px 15px 20px;
    }

    /* ul {
      padding: 0;
      padding-left: 5px;
    } */
  }
}

.program-json {
  border: 1px solid gray;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
}
.scroll {
  overflow: scroll;
  border-left: 1px solid;
  border-right: 1px solid;
}
.active {
  color: #00bd1c;
}
ul {
  list-style: none;
  padding: 10px 20px;

  li {
    display: block;
    height: 24px;
  }
}
</style>
