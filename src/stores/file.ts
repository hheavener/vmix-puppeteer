import { ref } from "vue"
import { defineStore } from "pinia"
import type { Scene } from "@@/types/api/scene"

export const useFileStore = defineStore("file", () => {
  let filePath = ref("")
  let fileContent = ref("")

  async function getFile() {
    const { FileDialog } = window
    try {
      filePath.value = (await FileDialog.getFilePath()) ?? ""
      if (filePath.value) {
        fileContent.value = (await FileDialog.getFileContent(filePath.value, "utf8")) ?? ""
      }
    } catch (err) {
      alert(`Failed to open file:\n\n${err}`)
      console.error("Failed to open file:", err)
    }
  }

  return { filePath, fileContent, getFile }
})

// TODO: Move `prepare` steps to `onTransitioned`?
const Program: Scene[] = [
  {
    title: "Announcements",
    activeInput: { source: "REAR", title: "PTZ - [REAR] - Center Stage (Speaker)" },
    prepare: [{ source: "SOUTH", input: "PTZ - [SOUTH] - Piano" }],
    willTransition: [{ function: "ScriptStart", params: { Value: "AlternateStinger" } }]
  },
  {
    title: "Gathering Music",
    activeInput: { source: "SOUTH", title: "PTZ - [SOUTH] - Piano" },
    prepare: [{ source: "REAR", input: "PTZ - [REAR] - Pulpit" }],
    willTransition: [{ function: "ScriptStart", params: { Value: "AlternateStinger" } }]
  },
  {
    title: "Call to Worship",
    activeInput: { source: "REAR", title: "PTZ - [REAR] - Pulpit" },
    onTransitioned: [
      { function: "SetDynamicInput2", params: { Value: "Virtual - SOUTH Camera (CS)" } },
      { function: "SetDynamicValue1", params: { Value: "" } }, // Ensure PIP will be in correct corner
      { function: "SetDynamicValue2", params: { Value: "4" } },
      { function: "ScriptStart", params: { Value: "UpdatePipSource" } }
    ],
    // TODO: Show status popups or handle PIP
    prepare: [
      { source: "NORTH", input: "PTZ - [NORTH] - Lectern" },
      { source: "SOUTH", input: "PTZ - [SOUTH] - Musicians" }
    ],
    willTransition: [{ function: "ScriptStart", params: { Value: "AlternateStinger" } }]
  },
  {
    title: "Worship Music",
    activeInput: {
      title: "Virtual - PIP Slides",
      // Runner will need to explicitly turn layer on and confirm source is correct
      layers: [{ index: 4, source: "Virtual - SOUTH Camera (CS)" }]
    },
    prepare: [{ source: "NORTH", input: "PTZ - [NORTH] - Lectern" }],
    willTransition: [{ function: "ScriptStart", params: { Value: "AlternateStinger" } }]
  },
  {
    title: "Confession/Assurance/Etc",
    activeInput: { source: "NORTH", title: "PTZ - [NORTH] - Lectern" },
    onTransitioned: [
      { function: "SetDynamicInput2", params: { Value: "Virtual - NORTH Camera (CS)" } },
      { function: "SetDynamicValue1", params: { Value: "" } }, // Ensure PIP will be in correct corner
      { function: "SetDynamicValue2", params: { Value: "4" } },
      { function: "ScriptStart", params: { Value: "UpdatePipSource" } }
    ],
    alternate: {
      input: {
        title: "Virtual - PIP Slides",
        layers: [{ index: 4, source: "Virtual - NORTH Camera (CS)" }]
      },
      transition: "Merge"
    },
    prepare: [
      { source: "SOUTH", input: "PTZ - [SOUTH] - Musicians" },
      { source: "REAR", input: "PTZ - [REAR] - Center Stage (Full)" }
    ],
    willTransition: [{ function: "ScriptStart", params: { Value: "AlternateStinger" } }]
  },
  {
    title: "Pastoral Prayer",
    activeInput: { source: "REAR", title: "PTZ - [REAR] - Center Stage (Full)" },
    onTransitioned: [
      { function: "SetDynamicInput2", params: { Value: "Virtual - SOUTH Camera (CS)" } },
      { function: "SetDynamicValue1", params: { Value: "" } }, // Ensure PIP will be in correct corner
      { function: "SetDynamicValue2", params: { Value: "4" } },
      { function: "ScriptStart", params: { Value: "UpdatePipSource" } }
    ],
    prepare: [{ source: "SOUTH", input: "PTZ - [SOUTH] - Musicians" }],
    willTransition: [{ function: "ScriptStart", params: { Value: "AlternateStinger" } }]
  },
  {
    title: "Song of Thanksgiving",
    activeInput: {
      source: "SOUTH",
      title: "Virtual - PIP Slides",
      layers: [{ index: 4, source: "Virtual - SOUTH Camera (CS)" }]
    },
    prepare: [{ source: "NORTH", input: "PTZ - [NORTH] - Pulpit" }],
    willTransition: [{ function: "ScriptStart", params: { Value: "AlternateStinger" } }]
  },
  {
    title: "Sermon",
    activeInput: { source: "NORTH", title: "PTZ - [NORTH] - Pulpit" },
    onTransitioned: [
      { function: "SelectTitlePreset", params: { Value: "4", Input: "Status Popups" } }, // Should be scripture
      { function: "SetDynamicValue1", params: { Value: "" } }, // Ensure PIP will be in correct corner
      { function: "SetDynamicValue2", params: { Value: "4" } },
      { function: "ScriptStart", params: { Value: "UpdatePipSource" } }
    ],
    actions: [{ function: "OverlayInput2", params: { Input: "Status Popups" } }],
    alternate: {
      input: {
        source: "NORTH",
        title: "Virtual - PIP Slides",
        layers: [{ index: 4, source: "Virtual - NORTH Camera (CS)" }]
      },
      transition: "Merge",
      willTransition: [{ function: "OverlayInput2Off", params: {} }]
    },
    prepare: [{ source: "SOUTH", input: "PTZ - [SOUTH] - Musicians" }],
    willTransition: [{ function: "ScriptStart", params: { Value: "AlternateStinger" } }]
  },
  // TODO: Communion
  {
    title: "Song of Response",
    activeInput: {
      source: "SOUTH",
      title: "Virtual - PIP Slides",
      layers: [{ index: 4, source: "Virtual - SOUTH Camera (CS)" }]
    },
    prepare: [
      { source: "REAR", input: "PTZ - [REAR] - Center Stage (Full)" },
      { source: "FRONT", input: "PTZ - [FRONT] - Benediction" }
    ],
    willTransition: [{ function: "ScriptStart", params: { Value: "AlternateStinger" } }]
  },
  {
    title: "Benediction",
    activeInput: { source: "REAR", title: "PTZ - [REAR] - Center Stage (Full)" },
    prepare: [
      { source: "REAR", input: "PTZ - [REAR] - Center Stage (Full)" },
      { source: "FRONT", input: "PTZ - [FRONT] - Benediction" }
    ],
    willTransition: [
      { function: "ScriptStart", params: { Value: "AlternateStinger" } },
      { function: "SelectTitlePreset", params: { Value: "2", Input: "Status Popups" } } // Should be "Stream Ended..."
    ]
  },
  {
    title: "Stream End",
    activeInput: { source: "REAR", title: "PTZ - [REAR] - Center Stage (Full)" },
    onTransitioned: [
      { function: "ActiveInput", params: { Input: "Stinger 1 - RED" } },
      { function: "SelectTitlePreset", params: { Value: "2", Input: "Status Popups" } },
      {
        function: "OverlayInput2In",
        params: { Input: "Status Popups" },
        sleep: { amount: 10, unit: Time.Seconds }
      },
      { function: "OverlayInput2Out", params: {}, sleep: { amount: 3, unit: Time.Seconds } },
      { function: "StopStreaming", params: {} } // TODO: Move to action?
    ],
    prepare: []
  }
]
