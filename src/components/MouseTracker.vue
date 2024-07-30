<script setup>
import { useMouseStore } from "@/stores/mouse"
const store = useMouseStore()
</script>

<template>
  <div>
    <p>x:{{ store.x }}, y: {{ store.y }} (Pinia Store)</p>
  </div>
</template>
