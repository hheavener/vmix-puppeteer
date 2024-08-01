<script setup lang="ts">
import CounterButton from "./components/CounterButton.vue"
import MouseTracker from "./components/MouseTracker.vue"
import FileLoader from "./components/FileLoader.vue"
import { useCounterStore } from "./stores/counter"

const counter = useCounterStore()
</script>

<template>
  <header>
    <CounterButton class="counter-button" />
    <MouseTracker class="mouse-tracker" />
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <h2>{{ counter.count }}</h2>
    <!-- <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->
  </header>
  <!-- x: {{ x }} y:{{ y }} -->

  <FileLoader />

  <!-- <RouterView /> -->
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  text-align: center;
  padding-bottom: 25px;
  margin-bottom: 25px;
  /* border-bottom: 1px solid; */

  .counter-button {
    position: fixed;
    left: 20px;
    top: 20px;
  }

  .mouse-tracker {
    position: fixed;
    right: 20px;
    top: 10px;
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
