<script setup lang="ts">
import { ref } from "vue"
import Program from "./components/Program.vue"

// const counter = useCounterStore()
const isHidden = ref(false)
const toggleIsHidden = () => (isHidden.value = !isHidden.value)
const logActiveInput = async () => {
  const inputs = await API.GetActiveInputs()
  console.log(inputs)
}
const logVmixPresetJson = async () => {
  const json = await window.FileDialog.getVmixPreset(
    "/Users/hunter.heavener/Documents/Projects/vMix/Backup/HunterExperimentalPresets.vmixZip"
  )
  const vInputKeyMap: Record<string, string[]> = {}
  json.XML.Input.forEach((i: any) => {
    const key: string = i["@_VirtualInputKey"]
    if (!vInputKeyMap[key]) vInputKeyMap[key] = []
    vInputKeyMap[key].push(i["@_Title"] || i["@_OriginalTitle"])
  })
  console.log(json)
}
</script>

<template>
  <header>
    <div class="top-left">
      <button v-if="isHidden" @click="toggleIsHidden">Show Logo</button>
      <button v-else @click="toggleIsHidden">Hide Logo</button>
    </div>
    <div class="top-right">
      <button @click="logActiveInput">Log Active Input</button>
      <button @click="logVmixPresetJson">Log vMix Preset JSON</button>
    </div>
    <!-- <MouseTracker class="mouse-tracker" /> -->
    <div class="logo-wrapper">
      <div class="h-125">
        <Transition name="bounce">
          <img
            v-show="!isHidden"
            alt="Vue logo"
            class="logo"
            src="@/assets/logo.svg"
            width="125"
            height="125"
          />
        </Transition>
      </div>
      <!-- <h2>{{ counter.count }}</h2>
      <CounterButton /> -->
    </div>

    <!-- <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->
  </header>

  <!-- <FileLoader /> -->
  <Program />

  <!-- <RouterView /> -->
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  line-height: 1.5;
  max-height: 100vh;
  text-align: center;
  margin-bottom: 25px;
  /* border-bottom: 1px solid; */

  /* .h-125 {
    height: 150px;
  } */

  .top-left {
    position: fixed;
    left: 20px;
    top: 20px;
  }

  .top-right {
    position: fixed;
    right: 20px;
    top: 20px;
  }

  .logo-wrapper {
    display: flex;
    justify-items: center;
    flex-direction: column;
  }
}

.logo {
  display: block;
  /* margin: 0 auto 2rem; */
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
