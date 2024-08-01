<script setup lang="ts">
import { useCounterStore } from "@/stores/counter"
const store = useCounterStore()

const props = defineProps<{
  showCount?: Boolean
}>()
</script>

<template>
  <div>
    <button @click="store.decrement">
      <svg
        width="20"
        height="20"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
          data-darkreader-inline-fill=""
          style="--darkreader-inline-fill: currentColor"
        ></path>
      </svg>
    </button>
    <button @click="store.increment">
      <svg
        width="20"
        height="20"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
          data-darkreader-inline-fill=""
          style="--darkreader-inline-fill: currentColor"
        ></path>
      </svg>
    </button>
    <p v-if="props.showCount">Count: {{ store.count }}</p>
  </div>
</template>

<style scoped>
/* Add component-specific styles here */
div {
  display: flex;
  column-gap: 5px;
  justify-content: center;
  margin-top: 15px;

  button {
    padding: 3px 5px 1px;
  }
}
</style>
