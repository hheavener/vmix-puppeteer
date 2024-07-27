<template>
  <div>
    <p>Count: {{ counterStore.count }}</p>
    <button @click="counterStore.increment">Increment</button>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter"
const counterStore = useCounterStore()
</script>

<style scoped>
/* Add component-specific styles here */
</style>
