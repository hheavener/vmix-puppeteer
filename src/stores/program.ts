import { ref, type Ref } from "vue"
import { defineStore } from "pinia"
import type { ProgramProps, SceneProps } from "@/model/types/scene"
import Program from "@/model/class/Program"
import type ScenePlayer from "@/model/class/Scene"
import ProgramBuilder from "@/model/class/ProgramBuilder"
import type { VmixFunctionCall } from "@@/types/api/VmixFunction"

export const useProgramStore = defineStore("program", () => {
  let program: Program = new Program({} as ProgramProps, null, [])
  let vMixPreset: Ref<Object | null> = ref(null)
  let scene: Ref<ScenePlayer | undefined> = ref(undefined)
  let nextScene: Ref<ScenePlayer | undefined> = ref(undefined)
  let scenes: Ref<ScenePlayer[] | undefined> = ref([])
  let programLoaded = ref(false)
  let logs: Ref<string[]> = ref([])

  async function loadProgram(): Promise<void> {
    // TODO: load saved program
    program = await new ProgramBuilder()
      .From(MockProgram)
      .SetLogDestination(logs.value)
      .Initialize()
    programLoaded.value = true
    scenes.value = program.GetScenes()
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

function PIP(
  camera: string,
  position: "Top Left" | "Top Right" | "Bottom Left" | "Bottom Right",
  sleepMs = 0
): VmixFunctionCall[] {
  const PosMap = {
    "Bottom Left": 1,
    "Top Left": 2,
    "Top Right": 3,
    "Bottom Right": 4
  }
  return [
    { function: "SetDynamicInput2", params: { Value: camera } },
    { function: "SetDynamicValue1", params: { Value: "" } },
    { function: "SetDynamicValue2", params: { Value: PosMap[position] } },
    { function: "ScriptStart", params: { Value: "UpdatePipSource" } },
    {
      function: "ScriptStart",
      params: { Value: "UpdatePipPosition" },
      sleep: { amount: sleepMs, unit: "Milliseconds" }
    }
  ]
}

const NamedScenes: Record<string, (...args: any[]) => SceneProps> = {
  PraiseBand: (title: string) => ({
    title: title,
    prepare: [{ title: "[SOUTH] - Musicians" }], // Needs to be declared per scene
    onTransitionIn: PIP("Virtual - SOUTH Camera (RS)", "Top Right", 500),
    primaryView: {
      title: "Virtual - PIP Slides",
      layers: [{ index: 3, input: "Virtual - SOUTH Camera (RS)" }]
    },
    secondaryView: {
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
      primaryView: { title: "Proclaim - NDI Slides" },
      transition: { function: "ScriptStart", params: { Value: "AlternateStinger" } },
      prepareNextSceneOnTransition: true
    },
    {
      title: "Announcements",
      primaryView: { title: "[REAR] - Center Stage (Speaker)" },
      // prepare: [{ title: "[REAR] - Center Stage (Speaker)" }],
      transition: { function: "ScriptStart", params: { Value: "AlternateStinger" } },
      prepareNextSceneOnTransition: true
    },
    {
      title: "Gathering Music",
      primaryView: { title: "[SOUTH] - Piano" },
      transition: { function: "ScriptStart", params: { Value: "AlternateStinger" } },
      prepareNextSceneOnTransition: true
    },
    {
      title: "Call to Worship",
      primaryView: { title: "[REAR] - Pulpit" },
      onTransitioned: PIP("Virtual - REAR Camera (CS)", "Bottom Right"),
      secondaryView: {
        input: {
          title: "Virtual - PIP Slides",
          layers: [{ index: 4, input: "Virtual - REAR Camera (CS)" }]
        },
        transition: "Merge"
      },
      transition: { function: "ScriptStart", params: { Value: "AlternateStinger" } }
      // prepareNextSceneOnTransition: true
    },
    {
      title: "PRAISE BAND",
      prepare: [{ title: "[SOUTH] - Musicians" }], // Needs to be declared per scene
      onTransitionIn: PIP("Virtual - SOUTH Camera (RS)", "Top Right", 500),
      primaryView: {
        title: "Virtual - PIP Slides",
        layers: [{ index: 3, input: "Virtual - SOUTH Camera (RS)" }]
      },
      secondaryView: {
        input: { title: "[SOUTH] - Musicians" },
        transition: "Merge"
      },
      transition: { function: "ScriptStart", params: { Value: "AlternateStinger" } }
    },
    {
      title: "Liturgy",
      primaryView: { title: "[NORTH] - Lectern" },
      onTransitioned: PIP("Virtual - NORTH Camera (CS)", "Bottom Right"),
      secondaryView: {
        input: {
          title: "Virtual - PIP Slides",
          layers: [{ index: 4, input: "Virtual - NORTH Camera (CS)" }]
        },
        transition: "Merge"
      },
      transition: { function: "ScriptStart", params: { Value: "AlternateStinger" } }
    },
    {
      // prepare: [{ title: "[REAR] - Center Stage (Full)" }],
      title: "Prayer (Stage)",
      primaryView: { title: "[REAR] - Center Stage (Full)" },
      transition: { function: "ScriptStart", params: { Value: "AlternateStinger" } }
    },
    {
      // prepare: [{ title: "[REAR] - Center Stage (Full)" }],
      title: "Prayer (Lectern)",
      primaryView: { title: "[NORTH] - Lectern" },
      transition: { function: "ScriptStart", params: { Value: "AlternateStinger" } }
    },
    {
      // prepare: [{ title: "[REAR] - Center Stage (Full)" }],
      title: "Prayer (Floor)",
      primaryView: { title: "[REAR] - Center Stage (Floor)" },
      transition: { function: "ScriptStart", params: { Value: "AlternateStinger" } }
    },
    {
      title: "Sermon",
      primaryView: { title: "[NORTH] - Pulpit" },
      onTransitioned: [
        ...PIP("Virtual - NORTH Camera (RS)", "Bottom Right", 500),
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
      secondaryView: {
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
    { title: "Benediction (Stage)", primaryView: { title: "[REAR] - Center Stage (Full)" } },
    { title: "Benediction (Pulpit)", primaryView: { title: "[NORTH] - Pulpit" } },
    { title: "Benediction (Doors)", primaryView: { title: "[FRONT] - Benediction" } },
    {
      title: "Stream End",
      primaryView: { title: "Stinger 1 - RED" },
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
