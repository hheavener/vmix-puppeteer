<template>
  <div class="json-viewer">
    <pre v-html="formattedJson"></pre>
  </div>
</template>

<script setup>
import { computed } from "vue"

// Props to accept the JSON object
const props = defineProps({
  json: {
    type: Object,
    required: true
  }
})

// Convert the JSON object into a formatted string
const formattedJson = computed(() => formatJson(props.json))

// Function to format JSON with color coding
function formatJson(obj) {
  // Convert JSON to a pretty-printed string
  let jsonString = JSON.stringify(obj, null, 2)

  // Apply color coding
  jsonString = jsonString
    ?.replace(/(".*?")(?=\s*:)/g, '<span class="blue">$1</span>') // Keys
    ?.replace(/(:\s*"(.*?)")/g, ': <span class="green">"$2"</span>') // String values
    ?.replace(/(:\s*\[.*?\])/g, ': <span class="red">$1</span>') // Arrays
    ?.replace(/(:\s*\{.*?\})/g, ': <span class="orange">$1</span>') // Objects

  return jsonString
}
</script>

<style scoped>
.json-viewer {
  font-family: monospace;
  white-space: pre-wrap;
  overflow-x: scroll;
  scrollbar-width: none !important;
  height: 100%;
}
.blue {
  color: blue;
}
.green {
  color: green;
}
.red {
  color: red;
}
.orange {
  color: orange;
}
</style>
