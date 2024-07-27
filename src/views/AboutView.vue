<template>
  <div class="about">
    <CounterButton />
  </div>
</template>

<script setup lang="ts">
import CounterButton from "@/components/CounterButton.vue"
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
