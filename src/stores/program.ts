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

// const NamedOperations: Record<string, VmixFunctionCall[]> = {
//   PrepPraiseBand: [
//     { function: "SetDynamicInput2", params: { Value: "Virtual - SOUTH Camera (RS)" } },
//     { function: "SetDynamicValue1", params: { Value: "" } },
//     { function: "SetDynamicValue2", params: { Value: 3 } },
//     { function: "ScriptStart", params: { Value: "UpdatePipSource" } },
//     {
//       function: "ScriptStart",
//       params: { Value: "UpdatePipPosition" },
//       sleep: { amount: 500, unit: "Milliseconds" }
//     }
//   ]
// }

const NamedScenes: Record<string, (...args: any[]) => SceneProps> = {
  PraiseBand: (title: string) => ({
    title: title,
    prepare: [{ title: "[SOUTH] - Musicians" }], // Needs to be declared per scene
    onTransitionIn: [
      { function: "SetDynamicInput2", params: { Value: "Virtual - SOUTH Camera (RS)" } },
      { function: "SetDynamicValue1", params: { Value: "" } },
      { function: "SetDynamicValue2", params: { Value: 3 } },
      { function: "ScriptStart", params: { Value: "UpdatePipSource" } },
      {
        function: "ScriptStart",
        params: { Value: "UpdatePipPosition" },
        sleep: { amount: 500, unit: "Milliseconds" }
      }
    ],
    activeInput: {
      title: "Virtual - PIP Slides",
      layers: [{ index: 3, input: "Virtual - SOUTH Camera (RS)" }]
    },
    alternate: {
      input: { title: "[SOUTH] - Musicians" },
      transition: "Merge"
    },
    transition: { function: "ScriptStart", params: { Value: "AlternateStinger" } }
  })
}

const MockProgram: ProgramProps = {
  vmixPreset: "",
  scenes: [
    {
      title: "Pre-Stream",
      activeInput: { title: "Proclaim - NDI Slides" },
      transition: { function: "ScriptStart", params: { Value: "AlternateStinger" } },
      prepareNextSceneOnTransition: true
    },
    {
      title: "Announcements",
      activeInput: { title: "[REAR] - Center Stage (Speaker)" },
      // prepare: [{ title: "[REAR] - Center Stage (Speaker)" }],
      transition: { function: "ScriptStart", params: { Value: "AlternateStinger" } },
      prepareNextSceneOnTransition: true
    },
    {
      title: "Gathering Music",
      activeInput: { title: "[SOUTH] - Piano" },
      transition: { function: "ScriptStart", params: { Value: "AlternateStinger" } },
      prepareNextSceneOnTransition: true
    },
    {
      title: "Call to Worship",
      activeInput: { title: "[REAR] - Pulpit" },
      alternate: {
        input: {
          title: "Virtual - PIP Slides",
          layers: [{ index: 4, input: "Virtual - REAR Camera (CS)" }]
        },
        transition: "Merge"
      },
      // TODO: Show status popups or handle PIP
      transition: { function: "ScriptStart", params: { Value: "AlternateStinger" } }
      // prepareNextSceneOnTransition: true
    },
    // TODO: Scene titles should be defined separately from scene content so duplicate scenes
    // can have different titles and reference the same content
    NamedScenes.PraiseBand("Worship Music"),
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
          layers: [{ index: 4, input: "Virtual - NORTH Camera (CS)" }]
        },
        transition: "Merge"
      },
      transition: { function: "ScriptStart", params: { Value: "AlternateStinger" } }
    },
    NamedScenes.PraiseBand("Song of Thanksgiving"),
    {
      title: "Pastoral Prayer",
      activeInput: { title: "[REAR] - Center Stage (Full)" },
      prepare: [{ title: "[REAR] - Center Stage (Full)" }],
      transition: { function: "ScriptStart", params: { Value: "AlternateStinger" } }
    },
    NamedScenes.PraiseBand("Offertory"),
    {
      title: "Sermon",
      activeInput: { title: "[NORTH] - Pulpit" },
      onTransitioned: [
        { function: "SetDynamicInput2", params: { Value: "Virtual - NORTH Camera (RS)" } },
        { function: "SetDynamicValue1", params: { Value: "" } },
        { function: "SetDynamicValue2", params: { Value: 4 } },
        { function: "ScriptStart", params: { Value: "UpdatePipSource" } },
        {
          function: "ScriptStart",
          params: { Value: "UpdatePipPosition" },
          sleep: { amount: 500, unit: "Milliseconds" }
        },
        { function: "SelectTitlePreset", params: { Value: "3", Input: "Status Popups" } }
      ],
      // TODO: Actions should be stored separately and referenced from scenes
      actions: [
        {
          label: "Toggle Scripture",
          function: "OverlayInput2",
          params: { Input: "Status Popups" } // TODO: Define dynamic values that user can input through UI
        }
      ],
      alternate: {
        input: {
          title: "Virtual - PIP Slides",
          layers: [{ index: 4, input: "Virtual - NORTH Camera (RS)" }]
        },
        transition: "Merge",
        onTransitionIn: [{ function: "OverlayInput2Out", params: {} }]
      },
      transition: { function: "ScriptStart", params: { Value: "AlternateStinger" } }
    },
    // TODO: Communion
    NamedScenes.PraiseBand("Song of Response"),
    {
      title: "Benediction (Stage)",
      activeInput: { title: "[REAR] - Center Stage (Full)" },
      prepare: [{ title: "[NORTH] - Pulpit" }, { title: "[FRONT] - Benediction" }]
    },
    {
      title: "Benediction (Pulpit)",
      activeInput: { title: "[NORTH] - Pulpit" },
      prepare: [{ title: "[NORTH] - Pulpit" }, { title: "[FRONT] - Benediction" }]
    },
    {
      title: "Benediction (Doors)",
      activeInput: { title: "[FRONT] - Benediction" },
      prepare: [{ title: "[NORTH] - Pulpit" }, { title: "[FRONT] - Benediction" }]
    },
    {
      title: "Stream End",
      activeInput: { title: "Stinger 1 - RED" },
      prepare: [],
      onTransitioned: [
        { function: "SelectTitlePreset", params: { Value: "0", Input: "Status Popups" } },
        {
          function: "OverlayInput2In",
          params: { Input: "Status Popups" },
          sleep: { amount: 10, unit: "Seconds" }
        },
        { function: "OverlayInput2Out", params: {}, sleep: { amount: 3, unit: "Seconds" } },
        { function: "StopStreaming", params: {} }
      ]
    }
  ]
}
