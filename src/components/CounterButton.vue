<script setup lang="ts">
import { useCounterStore } from "@/stores/counter"
const store = useCounterStore()

const props = defineProps<{
  showCount?: Boolean
}>()
</script>

<template>
  <div>
    <button @click="store.increment">Increment</button>
    <p v-if="props.showCount">Count: {{ store.count }}</p>
  </div>
</template>

<style scoped>
/* Add component-specific styles here */
div {
  display: flex;
  gap: 10px;
}
</style>
