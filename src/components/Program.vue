<script setup lang="ts">
import { useProgramStore } from "@/stores/program"

const store = useProgramStore()
const loadProgram = async () => await store.loadProgram()
</script>

<template>
  <div v-if="!store.programLoaded" class="button-container">
    <button @click="loadProgram">Load Program</button>
  </div>
  <div v-else>
    <div class="button-container">
      <button @click="store.previous"><< Previous</button>
      <!-- <button @click="store.program.GetPreviousScene">Previous?</button>
      <button @click="store.program.GetCurrentScene">Current?</button>
      <button @click="store.program.GetNextScene">Next?</button> -->
      <button @click="store.next">Next >></button>
    </div>
    <div class="program-json">
      <code>{{ store.scene?._getJSON() }}</code>
    </div>
  </div>
</template>

<style scoped>
.button-container {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: repeat(2, 1fr);
}
.program-json {
  border: 1px solid gray;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
}
</style>
