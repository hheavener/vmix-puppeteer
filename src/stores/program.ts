import { ref, type Ref } from "vue"
import { defineStore } from "pinia"
import type { ProgramProps, SceneProps } from "@/model/types/scene"
import Program from "@/model/class/Program"
import type ScenePlayer from "@/model/class/Scene"
import ProgramBuilder from "@/model/class/ProgramBuilder"

export const useProgramStore = defineStore("program", () => {
  let program: Program
  let vMixPreset: Ref<Object | null> = ref(null)
  let scene: Ref<ScenePlayer | undefined> = ref(undefined)
  let scenes: Ref<SceneProps[] | undefined> = ref([])
  let programLoaded = ref(false)
  let logs: Ref<string[]> = ref([])

  async function loadProgram(): Promise<void> {
    // TODO: load saved program
    scenes.value = MockProgram.scenes
    program = await new ProgramBuilder()
      .From(MockProgram)
      .SetLogDestination(logs.value)
      .Initialize()
    programLoaded.value = true
  }

  async function next() {
    scene.value = program.GetNextScene()
    await program.MoveToNextScene()
  }

  async function previous() {
    scene.value = program.GetPreviousScene()
    await program.MoveToPreviousScene()
  }

  async function jump(sceneIdx: number) {
    scene.value = program.GetScene(sceneIdx)
    await program.MoveToScene(sceneIdx)
  }

  async function callAction(actionIdx: number) {
    await scene.value?.CallAction(actionIdx)
  }

  async function loadVmixPreset() {
    const { FileDialog } = window
    const p = await FileDialog.getVmixPreset()
    if (p) vMixPreset.value = p
  }

  function clearLogs() {
    logs.value.length = 0
  }

  return {
    vMixPreset,
    programLoaded,
    loadVmixPreset,
    loadProgram,
    next,
    previous,
    jump,
    callAction,
    scenes,
    scene,
    logs,
    clearLogs
  }
})

const MockProgram: ProgramProps = {
  vmixPreset: "",
  scenes: [
    {
      title: "Pre-Stream",
      activeInput: { title: "Proclaim - NDI Slides" },
      prepareNext: [{ input: "[REAR] - Center Stage (Speaker)" }],
      willTransition: [{ function: "ScriptStart", params: { Value: "AlternateStinger" } }]
    },
    {
      title: "Announcements",
      activeInput: { title: "[REAR] - Center Stage (Speaker)" },
      prepareNext: [{ input: "[SOUTH] - Piano" }],
      willTransition: [{ function: "ScriptStart", params: { Value: "AlternateStinger" } }]
    },
    {
      title: "Gathering Music",
      activeInput: { title: "[SOUTH] - Piano" },
      prepareNext: [{ input: "[REAR] - Pulpit" }],
      willTransition: [{ function: "ScriptStart", params: { Value: "AlternateStinger" } }]
    },
    {
      title: "Call to Worship",
      activeInput: { title: "[REAR] - Pulpit" },
      onTransitioned: [
        { function: "SetDynamicInput2", params: { Value: "Virtual - SOUTH Camera (RS)" } },
        { function: "SetDynamicValue1", params: { Value: "" } }, // Ensure PIP will be in correct corner
        { function: "SetDynamicValue2", params: { Value: "3" } },
        { function: "ScriptStart", params: { Value: "UpdatePipSource" } },
        { function: "ScriptStart", params: { Value: "UpdatePipPosition" } }
      ],
      // TODO: Show status popups or handle PIP
      prepareNext: [{ input: "[NORTH] - Lectern" }, { input: "[SOUTH] - Musicians" }],
      willTransition: [{ function: "ScriptStart", params: { Value: "AlternateStinger" } }]
    },
    {
      title: "Worship Music",
      activeInput: {
        title: "Virtual - PIP Slides",
        // Runner will need to explicitly turn layer on and confirm source is correct
        layers: [{ index: 4, source: "Virtual - SOUTH Camera (CS)" }]
      },
      prepareNext: [{ input: "[NORTH] - Lectern" }],
      willTransition: [{ function: "ScriptStart", params: { Value: "AlternateStinger" } }]
    },
    {
      title: "Confession/Assurance/Etc",
      activeInput: { title: "[NORTH] - Lectern" },
      onTransitioned: [
        { function: "SetDynamicInput2", params: { Value: "Virtual - NORTH Camera (CS)" } },
        { function: "SetDynamicValue1", params: { Value: "" } }, // Ensure PIP will be in correct corner
        { function: "SetDynamicValue2", params: { Value: "4" } },
        { function: "ScriptStart", params: { Value: "UpdatePipSource" } },
        { function: "ScriptStart", params: { Value: "UpdatePipPosition" } }
      ],
      alternate: {
        input: {
          title: "Virtual - PIP Slides",
          layers: [{ index: 4, source: "Virtual - NORTH Camera (CS)" }]
        },
        transition: "Merge"
      },
      prepareNext: [{ input: "[SOUTH] - Musicians" }, { input: "[REAR] - Center Stage (Full)" }],
      willTransition: [{ function: "ScriptStart", params: { Value: "AlternateStinger" } }]
    },
    {
      title: "Pastoral Prayer",
      activeInput: { title: "[REAR] - Center Stage (Full)" },
      onTransitioned: [
        { function: "SetDynamicInput2", params: { Value: "Virtual - SOUTH Camera (RS)" } },
        { function: "SetDynamicValue1", params: { Value: "" } }, // Ensure PIP will be in correct corner
        { function: "SetDynamicValue2", params: { Value: "3" } },
        { function: "ScriptStart", params: { Value: "UpdatePipSource" } }
      ],
      prepareNext: [{ input: "[SOUTH] - Musicians" }],
      willTransition: [{ function: "ScriptStart", params: { Value: "AlternateStinger" } }]
    },
    {
      title: "Song of Thanksgiving",
      activeInput: {
        title: "Virtual - PIP Slides",
        layers: [{ index: 4, source: "Virtual - SOUTH Camera (CS)" }]
      },
      prepareNext: [{ input: "[NORTH] - Pulpit" }],
      willTransition: [{ function: "ScriptStart", params: { Value: "AlternateStinger" } }]
    },
    {
      title: "Sermon",
      activeInput: { title: "[NORTH] - Pulpit" },
      onTransitioned: [
        { function: "SelectTitlePreset", params: { Value: "4", Input: "Status Popups" } }, // Should be scripture
        { function: "SetDynamicValue1", params: { Value: "" } }, // Ensure PIP will be in correct corner
        { function: "SetDynamicValue2", params: { Value: "4" } },
        { function: "ScriptStart", params: { Value: "UpdatePipSource" } }
      ],
      actions: [
        {
          title: "Toggle Scripture",
          function: "OverlayInput2",
          params: { Input: "Status Popups" }
        }
      ],
      alternate: {
        input: {
          title: "Virtual - PIP Slides",
          layers: [{ index: 4, source: "Virtual - NORTH Camera (CS)" }]
        },
        transition: "Merge",
        willTransition: [{ function: "OverlayInput2Off", params: {} }]
      },
      prepareNext: [{ input: "[SOUTH] - Musicians" }],
      willTransition: [{ function: "ScriptStart", params: { Value: "AlternateStinger" } }]
    },
    // TODO: Communion
    {
      title: "Song of Response",
      activeInput: {
        title: "Virtual - PIP Slides",
        layers: [{ index: 4, source: "Virtual - SOUTH Camera (CS)" }]
      },
      prepareNext: [{ input: "[REAR] - Center Stage (Full)" }, { input: "[FRONT] - Benediction" }],
      willTransition: [{ function: "ScriptStart", params: { Value: "AlternateStinger" } }]
    },
    {
      title: "Benediction",
      activeInput: { title: "[REAR] - Center Stage (Full)" },
      prepareNext: [{ input: "[FRONT] - Benediction" }],
      willTransition: [
        // { function: "ScriptStart", params: { Value: "AlternateStinger" } },
        { function: "SelectTitlePreset", params: { Value: "0", Input: "Status Popups" } } // Should be "Stream Ended..."
      ]
    },
    {
      title: "Stream End",
      activeInput: { title: "Stinger 1 - RED" },
      onTransitioned: [
        // { function: "ActiveInput", params: { Input: "Stinger 1 - RED" } },
        { function: "SelectTitlePreset", params: { Value: "0", Input: "Status Popups" } },
        {
          function: "OverlayInput2In",
          params: { Input: "Status Popups" },
          sleep: { amount: 10, unit: "Seconds" }
        },
        { function: "OverlayInput2Out", params: {}, sleep: { amount: 3, unit: "Seconds" } },
        { function: "StopStreaming", params: {} } // TODO: Move to action?
      ],
      prepareNext: []
    }
  ]
}
