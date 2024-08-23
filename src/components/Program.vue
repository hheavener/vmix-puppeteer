<script setup lang="ts">
import { useProgramStore } from "@/stores/program"
import JsonViewer from "./JsonViewer.vue"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shadcn/ui/resizable"
import { computed, watch } from "vue"

const store = useProgramStore()
const loadProgram = async () => await store.loadProgram()
const sceneJson = computed(() => store.scene?.GetSceneProps())
const nextSceneJson = computed(() => store.nextScene?.GetSceneProps())

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
      <!-- <button @click="store.clearLogs">Clear Logs</button> -->
      <button
        v-for="(action, idx) in store.scene?.actions"
        @click="store.callAction(idx)"
        class="blue-bg"
      >
        {{ action.label }}
      </button>
      <button
        v-if="store.scene?.HasAlternateInput()"
        @click="store.scene?.Alternate"
        class="green-bg"
      >
        Alternate
      </button>
      <button @click="store.next">Next >></button>
    </div>
    <div class="program-container">
      <ul class="scene-list">
        <li v-for="(scene, idx) of store.scenes" :key="idx" @click="store.jump(idx)">
          <div v-if="scene.title === store.scene?.title" class="active">
            {{ scene.title }}
          </div>
          <div v-else>{{ scene.title }}</div>
        </li>
      </ul>
      <ResizablePanelGroup id="resize-group" direction="vertical">
        <ResizablePanel :min-size="10" collapsible :default-size="1">
          <ResizablePanelGroup id="resize-group-2" direction="horizontal">
            <ResizablePanel :min-size="10" collapsible :default-size="1">
              <JsonViewer v-if="sceneJson" :json="sceneJson" />
              <div v-else class="placeholder"><h2>No scene selected</h2></div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel :min-size="10" collapsible :default-size="1">
              <JsonViewer v-if="nextSceneJson" :json="nextSceneJson" />
              <div v-else class="placeholder"><h2>No next scene</h2></div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel :min-size="10" collapsible id="log-container" class="custom-scroll">
          <ul v-if="store.logs.length">
            <li v-for="(log, idx) in store.logs" :key="idx" v-html="log"></li>
          </ul>
          <div v-else class="placeholder"><h2>No log data</h2></div>
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
.scene-list {
  li:hover {
    cursor: pointer;
    color: var(--color-green-light);
  }
}
.button-container {
  display: grid;
  grid-auto-flow: column;
  justify-items: center;
  justify-content: space-between;

  button {
    width: 150px;
  }

  &.tr {
    position: fixed;
    right: 80px;
  }
}
.program-container {
  display: grid;
  grid-template-columns: auto 1fr;
  border: 1px solid white;
  height: 70vh;
  overflow: hidden;

  [id^="radix-vue-splitter-resize-handle"] {
    &[data-orientation="horizontal"] {
      border-left: 1px solid;
    }
    &[data-orientation="vertical"] {
      border-top: 1px solid;
    }
  }

  & > [data-panel-group-id="resize-group"] {
    border-left: 1px solid;
    & > div:first-of-type {
      max-height: inherit;
      /* border-bottom: 1px solid aqua; */
      white-space: nowrap;
      overflow: scroll !important;
      scrollbar-width: none !important; /* For Firefox */
      &::-webkit-scrollbar {
        display: none; /* Hide scrollbars in WebKit browsers */
      }
      & .json-viewer {
        padding: 10px 15px 20px;
      }
    }
  }
}
#log-container {
  li {
    white-space: nowrap;
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
  color: var(--color-green);
}
ul {
  list-style: none;
  padding: 10px 20px;
  display: inline-block;

  li {
    display: block;
    height: 24px;
  }
}
.placeholder {
  display: grid;
  height: 100%;
  place-content: center;
}
</style>
