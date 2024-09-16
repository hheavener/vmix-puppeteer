<script setup lang="ts">
import type ScenePlayer from "@/model/class/Scene"
import { useProgramStore } from "@/stores/program"
const store = useProgramStore()

const classes = (scene: ScenePlayer) => ({
  active: scene.title === store.scene?.title,
  disabled: scene.disabled
})
</script>

<template>
  <ul class="scene-list">
    <li v-for="(scene, idx) of store.scenes" :key="idx" :disabled="scene.disabled">
      <input
        id="{{ idx }}_{{ toggle }}"
        @click="scene.disabled = !scene.disabled"
        type="checkbox"
        :checked="!scene.disabled"
      />
      <div @click="store.jump(idx)">
        <div :class="classes(scene as ScenePlayer)">
          {{ scene.title }}
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.scene-list {
  list-style: none;
  padding: 10px 20px;
  display: inline-block;

  li {
    display: flex;
    flex-direction: row;
    gap: 10px;

    &[disabled="true"] {
      color: #464646;
    }
  }
  .active {
    color: var(--color-green);
  }
  li:hover {
    cursor: pointer;
    color: var(--color-green-light);
  }
  li[disabled="true"]:hover {
    cursor: default;
  }
}
</style>
