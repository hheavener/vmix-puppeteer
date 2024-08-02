import type { VmixFunctionCall } from "./VmixFunction"

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
  source: string
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
  source?: NDISource
  /**
   * The PIP information.
   */
  layers?: LayerConfig[]
}

export type PTZInput = {
  /**
   * The NDI source camera.
   */
  source: NDISource
  /**
   * The name of the input containing the
   * position for this camera to move to.
   */
  input: string
}

export type Scene = {
  /**
   * Section heading, really.
   */
  title: string
  /**
   * How smart can we make a chain of scenes?
   * Can it know which inputs to point where
   * based on reading ahead?
   */
  activeInput: Input
  /**
   * Inputs to prepare before next scene.
   */
  prepare: PTZInput[]
  /**
   * Will be skipped if true.
   */
  disabled?: boolean
  /**
   * The input to preview. This will allow us
   * to toggle inputs back/forth for a given
   * scene when there are multiple transitions
   * to/from the same two inputs (such as going
   * from PIP to no PIP for the same camera).
   */
  alternate?: {
    input: Input | string
    /**
     * // TODO: Allow user to configure default transition?
     */
    transition?: VmixTransition
    willTransition?: VmixFunctionCall[]
    onTransitioned?: VmixFunctionCall[]
  }
  /**
   * The transition it should use to move to
   * the next scene in the list.
   */
  transition?: VmixTransition
  /**
   * Actions the user can perform at-will when
   * this scene is live.
   */
  actions?: VmixFunctionCall[]
  /**
   * Called when scene is transitioned.
   */
  onTransitioned?: VmixFunctionCall[]
  /**
   * Called right before transitioning.
   */
  willTransition?: VmixFunctionCall[]
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
}
