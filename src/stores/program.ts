import { ref, type Ref } from "vue"
import { defineStore } from "pinia"
import type { SceneProps } from "@@/types/api/scene"
import Program from "@/model/class/Program"
import type ScenePlayer from "@/model/class/Scene"

export const useProgramStore = defineStore("program", () => {
  let program: Program
  let vMixPreset: Ref<Object | null> = ref(null)
  let scene: Ref<ScenePlayer | undefined> = ref(undefined)
  let scenes: Ref<SceneProps[] | undefined> = ref([])
  let programLoaded = ref(false)
  let logs: Ref<string[]> = ref([])

  async function loadProgram(): Promise<void> {
    // TODO: load saved program
    scenes.value = MockProgram
    program = new Program(MockProgram, logs.value)
    programLoaded.value = true
  }

  async function next() {
    // console.log("ProgramStore:next::start")
    scene.value = program.GetNextScene() || undefined
    await program.MoveToNextScene()
    // console.log("ProgramStore:next::end")
  }

  async function previous() {
    // console.log("ProgramStore:previous::start")
    scene.value = program.GetPreviousScene() || undefined
    await program.MoveToPreviousScene()
    // console.log("ProgramStore:previous::end")
  }

  async function loadVmixPreset() {
    const { FileDialog } = window
    const p = await FileDialog.getVmixPreset()
    if (p) vMixPreset.value = p
  }

  function clearLogs() {
    logs.value = []
  }

  return {
    vMixPreset,
    programLoaded,
    loadVmixPreset,
    loadProgram,
    next,
    previous,
    scenes,
    scene,
    logs,
    clearLogs
  }
})

const MockProgram: SceneProps[] = [
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
        sleep: { amount: 10, unit: "Seconds" }
      },
      { function: "OverlayInput2Out", params: {}, sleep: { amount: 3, unit: "Seconds" } },
      { function: "StopStreaming", params: {} } // TODO: Move to action?
    ],
    prepare: []
  }
]
