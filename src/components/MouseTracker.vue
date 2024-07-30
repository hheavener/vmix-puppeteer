<script setup>
import { useMouseStore } from "@/stores/mouse"
const store = useMouseStore()
</script>

<template>
  <div>
    <p>x:{{ store.x }}</p>
    <p>y:{{ store.y }}</p>
  </div>
</template>

<style scoped>
div {
  display: grid;
  grid-auto-flow: row;
  justify-items: end;
  gap: 5px;
}
</style>
