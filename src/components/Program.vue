<script setup lang="ts">
import { useProgramStore } from "@/stores/program"
import JsonViewer from "./JsonViewer.vue"
import { ref } from "vue"

const logs = ref(globalThis.Logs)
const store = useProgramStore()
const loadProgram = async () => await store.loadProgram()
const logLogs = async () => (logs.value = await IPC.rendererInvoke("LogStream:Get")())
const clearLogs = async () => await IPC.rendererInvoke("LogStream:Clear")()
</script>

<template>
  <div v-if="!store.programLoaded" class="button-container">
    <button @click="loadProgram">Load Program</button>
  </div>

  <div v-else class="program">
    <div class="button-container">
      <button @click="store.previous"><< Previous</button>
      <div>
        <button @click="clearLogs">Clear Logs</button>
        <button @click="logLogs">Update Logs</button>
      </div>
      <!-- <button @click="store.program.GetPreviousScene">Previous?</button>
      <button @click="store.program.GetCurrentScene">Current?</button>
      <button @click="store.program.GetNextScene">Next?</button> -->
      <button @click="store.next">Next >></button>
    </div>
    <div class="program-container">
      <ul>
        <li v-for="scene of store.scenes">
          <div v-if="scene.title === store.scene?.title" class="active">{{ scene.title }}</div>
          <div v-else>{{ scene.title }}</div>
        </li>
      </ul>
      <div class="scroll">
        <!-- <div class="program-json"> -->
        <!-- <code>{{ store.scene?._getPrintable() }}</code> -->
        <JsonViewer :json="store.scene?._getRaw()" />
        <!-- </div> -->
      </div>
      <div class="logs">
        <ol>
          <li v-for="log in logs">{{ log }}</li>
        </ol>
      </div>
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
  grid-template-columns: auto 1fr minmax(auto, 350px);
  border: 1px solid white;

  ul {
    list-style: none;
    padding: 10px 20px;
  }

  .logs {
    overflow: scroll;
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
  color: #00bd1c;
}
</style>
