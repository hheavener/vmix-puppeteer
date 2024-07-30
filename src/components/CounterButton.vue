<script setup>
import { useCounterStore } from "@/stores/counter"
const store = useCounterStore()
</script>

<template>
  <div>
    <p>Count: {{ store.count }}</p>
    <button @click="store.increment">Increment</button>
  </div>
</template>

<style scoped>
/* Add component-specific styles here */
</style>
