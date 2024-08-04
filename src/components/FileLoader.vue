<script setup>
import { useFileStore } from "@/stores/file"

const store = useFileStore()

const loadVmixFile = async () => {
  const presets = await FileDialog.getVmixPresets()
  console.log(presets)
  // const xmlJson = new VmixPresets(vmixZip).getPresets()
  // const xmlJson = new VmixPresets()
  // console.log({ xmlJson })
}
</script>

<template>
  <div class="btn-wrapper">
    <!-- <button @click="store.getFile">Open File</button> -->
    <button @click="loadVmixFile">Open File</button>
    <!-- Add green background on hover-->
    <code id="filename" v-if="store.filePath"><b>File:</b> {{ store.filePath }}</code>
    <code id="filename" v-else>No file selected</code>
  </div>
  <div class="file">
    <!-- <code v-if="store.fileContent"><b>Content:</b></code> -->
    <div class="container" v-if="store.filePath">
      <code id="filecontent">{{ store.fileContent }}</code>
    </div>
  </div>
</template>

<style scoped>
.btn-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  button {
    border-radius: 5px;
    padding: 5px 10px;
  }
}
.file {
  #filename {
    display: block;
    margin-top: 1em;
  }
  .container {
    border: 1px solid gray;
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    word-wrap: break-word;
  }
}
</style>
