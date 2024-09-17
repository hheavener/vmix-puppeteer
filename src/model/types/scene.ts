import type { VmixFunctionCall } from "@@/types/api/VmixFunction"

// TODO: configure these through UI eventually?
const NDISources = ["SOUTH", "REAR", "NORTH", "FRONT"] as const
type NDISource = (typeof NDISources)[number]
type PIPPosition = `${"BOTTOM" | "TOP"}_${"LEFT" | "RIGHT"}`
export const VmixTransitions = [
  // Standard
  "Merge",
  "CrossZoom",
  "Cube",
  "CubeZoom",
  "Fade",
  "Fly",
  "FlyRotate",
  "Zoom",
  "Slide",
  "SlideReverse",
  "VerticalSlide",
  "VerticalSlideReverse",
  "Wipe",
  "WipeReverse",
  "VerticalWipe",
  "VerticalWipeReverse",
  // Custom
  "Stinger1",
  "Stinger2",
  "Stinger3",
  "Stinger4",
  "Transition1",
  "Transition2",
  "Transition3",
  "Transition4"
] as const

export type VmixTransition = (typeof VmixTransitions)[number]

const LayerIndexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const
type LayerIndex = (typeof LayerIndexes)[number]

export type LayerConfig = {
  index: LayerIndex
  /**
   * The input for the PIP.
   * (Be careful, this could create an infinite loop)
   */
  input: string
  /**
   * (Experimental - Proposed)
   * Size scaling for the PIP
   */
  scale?: "sm" | "md" | "lg"
}

export type Input = {
  /**
   * Input title (as according to VMIX XML)
   */
  title: string
  /**
   * The NDI source camera.
   *
   * This will help inform what options are
   * available for staging the next input in
   * a given scene.
   */
  // source?: NDISource
  /**
   * The PIP information.
   */
  layers?: LayerConfig[]
}

export type PTZInput = {
  /**
   * The NDI source camera.
   */
  // source: NDISource
  /**
   * The name of the input containing the
   * position for this camera to move to.
   */
  input: string
}
// TODO: Split between ActionDefinition and ActionReference (with params)
// TODO:
export type Action = {
  label?: string
  params?: Array<{
    name: string
    value: string
  }>
  functions: VmixFunctionCall[]
}

type ActionRef = {
  $ref: string
  params?: Record<string, string>
}

export type SceneProps = {
  /**
   * Section heading, really.
   */
  title: string
  /**
   * The primary view for the scene.
   */
  primaryView: Input
  /**
   * An secondary view for the scene.
   *
   * This allows user to switch views back/forth
   * for a given scene.
   */
  secondaryView?: {
    input: Input
    // prepare: Input[] // Needed?
    /**
     * // TODO: Allow user to configure default transition?
     */
    transition?: VmixTransition
    onTransitionIn?: VmixFunctionCall[]
    onTransitioned?: VmixFunctionCall[]
    onTransitionOut?: VmixFunctionCall[]
  }
  /**
   * Inputs to prepare before next scene.
   */
  prepare?: Input[]
  /**
   * Will be skipped if true.
   */
  disabled?: boolean
  /**
   * The transition to use when transitioning to this scene.
   *
   * Default: `"Merge"`
   */
  transition?: VmixTransition | VmixFunctionCall
  /**
   * Actions the user can perform at-will when
   * this scene is live.
   */
  actions?: Action[]
  /**
   * Called right before scene is transitioned to.
   */
  onTransitionIn?: VmixFunctionCall[]
  /**
   * Called when scene is transitioned.
   */
  onTransitioned?: VmixFunctionCall[]
  /**
   * Called right before transitioning to next scene.
   */
  onTransitionOut?: VmixFunctionCall[]
  /**
   * (Experimental - Proposed)
   * The amount of time this scene should hold
   * before moving to the next one automatically.
   */
  duration?: number
  /**
   * (Experimental - Proposed)
   * The time this scene should start.
   */
  startTime?: Date
  /**
   * (Experimental - Proposed)
   * Automatically prepare the next scene when this one
   * is finished transitioning. Default to `false`.
   */
  prepareNextSceneOnTransition?: boolean
}

export type ProgramProps = {
  vmixPreset: string
  scenes: SceneProps[]
  actions?: Action[]
}
