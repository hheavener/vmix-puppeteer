type Value = { Value: string }
type Input = { Input: string | number }
type Duration = { Duration: number }
type Channel = { Channel: number }
type None = Record<string, never>

/**
 * List of available functions in vMix 27.
 * @see https://www.vmix.com/help25/index.htm?ShortcutFunctionReference.html
 *
 * @example
 * // Run this script to get all the functions and their params.
 * let functions = $x("//table//td[@width='281']//span[@class='rvts120']")
 * let parameters = $x("//table//td[@width='199']//span[@class='rvts120']")
 *
 * let definitions = functions.reduce((total, curr, idx) => {
 *     const params = parameters[idx].innerText.split(",").join(" & ").replace("\n", "None")
 *     return { ...total, [curr.innerText]: params }
 * }, {});
 *
 * // Copy into editor and replace all `'"'` with `''`
 * console.dir(JSON.stringify(definitions))
 */
export type Functions = {
  ActivatorRefresh: None
  ActiveInput: Input
  AddInput: Value
  AdjustCountdown: Value & Input
  Audio: Input
  AudioAuto: Input
  AudioAutoOff: Input
  AudioAutoOn: Input
  AudioBus: Value & Input
  AudioBusOff: Value & Input
  AudioBusOn: Value & Input
  AudioChannelMatrixApplyPreset: Value & Input
  AudioMixerShowHide: None
  AudioOff: Input
  AudioOn: Input
  AudioPluginOff: Value & Input
  AudioPluginOn: Value & Input
  AudioPluginOnOff: Value & Input
  AudioPluginShow: Value & Input
  AutoPauseOff: Input
  AutoPauseOn: Input
  AutoPlayFirst: Input
  AutoPlayFirstOff: Input
  AutoPlayFirstOn: Input
  AutoPlayNext: Input
  AutoPlayNextOff: Input
  AutoPlayNextOn: Input
  AutoPlayOff: Input
  AutoPlayOn: Input
  AutoRestartOff: Input
  AutoRestartOn: Input
  BrowserBack: Input
  BrowserForward: Input
  BrowserKeyboardDisabled: Input
  BrowserKeyboardEnabled: Input
  BrowserMouseDisabled: Input
  BrowserMouseEnabled: Input
  BrowserNavigate: Value & Input
  BrowserReload: Input
  BusAAudio: None
  BusAAudioOff: None
  BusAAudioOn: None
  BusAAudioPluginOff: Value
  BusAAudioPluginOn: Value
  BusAAudioPluginOnOff: Value
  BusAAudioPluginShow: Value
  BusBAudio: None
  BusBAudioOff: None
  BusBAudioOn: None
  BusBAudioPluginOff: Value
  BusBAudioPluginOn: Value
  BusBAudioPluginOnOff: Value
  BusBAudioPluginShow: Value
  BusXAudio: Value
  BusXAudioOff: Value
  BusXAudioOn: Value
  BusXAudioPluginOff: Value
  BusXAudioPluginOn: Value
  BusXAudioPluginOnOff: Value
  BusXAudioPluginShow: Value
  BusXSendToMaster: Value
  BusXSendToMasterOff: Value
  BusXSendToMasterOn: Value
  BusXSolo: Value
  BusXSoloOff: Value
  BusXSoloOn: Value
  CallManagerShowHide: None
  ChangeCountdown: Value & Input
  ColourCorrectionAuto: Input
  ColourCorrectionReset: Input
  CreateVirtualInput: Input
  CutDirect: Input
  DataSourceAutoNextOff: Value
  DataSourceAutoNextOn: Value
  DataSourceAutoNextOnOff: Value
  DataSourceNextRow: Value
  DataSourcePause: Value
  DataSourcePlay: Value
  DataSourcePlayPause: Value
  DataSourcePreviousRow: Value
  DataSourceSelectRow: Value
  DeinterlaceOff: Input
  DeinterlaceOn: Input
  FadeToBlack: None
  Fullscreen: None
  FullscreenOff: None
  FullscreenOn: None
  InputPreviewHide: Input
  InputPreviewShow: Input
  InputPreviewShowHide: Input
  KeyPress: Value
  LastPreset: None
  LayerOff: Value & Input
  LayerOn: Value & Input
  LayerOnOff: Value & Input
  ListAdd: Value & Input
  ListExport: Value & Input
  ListPlayOut: Input
  ListRemove: Value & Input
  ListRemoveAll: Input
  ListShowHide: Input
  ListShuffle: Input
  LivePlayPause: Input
  LoopOff: Input
  LoopOn: Input
  MarkIn: Input
  MarkOut: Input
  MarkReset: Input
  MarkResetIn: Input
  MarkResetOut: Input
  MasterAudio: None
  MasterAudioOff: None
  MasterAudioOn: None
  MasterAudioPluginOff: Value
  MasterAudioPluginOn: Value
  MasterAudioPluginOnOff: Value
  MasterAudioPluginShow: Value
  MirrorOff: Input
  MirrorOn: Input
  MoveInput: Value & Input
  MoveLayer: Value & Input
  MoveMultiViewOverlay: Value & Input
  MultiViewOverlay: Value & Input
  MultiViewOverlayOff: Value & Input
  MultiViewOverlayOn: Value & Input
  NDICommand: Value & Input
  NDISelectSourceByIndex: Value & Input
  NDISelectSourceByName: Value & Input
  NDIStartRecording: Input
  NDIStopRecording: Input
  NextItem: Input
  NextPicture: Input
  NextPlayListEntry: None
  NextTitlePreset: Input
  OpenPreset: Value
  OverlayInput1: Input
  OverlayInput1In: Input
  OverlayInput1Last: None
  OverlayInput1Off: None
  OverlayInput1Out: None
  OverlayInput1Zoom: None
  OverlayInput2: Input
  OverlayInput2In: Input
  OverlayInput2Last: None
  OverlayInput2Off: None
  OverlayInput2Out: None
  OverlayInput2Zoom: None
  OverlayInput3: Input
  OverlayInput3In: Input
  OverlayInput3Last: None
  OverlayInput3Off: None
  OverlayInput3Out: None
  OverlayInput3Zoom: None
  OverlayInput4: Input
  OverlayInput4In: Input
  OverlayInput4Last: None
  OverlayInput4Off: None
  OverlayInput4Out: None
  OverlayInput4Zoom: None
  OverlayInputAllOff: None
  Pause: Input
  PauseCountdown: Input
  PauseRender: Input
  Play: Input
  PlayPause: Input
  Preset: None
  PreviewInput: Input
  PreviewInputNext: None
  PreviewInputPrevious: None
  PreviewOverlayInput1: Input
  PreviewOverlayInput2: Input
  PreviewOverlayInput3: Input
  PreviewOverlayInput4: Input
  PreviousItem: Input
  PreviousPicture: Input
  PreviousPlayListEntry: None
  PreviousTitlePreset: Input
  PTZCreateVirtualInput: Input
  PTZFocusAuto: Input
  PTZFocusFar: Value & Input
  PTZFocusManual: Input
  PTZFocusNear: Value & Input
  PTZFocusStop: Input
  PTZHome: Input
  PTZMoveDown: Value & Input
  PTZMoveDownLeft: Value & Input
  PTZMoveDownRight: Value & Input
  PTZMoveLeft: Value & Input
  PTZMoveRight: Value & Input
  PTZMoveStop: Input
  PTZMoveToVirtualInputPosition: Input
  PTZMoveToVirtualInputPositionByIndex: Value & Input
  PTZMoveUp: Value & Input
  PTZMoveUpLeft: Value & Input
  PTZMoveUpRight: Value & Input
  PTZUpdateVirtualInput: Input
  PTZZoomIn: Value & Input
  PTZZoomOut: Value & Input
  PTZZoomStop: Input
  QuickPlay: Input
  RemoveInput: Input
  ReplayACamera1: None
  ReplayACamera2: None
  ReplayACamera3: None
  ReplayACamera4: None
  ReplayACamera5: None
  ReplayACamera6: None
  ReplayACamera7: None
  ReplayACamera8: None
  ReplayBCamera1: None
  ReplayBCamera2: None
  ReplayBCamera3: None
  ReplayBCamera4: None
  ReplayBCamera5: None
  ReplayBCamera6: None
  ReplayBCamera7: None
  ReplayBCamera8: None
  ReplayCamera1: None
  ReplayCamera2: None
  ReplayCamera3: None
  ReplayCamera4: None
  ReplayCamera5: None
  ReplayCamera6: None
  ReplayCamera7: None
  ReplayCamera8: None
  ReplayChangeDirection: Channel
  ReplayChangeSpeed: Value & Channel
  ReplayCopyLastEvent: Value
  ReplayCopySelectedEvent: Value
  ReplayDeleteLastEvent: Channel
  ReplayDeleteSelectedEvent: Channel
  ReplayDuplicateLastEvent: Channel
  ReplayDuplicateSelectedEvent: Channel
  ReplayExportLastEvent: Value & Channel
  ReplayFastBackward: Value & Channel
  ReplayFastForward: Value & Channel
  ReplayJumpFrames: Value & Channel
  ReplayJumpFramesFastOff: Channel
  ReplayJumpFramesFastOn: Channel
  ReplayJumpToNow: Channel
  ReplayLastEventCameraOff: Value
  ReplayLastEventCameraOn: Value
  ReplayLastEventSingleCameraOn: Value
  ReplayLive: None
  ReplayLiveToggle: None
  ReplayMarkCancel: None
  ReplayMarkIn: None
  ReplayMarkInLive: None
  ReplayMarkInOut: Value
  ReplayMarkInOutLive: Value
  ReplayMarkInOutRecorded: Value
  ReplayMarkInRecorded: None
  ReplayMarkInRecordedNow: None
  ReplayMarkOut: None
  ReplayMoveLastEvent: Value
  ReplayMoveSelectedEvent: Value
  ReplayMoveSelectedEventDown: None
  ReplayMoveSelectedEventUp: None
  ReplayMoveSelectedInPoint: Value & Channel
  ReplayMoveSelectedOutPoint: Value & Channel
  ReplayPause: Channel
  ReplayPlay: Channel
  ReplayPlayAllEvents: Channel
  ReplayPlayAllEventsToOutput: Channel
  ReplayPlayBackward: Channel
  ReplayPlayEvent: Value & Channel
  ReplayPlayEventsByID: Value & Channel
  ReplayPlayEventsByIDToOutput: Value & Channel
  ReplayPlayEventToOutput: Value & Channel
  ReplayPlayForward: Channel
  ReplayPlayLastEvent: Channel
  ReplayPlayLastEventToOutput: Channel
  ReplayPlayNext: Channel
  ReplayPlayPause: Channel
  ReplayPlayPrevious: Channel
  ReplayPlaySelectedEvent: Channel
  ReplayPlaySelectedEventToOutput: Channel
  ReplayRecorded: None
  ReplaySelectAllEvents: None
  ReplaySelectChannelA: None
  ReplaySelectChannelAB: None
  ReplaySelectChannelB: None
  ReplaySelectedEventCameraOff: Value
  ReplaySelectedEventCameraOn: Value
  ReplaySelectedEventSingleCameraOn: Value
  ReplaySelectEvents1: Channel
  ReplaySelectEvents10: Channel
  ReplaySelectEvents11: Channel
  ReplaySelectEvents12: Channel
  ReplaySelectEvents13: Channel
  ReplaySelectEvents14: Channel
  ReplaySelectEvents15: Channel
  ReplaySelectEvents16: Channel
  ReplaySelectEvents17: Channel
  ReplaySelectEvents18: Channel
  ReplaySelectEvents19: Channel
  ReplaySelectEvents2: Channel
  ReplaySelectEvents20: Channel
  ReplaySelectEvents3: Channel
  ReplaySelectEvents4: Channel
  ReplaySelectEvents5: Channel
  ReplaySelectEvents6: Channel
  ReplaySelectEvents7: Channel
  ReplaySelectEvents8: Channel
  ReplaySelectEvents9: Channel
  ReplaySelectFirstEvent: Channel
  ReplaySelectLastEvent: Channel
  ReplaySelectNextEvent: Channel
  ReplaySelectPreviousEvent: Channel
  ReplaySetAudioSource: Value
  ReplaySetDirectionBackward: Channel
  ReplaySetDirectionForward: Channel
  ReplaySetLastEventText: Value
  ReplaySetLastEventTextCamera: Value
  ReplaySetSelectedEventText: Value
  ReplaySetSelectedEventTextCamera: Value
  ReplaySetSpeed: Value & Channel
  ReplayShowHide: None
  ReplayStartRecording: None
  ReplayStartStopRecording: None
  ReplayStopEvents: Channel
  ReplayStopRecording: None
  ReplaySwapChannels: None
  ReplayToggleLastEventCamera1: None
  ReplayToggleLastEventCamera2: None
  ReplayToggleLastEventCamera3: None
  ReplayToggleLastEventCamera4: None
  ReplayToggleLastEventCamera5: None
  ReplayToggleLastEventCamera6: None
  ReplayToggleLastEventCamera7: None
  ReplayToggleLastEventCamera8: None
  ReplayToggleSelectedEventCamera1: None
  ReplayToggleSelectedEventCamera2: None
  ReplayToggleSelectedEventCamera3: None
  ReplayToggleSelectedEventCamera4: None
  ReplayToggleSelectedEventCamera5: None
  ReplayToggleSelectedEventCamera6: None
  ReplayToggleSelectedEventCamera7: None
  ReplayToggleSelectedEventCamera8: None
  ReplayUpdateSelectedInPoint: Channel
  ReplayUpdateSelectedOutPoint: Channel
  ReplayUpdateSelectedSpeed: Channel
  ReplayUpdateSelectedSpeedDefault: Channel
  ResetInput: Input
  Restart: Input
  ResumeRender: Input
  SavePreset: Value
  SaveVideoDelay: Input & Duration
  ScriptStart: Value
  ScriptStartDynamic: Value
  ScriptStop: Value
  ScriptStopAll: None
  ScriptStopDynamic: None
  SelectCategory: Value
  SelectIndex: Value & Input
  SelectPlayList: Value
  SelectTitlePreset: Value & Input
  SendKeys: Value
  SetAlpha: Value & Input
  SetBalance: Value & Input
  SetBusAVolume: Value
  SetBusBVolume: Value
  SetBusCVolume: Value
  SetBusDVolume: Value
  SetBusEVolume: Value
  SetBusFVolume: Value
  SetBusGVolume: Value
  SetCCGainB: Value & Input
  SetCCGainG: Value & Input
  SetCCGainR: Value & Input
  SetCCGainRGB: Value & Input
  SetCCGammaB: Value & Input
  SetCCGammaG: Value & Input
  SetCCGammaR: Value & Input
  SetCCGammaRGB: Value & Input
  SetCCHue: Value & Input
  SetCCLiftB: Value & Input
  SetCCLiftG: Value & Input
  SetCCLiftR: Value & Input
  SetCCLiftRGB: Value & Input
  SetCCSaturation: Value & Input
  SetColor: Value & Input
  SetCountdown: Value & Input
  SetDynamicInput1: Value
  SetDynamicInput2: Value
  SetDynamicInput3: Value
  SetDynamicInput4: Value
  SetDynamicValue1: Value
  SetDynamicValue2: Value
  SetDynamicValue3: Value
  SetDynamicValue4: Value
  SetFader: Value
  SetGain: Value & Input
  SetGainChannel1: Value & Input
  SetGainChannel2: Value & Input
  SetHeadphonesVolume: Value
  SetImage: Value & Input
  SetImageVisible: Input
  SetImageVisibleOff: Input
  SetImageVisibleOn: Input
  SetInputName: Value & Input
  SetLayer: Value & Input
  SetMasterVolume: Value
  SetMultiViewOverlay: Value & Input
  SetOutput2: Value & Input
  SetOutput3: Value & Input
  SetOutput4: Value & Input
  SetOutputExternal2: Value & Input
  SetOutputFullscreen: Value & Input
  SetOutputFullscreen2: Value & Input
  SetPanX: Value & Input
  SetPanY: Value & Input
  SetPictureEffect: Value & Input
  SetPictureEffectDuration: Value & Input
  SetPictureTransition: Value & Input
  SetPosition: Value & Input
  SetRate: Value & Input
  SetRateSlowMotion: Value & Input
  SetText: Value & Input
  SetTextColour: Value & Input
  SetTextVisible: Input
  SetTextVisibleOff: Input
  SetTextVisibleOn: Input
  SetTickerSpeed: Value & Input
  SetTransitionDuration1: Value
  SetTransitionDuration2: Value
  SetTransitionDuration3: Value
  SetTransitionDuration4: Value
  SetTransitionEffect1: Value
  SetTransitionEffect2: Value
  SetTransitionEffect3: Value
  SetTransitionEffect4: Value
  SetVolume: Value & Input
  SetVolumeChannel1: Value & Input
  SetVolumeChannel2: Value & Input
  SetVolumeChannelMixer: Value & Input
  SetVolumeFade: Value & Input
  SetZoom: Value & Input
  SharpenOff: Input
  SharpenOn: Input
  Snapshot: Value
  SnapshotInput: Value & Input
  Solo: Input
  SoloOff: Input
  SoloOn: Input
  StartCountdown: Input
  StartExternal: None
  StartMultiCorder: None
  StartPlayList: None
  StartRecording: None
  StartSRTOutput: Value
  StartStopExternal: None
  StartStopMultiCorder: None
  StartStopRecording: None
  StartStopSRTOutput: Value
  StartStopStreaming: Value
  StartStreaming: Value
  Stinger1: Input
  Stinger2: Input
  Stinger3: Input
  Stinger4: Input
  StopCountdown: Input
  StopExternal: None
  StopMultiCorder: None
  StopPlayList: None
  StopRecording: None
  StopSRTOutput: Value
  StopStreaming: Value
  StreamingSetKey: Value
  StreamingSetPassword: Value
  StreamingSetURL: Value
  StreamingSetUsername: Value
  SuspendCountdown: Input
  TitleBeginAnimation: Value & Input
  Transition1: None
  Transition2: None
  Transition3: None
  Transition4: None
  VideoCallAudioSource: Value & Input
  VideoCallVideoSource: Value & Input
  VideoDelayStartRecording: Input & Duration
  VideoDelayStartStopRecording: Input & Duration
  VideoDelayStopRecording: Input & Duration
  WaitForCompletion: Input & Duration
  WriteDurationToRecordingLog: Value
}
