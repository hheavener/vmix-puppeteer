<script setup lang="ts">
import { ref } from "vue"
import CounterButton from "@/components/CounterButton.vue"
import MouseTracker from "./components/MouseTracker.vue"

let filePath = ref("")
let fileContent = ref("")
async function getFile() {
  const { FileDialog } = window
  try {
    filePath.value = (await FileDialog.getFilePath()) ?? ""
    if (filePath.value) {
      fileContent.value = (await FileDialog.getFileContent(filePath.value, "utf8")) ?? ""
    }
  } catch (err) {
    alert(`Failed to open file:\n\n${err}`)
    console.error("Failed to open file:", err)
  }
}

// const { x, y } = useMouse()
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <!-- <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->
  </header>
  <!-- x: {{ x }} y:{{ y }} -->

  <MouseTracker />
  <CounterButton />
  <div class="file">
    <button @click="getFile">Open File</button>
    <br />
    <code id="filename" v-if="filePath"><b>File:</b> {{ filePath }}</code>
    <code id="filename" v-else>No file selected</code>
    <code v-if="fileContent"><b>Content:</b></code>
    <div class="container" v-if="filePath">
      <code id="filecontent">{{ fileContent }}</code>
    </div>
  </div>

  <!-- <RouterView /> -->
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.file {
  button {
    max-width: max-content;
  }
  #filename {
    display: block;
    margin-top: 1em;
  }
  .container {
    border: 1px solid gray;
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    word-wrap: break-word;
  }
}

.logo {
  display: block;
  margin: 0 auto 2rem;
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

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
