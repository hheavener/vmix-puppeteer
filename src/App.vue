<script setup lang="ts">
// import { readFileSync } from "fs"
// import { openFileExplorer } from "./menus/file-menu"

async function getFile() {
  // try {
  //   // Call the method exposed in the preload script
  //   selectedFile.value = await window.electron.openFileDialog();
  // } catch (error) {
  //   console.error('Failed to open file dialog:', error);
  // }
  // const filePath = await openFileExplorer()
  // if (!filePath) return
  // fileContents = readFileSync(filePath).toString()
}

let fileContents: string
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

  <div class="file">
    <button @click="getFile">Open File</button>
    <code v-if="fileContents">{{ fileContents }}</code>
  </div>

  <!-- <RouterView /> -->
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.file {
  border: 1px solid gray;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
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
