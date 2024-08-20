import { ref, type Ref } from "vue"
import { defineStore } from "pinia"
import type { ProgramProps, SceneProps } from "@/model/types/scene"
import Program from "@/model/class/Program"
import type ScenePlayer from "@/model/class/Scene"
import ProgramBuilder from "@/model/class/ProgramBuilder"
import type { VmixFunctionCall } from "@@/types/api/VmixFunction"

export const useProgramStore = defineStore("program", () => {
  let program: Program
  let vMixPreset: Ref<Object | null> = ref(null)
  let scene: Ref<ScenePlayer | undefined> = ref(undefined)
  let nextScene: Ref<ScenePlayer | undefined> = ref(undefined)
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
    nextScene.value = program.GetNextScene()
  }

  async function next() {
    scene.value = program.GetNextScene()
    await program.MoveToNextScene()
    nextScene.value = program.GetNextScene()
  }

  async function previous() {
    scene.value = program.GetPreviousScene()
    await program.MoveToPreviousScene()
    nextScene.value = program.GetNextScene()
  }

  async function jump(sceneIdx: number) {
    scene.value = program.GetScene(sceneIdx)
    await program.MoveToScene(sceneIdx)
    nextScene.value = program.GetNextScene()
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
    nextScene,
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

const NamedOperations: Record<string, VmixFunctionCall[]> = {
  PrepPraiseBand: [
    { function: "SetDynamicInput2", params: { Value: "Virtual - SOUTH Camera (RS)" } },
    { function: "SetDynamicValue1", params: { Value: "" } },
    { function: "SetDynamicValue2", params: { Value: 3 } },
    { function: "ScriptStart", params: { Value: "UpdatePipSource" } },
    {
      function: "ScriptStart",
      params: { Value: "UpdatePipPosition" },
      sleep: { amount: 500, unit: "Milliseconds" }
    }
  ]
}

const NamedScenes: Record<string, SceneProps> = {
  PraiseBand: {
    title: "[Placeholder]",
    activeInput: {
      title: "Virtual - PIP Slides",
      layers: [{ index: 4, source: "Virtual - SOUTH Camera (RS)" }]
    },
    alternate: { input: { title: "[SOUTH] - Musicians" }, transition: "Merge" },
    prepareNext: [], // Needs to be declared per scene
    willTransition: [{ function: "ScriptStart", params: { Value: "AlternateStinger" } }]
  }
}

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
      onTransitioned: NamedOperations.PrepPraiseBand,
      // TODO: Show status popups or handle PIP
      prepareNext: [{ input: "[NORTH] - Lectern" }, { input: "[SOUTH] - Musicians" }],
      willTransition: [{ function: "ScriptStart", params: { Value: "AlternateStinger" } }]
    },
    {
      ...NamedScenes.PraiseBand,
      title: "Worship Music",
      prepareNext: [{ input: "[NORTH] - Lectern" }]
    },
    {
      title: "Liturgy",
      activeInput: { title: "[NORTH] - Lectern" },
      onTransitioned: [
        { function: "SetDynamicInput2", params: { Value: "Virtual - NORTH Camera (CS)" } },
        { function: "SetDynamicValue1", params: { Value: "" } }, // Ensure PIP will be in correct corner
        { function: "SetDynamicValue2", params: { Value: 4 } },
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
      willTransition: [
        ...NamedOperations.PrepPraiseBand,
        { function: "ScriptStart", params: { Value: "AlternateStinger" } }
      ]
    },
    {
      ...NamedScenes.PraiseBand,
      title: "Song of Thanksgiving",
      prepareNext: [{ input: "[REAR] - Center Stage (Full)" }]
    },
    {
      title: "Pastoral Prayer",
      activeInput: { title: "[REAR] - Center Stage (Full)" },
      onTransitioned: NamedOperations.PrepPraiseBand,
      prepareNext: [{ input: "[SOUTH] - Musicians" }],
      willTransition: [{ function: "ScriptStart", params: { Value: "AlternateStinger" } }]
    },
    {
      ...NamedScenes.PraiseBand,
      title: "Offertory",
      prepareNext: [{ input: "[NORTH] - Pulpit" }]
    },
    {
      title: "Sermon",
      activeInput: { title: "[NORTH] - Pulpit" },
      onTransitioned: [
        { function: "SetDynamicInput2", params: { Value: "Virtual - NORTH Camera (RS)" } },
        { function: "SelectTitlePreset", params: { Value: 3, Input: "Status Popups" } }, // Should be scripture
        { function: "SetDynamicValue1", params: { Value: "" } }, // Ensure PIP will be in correct corner
        { function: "SetDynamicValue2", params: { Value: 4 } },
        { function: "ScriptStart", params: { Value: "UpdatePipSource" } },
        { function: "ScriptStart", params: { Value: "UpdatePipPosition" } }
      ],
      actions: [
        {
          label: "Toggle Scripture",
          function: "OverlayInput2In",
          params: { Input: "Status Popups" }
        }
      ],
      alternate: {
        input: {
          title: "Virtual - PIP Slides",
          layers: [{ index: 4, source: "Virtual - NORTH Camera (RS)" }]
        },
        transition: "Merge",
        willTransition: [{ function: "OverlayInput2Out", params: {} }]
      },
      prepareNext: [{ input: "[SOUTH] - Musicians" }],
      willTransition: [
        ...NamedOperations.PrepPraiseBand,
        { function: "ScriptStart", params: { Value: "AlternateStinger" } }
      ]
    },
    // TODO: Communion
    {
      ...NamedScenes.PraiseBand,
      title: "Song of Response",
      // prepareNext: [{ input: "[REAR] - Center Stage (Full)" }, { input: "[FRONT] - Benediction" }],
      prepareNext: [{ input: "[NORTH] - Pulpit" }, { input: "[FRONT] - Benediction" }]
    },
    {
      title: "Benediction",
      // activeInput: { title: "[REAR] - Center Stage (Full)" },
      activeInput: { title: "[NORTH] - Pulpit" },
      prepareNext: [],
      willTransition: [
        { function: "SelectTitlePreset", params: { Value: "0", Input: "Status Popups" } } // Should be "Stream Ended..."
      ]
    },
    {
      title: "Stream End",
      activeInput: { title: "Stinger 1 - RED" },
      onTransitioned: [
        { function: "SelectTitlePreset", params: { Value: "0", Input: "Status Popups" } },
        {
          function: "OverlayInput2In",
          params: { Input: "Status Popups" },
          sleep: { amount: 10, unit: "Seconds" }
        },
        { function: "OverlayInput2Out", params: {}, sleep: { amount: 3, unit: "Seconds" } },
        { function: "StopStreaming", params: {} }
      ],
      prepareNext: []
    }
  ]
}
