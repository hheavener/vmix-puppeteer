/**
 * List of available functions in vMix 27.
 * @see https://www.vmix.com/help27/ShortcutFunctionReference.html
 *
 * @example
 * // Run this script to get all the functions and their params.
 * let rows = $x("//table/tbody/tr[td//span[@class='rvts118']]")
 * let functions = $x("//table/tbody/tr/td[1]//span[@class='rvts118']")
 * let parameters = $x("//table//td[3]//span[@class='rvts118']")
 * let descriptionNodes = $x("//table/tbody/tr/td[2]")
 *
 * function evaluateXPath(xpath, contextNode) {
 *   const evaluator = new XPathEvaluator();
 *   const result = evaluator.evaluate(xpath, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
 *   const nodes = [];
 *   for (let i = 0; i < result.snapshotLength; i++) nodes.push(result.snapshotItem(i));
 *   return nodes;
 * }
 *
 * function rowToJSON(row) {
 *     let name = evaluateXPath('./td[1]/p/span', row)[0].innerText;
 *     let paramsText = evaluateXPath('./td[3]/p/span', row)[0].innerText;
 *     let description = evaluateXPath('./td[2]/p/span', row)
 *         .map((d) => d.innerText)
 *         .filter((s) => s !== "" && s !== "\n")
 *         .join(" \n")
 *
 *     let params = paramsText.split(',')
 *         .map(param => param.
 *             replace("None","")
 *             .replace("\n", "")
 *             .trim())
 *         .filter(param => param.length > 0)
 *         .reduce((total, curr, idx) => ({
 *             ...total, [curr]: "string"
 *         }), {});
 *
 *     return { name, description, params };
 * }
 *
 * const output = rows
 *     .map((row) => rowToJSON(row))
 *     .sort((a, b) => a.name.localeCompare(b.name))
 *
 * console.log("Functions:", rows.length)
 * console.log(JSON.stringify(output))
 */
export default [
  {
    name: "ActivatorRefresh",
    description: "Refresh all activator device lights and controls",
    params: {}
  },
  {
    name: "ActiveInput",
    description: "Send to Output the selected Input",
    params: { Input: "string" }
  },
  {
    name: "AddInput",
    description:
      "Create a new Input based on information provided in Value. \nVideo|c:\\path\\to\\video.avi \nImage|c:\\path\\to\\image.jpg \nPhotos|c:\\path\\to\\folder \nTitle|c:\\path\\to\\title.gtzip \nVideoList|c:\\path\\to\\playlist.m3u \nColour|HTMLColor \nAudioFile|c:\\path\\to\\audio.wav \nFlash|c:\\path\\to\\flash.swf \nPowerPoint|c:\\path\\to\\powerpoint.pptx \nValue = Type|Filename",
    params: { Value: "string" }
  },
  {
    name: "AdjustCountdown",
    description: "Seconds to add or subtract from current Countdown time \nValue = Seconds",
    params: { Value: "string", Input: "string" }
  },
  { name: "Audio", description: "Toggle Audio Mute On/Off", params: { Input: "string" } },
  { name: "AudioAuto", description: "", params: { Input: "string" } },
  { name: "AudioAutoOff", description: "", params: { Input: "string" } },
  { name: "AudioAutoOn", description: "", params: { Input: "string" } },
  {
    name: "AudioBus",
    description: "M,A,B,C,D,E,F,G \nValue = Bus",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "AudioBusOff",
    description: "M,A,B,C,D,E,F,G \nValue = Bus",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "AudioBusOn",
    description: "M,A,B,C,D,E,F,G \nValue = Bus",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "AudioChannelMatrixApplyPreset",
    description: "Apply preset to channel matrix \nValue = Preset Name",
    params: { Value: "string", Input: "string" }
  },
  { name: "AudioMixerShowHide", description: "", params: {} },
  { name: "AudioOff", description: "", params: { Input: "string" } },
  { name: "AudioOn", description: "", params: { Input: "string" } },
  {
    name: "AudioPluginOff",
    description: "Turn off Audio Plugin, starting from 1 \nValue = Plugin Number",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "AudioPluginOn",
    description: "Turn on Audio Plugin, starting from 1 \nValue = Plugin Number",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "AudioPluginOnOff",
    description: "Toggle on/off Audio Plugin, starting from 1 \nValue = Plugin Number",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "AudioPluginShow",
    description: "Show Audio Plugin Editor, starting from 1 \nValue = Plugin Number",
    params: { Value: "string", Input: "string" }
  },
  { name: "AutoPauseOff", description: "", params: { Input: "string" } },
  { name: "AutoPauseOn", description: "", params: { Input: "string" } },
  {
    name: "AutoPlayFirst",
    description: "Toggle automatically playing first item in a List with Transition",
    params: { Input: "string" }
  },
  {
    name: "AutoPlayFirstOff",
    description: "Turn Off automatically playing first item in a List with Transition",
    params: { Input: "string" }
  },
  {
    name: "AutoPlayFirstOn",
    description: "Turn On automatically playing first item in a List with Transition",
    params: { Input: "string" }
  },
  {
    name: "AutoPlayNext",
    description: "Toggle automatically playing next item in a List",
    params: { Input: "string" }
  },
  {
    name: "AutoPlayNextOff",
    description: "Turn Off automatically playing next item in a List",
    params: { Input: "string" }
  },
  {
    name: "AutoPlayNextOn",
    description: "Turn On automatically playing next item in a List",
    params: { Input: "string" }
  },
  { name: "AutoPlayOff", description: "", params: { Input: "string" } },
  { name: "AutoPlayOn", description: "", params: { Input: "string" } },
  { name: "AutoRestartOff", description: "", params: { Input: "string" } },
  { name: "AutoRestartOn", description: "", params: { Input: "string" } },
  { name: "BrowserBack", description: "", params: { Input: "string" } },
  { name: "BrowserForward", description: "", params: { Input: "string" } },
  { name: "BrowserKeyboardDisabled", description: "", params: { Input: "string" } },
  { name: "BrowserKeyboardEnabled", description: "", params: { Input: "string" } },
  { name: "BrowserMouseDisabled", description: "", params: { Input: "string" } },
  { name: "BrowserMouseEnabled", description: "", params: { Input: "string" } },
  {
    name: "BrowserNavigate",
    description: "URL \nValue = URL",
    params: { Value: "string", Input: "string" }
  },
  { name: "BrowserReload", description: "", params: { Input: "string" } },
  { name: "BusAAudio", description: "", params: {} },
  { name: "BusAAudioOff", description: "", params: {} },
  { name: "BusAAudioOn", description: "", params: {} },
  {
    name: "BusAAudioPluginOff",
    description: "Turn off Audio Plugin, starting from 1 \nValue = Plugin Number",
    params: { Value: "string" }
  },
  {
    name: "BusAAudioPluginOn",
    description: "Turn on Audio Plugin, starting from 1 \nValue = Plugin Number",
    params: { Value: "string" }
  },
  {
    name: "BusAAudioPluginOnOff",
    description: "Toggle on/off Audio Plugin, starting from 1 \nValue = Plugin Number",
    params: { Value: "string" }
  },
  {
    name: "BusAAudioPluginShow",
    description: "Show Audio Plugin Editor, starting from 1 \nValue = Plugin Number",
    params: { Value: "string" }
  },
  { name: "BusBAudio", description: "", params: {} },
  { name: "BusBAudioOff", description: "", params: {} },
  { name: "BusBAudioOn", description: "", params: {} },
  {
    name: "BusBAudioPluginOff",
    description: "Turn off Audio Plugin, starting from 1 \nValue = Plugin Number",
    params: { Value: "string" }
  },
  {
    name: "BusBAudioPluginOn",
    description: "Turn on Audio Plugin, starting from 1 \nValue = Plugin Number",
    params: { Value: "string" }
  },
  {
    name: "BusBAudioPluginOnOff",
    description: "Toggle on/off Audio Plugin, starting from 1 \nValue = Plugin Number",
    params: { Value: "string" }
  },
  {
    name: "BusBAudioPluginShow",
    description: "Show Audio Plugin Editor, starting from 1 \nValue = Plugin Number",
    params: { Value: "string" }
  },
  { name: "BusXAudio", description: "M,A,B,C,D,E,F,G \nValue = Bus", params: { Value: "string" } },
  {
    name: "BusXAudioOff",
    description: "M,A,B,C,D,E,F,G \nValue = Bus",
    params: { Value: "string" }
  },
  {
    name: "BusXAudioOn",
    description: "M,A,B,C,D,E,F,G \nValue = Bus",
    params: { Value: "string" }
  },
  {
    name: "BusXAudioPluginOff",
    description: "Turn off Audio Plugin, starting from 1 \nValue = Bus,PluginNumber",
    params: { Value: "string" }
  },
  {
    name: "BusXAudioPluginOn",
    description: "Turn on Audio Plugin, starting from 1 \nValue = Bus,PluginNumber",
    params: { Value: "string" }
  },
  {
    name: "BusXAudioPluginOnOff",
    description: "Toggle on/off Audio Plugin, starting from 1 \nValue = Bus,PluginNumber",
    params: { Value: "string" }
  },
  {
    name: "BusXAudioPluginShow",
    description: "Show Audio Plugin Editor, starting from 1 \nValue = Bus,PluginNumber",
    params: { Value: "string" }
  },
  {
    name: "BusXSendToMaster",
    description: "M,A,B,C,D,E,F,G \nValue = Bus",
    params: { Value: "string" }
  },
  {
    name: "BusXSendToMasterOff",
    description: "M,A,B,C,D,E,F,G \nValue = Bus",
    params: { Value: "string" }
  },
  {
    name: "BusXSendToMasterOn",
    description: "M,A,B,C,D,E,F,G \nValue = Bus",
    params: { Value: "string" }
  },
  { name: "BusXSolo", description: "M,A,B,C,D,E,F,G \nValue = Bus", params: { Value: "string" } },
  {
    name: "BusXSoloOff",
    description: "M,A,B,C,D,E,F,G \nValue = Bus",
    params: { Value: "string" }
  },
  { name: "BusXSoloOn", description: "M,A,B,C,D,E,F,G \nValue = Bus", params: { Value: "string" } },
  { name: "CallManagerShowHide", description: "", params: {} },
  {
    name: "ChangeCountdown",
    description:
      "Change countdown time according to Value as hh:mm:ss (00:00:00) \nValue = Time 00:00:00",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "ColourCorrectionAuto",
    description: "Basic Auto Colour Correction.",
    params: { Input: "string" }
  },
  {
    name: "ColourCorrectionReset",
    description: "Reset Colour Correction to Default Values.",
    params: { Input: "string" }
  },
  {
    name: "CreateVirtualInput",
    description: "Create a new Virtual Input from the specified Input.",
    params: { Input: "string" }
  },
  {
    name: "CutDirect",
    description: "Cuts the input directly to Output without changing Preview",
    params: { Input: "string" }
  },
  {
    name: "DataSourceAutoNextOff",
    description:
      "Name of the Data Source, Table Name (optional) eg 'Excel/CSV,Sheet1' \nValue = Name,Table",
    params: { Value: "string" }
  },
  {
    name: "DataSourceAutoNextOn",
    description:
      "Name of the Data Source, Table Name (optional) eg 'Excel/CSV,Sheet1' \nValue = Name,Table",
    params: { Value: "string" }
  },
  {
    name: "DataSourceAutoNextOnOff",
    description:
      "Name of the Data Source, Table Name (optional) eg 'Excel/CSV,Sheet1' \nValue = Name,Table",
    params: { Value: "string" }
  },
  {
    name: "DataSourceNextRow",
    description:
      "Name of the Data Source and Table Name (optional) eg 'Excel/CSV,Sheet1' \nValue = Name,Table",
    params: { Value: "string" }
  },
  {
    name: "DataSourcePause",
    description: "Name of Data Source eg 'Excel/CSV' \nValue = Name",
    params: { Value: "string" }
  },
  {
    name: "DataSourcePlay",
    description: "Name of Data Source eg 'Excel/CSV' \nValue = Name",
    params: { Value: "string" }
  },
  {
    name: "DataSourcePlayPause",
    description: "Name of Data Source eg 'Excel/CSV' \nValue = Name",
    params: { Value: "string" }
  },
  {
    name: "DataSourcePreviousRow",
    description:
      "Name of the Data Source and Table Name (optional) eg 'Excel/CSV,Sheet1' \nValue = Name,Table",
    params: { Value: "string" }
  },
  {
    name: "DataSourceSelectRow",
    description:
      "Name of the Data Source, Table Name (optional) and Row Index starting from 0 eg 'Excel/CSV,Sheet1,5' \nValue = Name,Table,Index",
    params: { Value: "string" }
  },
  { name: "DeinterlaceOff", description: "", params: { Input: "string" } },
  { name: "DeinterlaceOn", description: "", params: { Input: "string" } },
  { name: "Effect1", description: "Toggle Effect 1 On/Off", params: { Input: "string" } },
  { name: "Effect1Off", description: "Turn Effect 1 Off", params: { Input: "string" } },
  { name: "Effect1On", description: "Turn Effect 1 On", params: { Input: "string" } },
  { name: "Effect2", description: "Toggle Effect 2 On/Off", params: { Input: "string" } },
  { name: "Effect2Off", description: "Turn Effect 2 Off", params: { Input: "string" } },
  { name: "Effect2On", description: "Turn Effect 2 On", params: { Input: "string" } },
  { name: "Effect3", description: "Toggle Effect 3 On/Off", params: { Input: "string" } },
  { name: "Effect3Off", description: "Turn Effect 3 Off", params: { Input: "string" } },
  { name: "Effect3On", description: "Turn Effect 3 On", params: { Input: "string" } },
  { name: "Effect4", description: "Toggle Effect 4 On/Off", params: { Input: "string" } },
  { name: "Effect4Off", description: "Turn Effect 4 Off", params: { Input: "string" } },
  { name: "Effect4On", description: "Turn Effect 4 On", params: { Input: "string" } },
  { name: "FadeToBlack", description: "Toggle FTB On/Off", params: {} },
  { name: "Fullscreen", description: "Toggles Fullscreen On or Off", params: {} },
  { name: "FullscreenOff", description: "", params: {} },
  { name: "FullscreenOn", description: "", params: {} },
  {
    name: "InputPreviewHide",
    description: "Hides large preview of input",
    params: { Input: "string" }
  },
  {
    name: "InputPreviewShow",
    description: "Shows large preview of input",
    params: { Input: "string" }
  },
  {
    name: "InputPreviewShowHide",
    description: "Toggles large preview of input",
    params: { Input: "string" }
  },
  { name: "KeyPress", description: "Value = Key", params: { Value: "string" } },
  { name: "LastPreset", description: "Load the last preset.", params: {} },
  {
    name: "LayerOff",
    description: "Turn Off Layer For Input At Index (starting from 1) \nValue = Index",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "LayerOn",
    description: "Turn On Layer For Input At Index (starting from 1) \nValue = Index",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "LayerOnOff",
    description: "Toggle On/Off Layer For Input At Index (starting from 1) \nValue = Index",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "ListAdd",
    description: "Add Filename to List \nValue = Filename",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "ListExport",
    description: "Export List as M3U to Filename \nValue = Filename",
    params: { Value: "string", Input: "string" }
  },
  { name: "ListPlayOut", description: "", params: { Input: "string" } },
  {
    name: "ListRemove",
    description: "Remove from List by Index starting from 1 \nValue = Index",
    params: { Value: "string", Input: "string" }
  },
  { name: "ListRemoveAll", description: "Remove all items from List", params: { Input: "string" } },
  { name: "ListShowHide", description: "", params: { Input: "string" } },
  { name: "ListShuffle", description: "Shuffle (randomize) List", params: { Input: "string" } },
  { name: "LivePlayPause", description: "", params: { Input: "string" } },
  { name: "Loop", description: "Toggle Loop on Input", params: { Input: "string" } },
  { name: "LoopOff", description: "", params: { Input: "string" } },
  { name: "LoopOn", description: "", params: { Input: "string" } },
  { name: "MarkIn", description: "", params: { Input: "string" } },
  { name: "MarkOut", description: "", params: { Input: "string" } },
  { name: "MarkReset", description: "", params: { Input: "string" } },
  { name: "MarkResetIn", description: "", params: { Input: "string" } },
  { name: "MarkResetOut", description: "", params: { Input: "string" } },
  { name: "MasterAudio", description: "", params: {} },
  { name: "MasterAudioOff", description: "", params: {} },
  { name: "MasterAudioOn", description: "", params: {} },
  {
    name: "MasterAudioPluginOff",
    description: "Turn off Audio Plugin, starting from 1 \nValue = Plugin Number",
    params: { Value: "string" }
  },
  {
    name: "MasterAudioPluginOn",
    description: "Turn on Audio Plugin, starting from 1 \nValue = Plugin Number",
    params: { Value: "string" }
  },
  {
    name: "MasterAudioPluginOnOff",
    description: "Toggle on/off Audio Plugin, starting from 1 \nValue = Plugin Number",
    params: { Value: "string" }
  },
  {
    name: "MasterAudioPluginShow",
    description: "Show Audio Plugin Editor, starting from 1 \nValue = Plugin Number",
    params: { Value: "string" }
  },
  { name: "MirrorOff", description: "", params: { Input: "string" } },
  { name: "MirrorOn", description: "", params: { Input: "string" } },
  {
    name: "MoveInput",
    description: "Value = Number",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "MoveLayer",
    description:
      "Move Layer in Input according to Value parameter. \nExample: 1,2 moves Layer1 to Layer2 \nValue = FromIndex,ToIndex",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "MoveMultiViewOverlay",
    description:
      "Move Overlay in Input MultiView according to Value parameter. \nExample: 1,2 moves Overlay1 to Overlay2 \nValue = FromIndex,ToIndex",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "MultiViewOverlay",
    description:
      "Toggle On/Off MultiView Overlay For Input At Index (starting from 1) \nValue = Index",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "MultiViewOverlayOff",
    description: "Turn Off MultiView Overlay For Input At Index (starting from 1) \nValue = Index",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "MultiViewOverlayOn",
    description: "Turn On MultiView Overlay For Input At Index (starting from 1) \nValue = Index",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "NDICommand",
    description: "Send specified command to NDI source \nValue = Command",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "NDISelectSourceByIndex",
    description: "Value = Index 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "NDISelectSourceByName",
    description: "Value = Name",
    params: { Value: "string", Input: "string" }
  },
  { name: "NDIStartRecording", description: "", params: { Input: "string" } },
  { name: "NDIStopRecording", description: "", params: { Input: "string" } },
  { name: "NextItem", description: "Move to next item in List", params: { Input: "string" } },
  {
    name: "NextPicture",
    description: "Move to Next Picture for Photo and PowerPoint Inputs",
    params: { Input: "string" }
  },
  { name: "NextPlayListEntry", description: "Move to Next Item in a running PlayList", params: {} },
  { name: "NextTitlePreset", description: "", params: { Input: "string" } },
  {
    name: "OpenPreset",
    description: "Load preset from the specified Filename. \nValue = Filename",
    params: { Value: "string" }
  },
  {
    name: "OverlayInput1",
    description: "Toggle Overlay1 On/Off with selected Input using configured Transition",
    params: { Input: "string" }
  },
  {
    name: "OverlayInput1In",
    description: "Transition Out to Overlay1 with selected Input",
    params: { Input: "string" }
  },
  {
    name: "OverlayInput1Last",
    description: "Toggle Overlay1 On/Off with last used Input on this channel",
    params: {}
  },
  { name: "OverlayInput1Off", description: "Immediately switch Overlay1 Off (Cut)", params: {} },
  { name: "OverlayInput1Out", description: "Transition Out Overlay1", params: {} },
  {
    name: "OverlayInput1Zoom",
    description: "Zooms PIP Overlay to fill Fullscreen and vice versa",
    params: {}
  },
  { name: "OverlayInput2", description: "", params: { Input: "string" } },
  { name: "OverlayInput2In", description: "", params: { Input: "string" } },
  {
    name: "OverlayInput2Last",
    description: "Toggle Overlay2 On/Off with last used Input on this channel",
    params: {}
  },
  { name: "OverlayInput2Off", description: "", params: {} },
  { name: "OverlayInput2Out", description: "", params: {} },
  { name: "OverlayInput2Zoom", description: "", params: {} },
  { name: "OverlayInput3", description: "", params: { Input: "string" } },
  { name: "OverlayInput3In", description: "", params: { Input: "string" } },
  {
    name: "OverlayInput3Last",
    description: "Toggle Overlay3 On/Off with last used Input on this channel",
    params: {}
  },
  { name: "OverlayInput3Off", description: "", params: {} },
  { name: "OverlayInput3Out", description: "", params: {} },
  { name: "OverlayInput3Zoom", description: "", params: {} },
  { name: "OverlayInput4", description: "", params: { Input: "string" } },
  { name: "OverlayInput4In", description: "", params: { Input: "string" } },
  {
    name: "OverlayInput4Last",
    description: "Toggle Overlay4 On/Off with last used Input on this channel",
    params: {}
  },
  { name: "OverlayInput4Off", description: "", params: {} },
  { name: "OverlayInput4Out", description: "", params: {} },
  { name: "OverlayInput4Zoom", description: "", params: {} },
  { name: "OverlayInputAllOff", description: "Immediately switch all Overlays Off", params: {} },
  { name: "Pause", description: "", params: { Input: "string" } },
  {
    name: "PauseCountdown",
    description: "Pause or Resume Countdown or if complete, Start from beginning.",
    params: { Input: "string" }
  },
  {
    name: "PauseRender",
    description: "Freeze Title Input while making multiple updates",
    params: { Input: "string" }
  },
  { name: "Play", description: "", params: { Input: "string" } },
  { name: "PlayPause", description: "", params: { Input: "string" } },
  {
    name: "PreviewInput",
    description: "Send to Preview the selected Input",
    params: { Input: "string" }
  },
  { name: "PreviewInputNext", description: "Send to Preview the next Input", params: {} },
  { name: "PreviewInputPrevious", description: "Send to Preview the previous Input", params: {} },
  {
    name: "PreviewOverlayInput1",
    description: "Preview Overlay1 using the selected Input",
    params: { Input: "string" }
  },
  { name: "PreviewOverlayInput2", description: "", params: { Input: "string" } },
  { name: "PreviewOverlayInput3", description: "", params: { Input: "string" } },
  { name: "PreviewOverlayInput4", description: "", params: { Input: "string" } },
  {
    name: "PreviousItem",
    description: "Move to previous item in List",
    params: { Input: "string" }
  },
  {
    name: "PreviousPicture",
    description: "Move to Previous Picture for Photo and PowerPoint Inputs",
    params: { Input: "string" }
  },
  {
    name: "PreviousPlayListEntry",
    description: "Move to Previous Item in a running PlayList",
    params: {}
  },
  { name: "PreviousTitlePreset", description: "", params: { Input: "string" } },
  {
    name: "PTZCreateVirtualInput",
    description: "Creates a PTZ Virtual Input with the current Position",
    params: { Input: "string" }
  },
  { name: "PTZFocusAuto", description: "", params: { Input: "string" } },
  {
    name: "PTZFocusFar",
    description: "Value = Speed 0-1",
    params: { Value: "string", Input: "string" }
  },
  { name: "PTZFocusManual", description: "", params: { Input: "string" } },
  {
    name: "PTZFocusNear",
    description: "Value = Speed 0-1",
    params: { Value: "string", Input: "string" }
  },
  { name: "PTZFocusStop", description: "", params: { Input: "string" } },
  { name: "PTZHome", description: "", params: { Input: "string" } },
  {
    name: "PTZMoveDown",
    description: "Value = Speed 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "PTZMoveDownLeft",
    description: "Value = Speed 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "PTZMoveDownRight",
    description: "Value = Speed 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "PTZMoveLeft",
    description: "Value = Speed 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "PTZMoveRight",
    description: "Value = Speed 0-1",
    params: { Value: "string", Input: "string" }
  },
  { name: "PTZMoveStop", description: "Stop all PTZ movement", params: { Input: "string" } },
  {
    name: "PTZMoveToVirtualInputPosition",
    description: "Moves to the Position of the PTZ Virtual Input without selecting it into Preview",
    params: { Input: "string" }
  },
  {
    name: "PTZMoveToVirtualInputPositionByIndex",
    description:
      "Moves to the Position of the PTZ Virtual Input associated with this Input. Index is first Input found starting from 0 \nValue = Index 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "PTZMoveUp",
    description: "Value = Speed 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "PTZMoveUpLeft",
    description: "Value = Speed 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "PTZMoveUpRight",
    description: "Value = Speed 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "PTZUpdateVirtualInput",
    description: "Updates selected PTZ Virtual Input with current Position",
    params: { Input: "string" }
  },
  {
    name: "PTZZoomIn",
    description: "Value = Speed 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "PTZZoomOut",
    description: "Value = Speed 0-1",
    params: { Value: "string", Input: "string" }
  },
  { name: "PTZZoomStop", description: "", params: { Input: "string" } },
  { name: "QuickPlay", description: "", params: { Input: "string" } },
  { name: "RemoveInput", description: "", params: { Input: "string" } },
  { name: "ReplayACamera1", description: "", params: {} },
  { name: "ReplayACamera2", description: "", params: {} },
  { name: "ReplayACamera3", description: "", params: {} },
  { name: "ReplayACamera4", description: "", params: {} },
  { name: "ReplayACamera5", description: "", params: {} },
  { name: "ReplayACamera6", description: "", params: {} },
  { name: "ReplayACamera7", description: "", params: {} },
  { name: "ReplayACamera8", description: "", params: {} },
  { name: "ReplayBCamera1", description: "", params: {} },
  { name: "ReplayBCamera2", description: "", params: {} },
  { name: "ReplayBCamera3", description: "", params: {} },
  { name: "ReplayBCamera4", description: "", params: {} },
  { name: "ReplayBCamera5", description: "", params: {} },
  { name: "ReplayBCamera6", description: "", params: {} },
  { name: "ReplayBCamera7", description: "", params: {} },
  { name: "ReplayBCamera8", description: "", params: {} },
  { name: "ReplayCamera1", description: "", params: {} },
  { name: "ReplayCamera2", description: "", params: {} },
  { name: "ReplayCamera3", description: "", params: {} },
  { name: "ReplayCamera4", description: "", params: {} },
  { name: "ReplayCamera5", description: "", params: {} },
  { name: "ReplayCamera6", description: "", params: {} },
  { name: "ReplayCamera7", description: "", params: {} },
  { name: "ReplayCamera8", description: "", params: {} },
  { name: "ReplayChangeDirection", description: "", params: { Channel: "string" } },
  {
    name: "ReplayChangeSpeed",
    description: "Value = Speed",
    params: { Value: "string", Channel: "string" }
  },
  {
    name: "ReplayCopyLastEvent",
    description: "Value = Event List 0-19",
    params: { Value: "string" }
  },
  {
    name: "ReplayCopySelectedEvent",
    description: "Value = Event List 0-19",
    params: { Value: "string" }
  },
  { name: "ReplayDeleteLastEvent", description: "", params: { Channel: "string" } },
  { name: "ReplayDeleteSelectedEvent", description: "", params: { Channel: "string" } },
  { name: "ReplayDuplicateLastEvent", description: "", params: { Channel: "string" } },
  { name: "ReplayDuplicateSelectedEvent", description: "", params: { Channel: "string" } },
  {
    name: "ReplayExportLastEvent",
    description: "Value = Folder",
    params: { Value: "string", Channel: "string" }
  },
  {
    name: "ReplayFastBackward",
    description: "1-30x \nValue = Speed",
    params: { Value: "string", Channel: "string" }
  },
  {
    name: "ReplayFastForward",
    description: "1-30x \nValue = Speed",
    params: { Value: "string", Channel: "string" }
  },
  {
    name: "ReplayJumpFrames",
    description: "Value = Frames",
    params: { Value: "string", Channel: "string" }
  },
  {
    name: "ReplayJumpFramesFastOff",
    description: "ReplayJumpFrames jumps 1 frame for each value instead of 1 second.",
    params: { Channel: "string" }
  },
  {
    name: "ReplayJumpFramesFastOn",
    description: "ReplayJumpFrames jumps 1 second for each value instead of 1 frame.",
    params: { Channel: "string" }
  },
  { name: "ReplayJumpToNow", description: "", params: { Channel: "string" } },
  {
    name: "ReplayLastEventCameraOff",
    description: "Turns off the specified camera angle (1-8) \nValue = Camera",
    params: { Value: "string" }
  },
  {
    name: "ReplayLastEventCameraOn",
    description: "Turns on the specified camera angle (1-8) \nValue = Camera",
    params: { Value: "string" }
  },
  {
    name: "ReplayLastEventSingleCameraOn",
    description: "Turns on only the specified camera angle (1-8) \nValue = Camera",
    params: { Value: "string" }
  },
  { name: "ReplayLive", description: "", params: {} },
  { name: "ReplayLiveToggle", description: "", params: {} },
  { name: "ReplayMarkCancel", description: "", params: {} },
  { name: "ReplayMarkIn", description: "", params: {} },
  { name: "ReplayMarkInLive", description: "", params: {} },
  {
    name: "ReplayMarkInOut",
    description: "Number of previous seconds to use when creating a new event. \nValue = Seconds",
    params: { Value: "string" }
  },
  {
    name: "ReplayMarkInOutLive",
    description: "Number of previous seconds to use when creating a new event. \nValue = Seconds",
    params: { Value: "string" }
  },
  {
    name: "ReplayMarkInOutLiveFuture",
    description:
      "Number of seconds into the future to use when creating a new event. \nValue = Seconds",
    params: { Value: "string" }
  },
  {
    name: "ReplayMarkInOutRecorded",
    description: "Number of previous seconds to use when creating a new event. \nValue = Seconds",
    params: { Value: "string" }
  },
  { name: "ReplayMarkInRecorded", description: "", params: {} },
  { name: "ReplayMarkInRecordedNow", description: "", params: {} },
  { name: "ReplayMarkOut", description: "", params: {} },
  {
    name: "ReplayMoveLastEvent",
    description: "Value = Event List 0-19",
    params: { Value: "string" }
  },
  {
    name: "ReplayMoveSelectedEvent",
    description: "Value = Event List 0-19",
    params: { Value: "string" }
  },
  { name: "ReplayMoveSelectedEventDown", description: "", params: {} },
  { name: "ReplayMoveSelectedEventUp", description: "", params: {} },
  {
    name: "ReplayMoveSelectedInPoint",
    description: "Value = Frames",
    params: { Value: "string", Channel: "string" }
  },
  {
    name: "ReplayMoveSelectedOutPoint",
    description: "Value = Frames",
    params: { Value: "string", Channel: "string" }
  },
  { name: "ReplayPause", description: "", params: { Channel: "string" } },
  { name: "ReplayPlay", description: "", params: { Channel: "string" } },
  {
    name: "ReplayPlayAllEvents",
    description: "Play all Events in active list",
    params: { Channel: "string" }
  },
  {
    name: "ReplayPlayAllEventsToOutput",
    description: "Play all Events in active list",
    params: { Channel: "string" }
  },
  { name: "ReplayPlayBackward", description: "", params: { Channel: "string" } },
  {
    name: "ReplayPlayEvent",
    description: "Value = Event Number 0-1000",
    params: { Value: "string", Channel: "string" }
  },
  {
    name: "ReplayPlayEventsByID",
    description: "Value = List of IDs",
    params: { Value: "string", Channel: "string" }
  },
  {
    name: "ReplayPlayEventsByIDToOutput",
    description: "Value = List of IDs",
    params: { Value: "string", Channel: "string" }
  },
  {
    name: "ReplayPlayEventToOutput",
    description: "Value = Event Number 0-1000",
    params: { Value: "string", Channel: "string" }
  },
  { name: "ReplayPlayForward", description: "", params: { Channel: "string" } },
  { name: "ReplayPlayLastEvent", description: "", params: { Channel: "string" } },
  { name: "ReplayPlayLastEventToOutput", description: "", params: { Channel: "string" } },
  { name: "ReplayPlayNext", description: "", params: { Channel: "string" } },
  { name: "ReplayPlayPause", description: "", params: { Channel: "string" } },
  { name: "ReplayPlayPrevious", description: "", params: { Channel: "string" } },
  { name: "ReplayPlaySelectedEvent", description: "", params: { Channel: "string" } },
  { name: "ReplayPlaySelectedEventToOutput", description: "", params: { Channel: "string" } },
  { name: "ReplayRecorded", description: "", params: {} },
  {
    name: "ReplayScrollSelectedEvent",
    description: "Move back or forward through events list \nValue = Count -10-10",
    params: { Value: "string" }
  },
  {
    name: "ReplaySelectAllEvents",
    description: "Select all events in active channel.",
    params: {}
  },
  { name: "ReplaySelectChannelA", description: "", params: {} },
  { name: "ReplaySelectChannelAB", description: "", params: {} },
  { name: "ReplaySelectChannelB", description: "", params: {} },
  {
    name: "ReplaySelectedEventCameraOff",
    description: "Turns off the specified camera angle (1-8) \nValue = Camera",
    params: { Value: "string" }
  },
  {
    name: "ReplaySelectedEventCameraOn",
    description: "Turns on the specified camera angle (1-8) \nValue = Camera",
    params: { Value: "string" }
  },
  {
    name: "ReplaySelectedEventSingleCameraOn",
    description: "Turns on only the specified camera angle (1-8) \nValue = Camera",
    params: { Value: "string" }
  },
  { name: "ReplaySelectEvents1", description: "", params: { Channel: "string" } },
  { name: "ReplaySelectEvents10", description: "", params: { Channel: "string" } },
  { name: "ReplaySelectEvents11", description: "", params: { Channel: "string" } },
  { name: "ReplaySelectEvents12", description: "", params: { Channel: "string" } },
  { name: "ReplaySelectEvents13", description: "", params: { Channel: "string" } },
  { name: "ReplaySelectEvents14", description: "", params: { Channel: "string" } },
  { name: "ReplaySelectEvents15", description: "", params: { Channel: "string" } },
  { name: "ReplaySelectEvents16", description: "", params: { Channel: "string" } },
  { name: "ReplaySelectEvents17", description: "", params: { Channel: "string" } },
  { name: "ReplaySelectEvents18", description: "", params: { Channel: "string" } },
  { name: "ReplaySelectEvents19", description: "", params: { Channel: "string" } },
  { name: "ReplaySelectEvents2", description: "", params: { Channel: "string" } },
  { name: "ReplaySelectEvents20", description: "", params: { Channel: "string" } },
  { name: "ReplaySelectEvents3", description: "", params: { Channel: "string" } },
  { name: "ReplaySelectEvents4", description: "", params: { Channel: "string" } },
  { name: "ReplaySelectEvents5", description: "", params: { Channel: "string" } },
  { name: "ReplaySelectEvents6", description: "", params: { Channel: "string" } },
  { name: "ReplaySelectEvents7", description: "", params: { Channel: "string" } },
  { name: "ReplaySelectEvents8", description: "", params: { Channel: "string" } },
  { name: "ReplaySelectEvents9", description: "", params: { Channel: "string" } },
  { name: "ReplaySelectFirstEvent", description: "", params: { Channel: "string" } },
  { name: "ReplaySelectLastEvent", description: "", params: { Channel: "string" } },
  { name: "ReplaySelectNextEvent", description: "", params: { Channel: "string" } },
  { name: "ReplaySelectPreviousEvent", description: "", params: { Channel: "string" } },
  {
    name: "ReplaySetAudioSource",
    description: "Name as per dropdown box. e.g 'Camera1' \nValue = AudioSource",
    params: { Value: "string" }
  },
  { name: "ReplaySetChannelAToBTimecode", description: "Set A Timecode to B Timecode", params: {} },
  { name: "ReplaySetChannelBToATimecode", description: "Set B Timecode to A Timecode", params: {} },
  { name: "ReplaySetDirectionBackward", description: "", params: { Channel: "string" } },
  { name: "ReplaySetDirectionForward", description: "", params: { Channel: "string" } },
  { name: "ReplaySetLastEventText", description: "Value = Text", params: { Value: "string" } },
  {
    name: "ReplaySetLastEventTextCamera",
    description:
      "Changes the text of the specified angle (1-4), example: 3,angle3text \nValue = Camera,Text",
    params: { Value: "string" }
  },
  { name: "ReplaySetSelectedEventText", description: "Value = Text", params: { Value: "string" } },
  {
    name: "ReplaySetSelectedEventTextCamera",
    description:
      "Changes the text of the specified angle (1-4), example: 3,angle3text \nValue = Camera,Text",
    params: { Value: "string" }
  },
  {
    name: "ReplaySetSpeed",
    description: "See SetRateSlowMotion \nValue = Speed 0-1",
    params: { Value: "string", Channel: "string" }
  },
  {
    name: "ReplaySetTimecode",
    description: "Set position to Timecode in format yyyy-MM-ddTHH:mm:ss.fff \nValue = Timecode",
    params: { Value: "string", Channel: "string" }
  },
  { name: "ReplayShowHide", description: "", params: {} },
  { name: "ReplayStartRecording", description: "", params: {} },
  { name: "ReplayStartStopRecording", description: "", params: {} },
  { name: "ReplayStopEvents", description: "", params: { Channel: "string" } },
  { name: "ReplayStopRecording", description: "", params: {} },
  {
    name: "ReplaySwapChannels",
    description: "Swap A to B and vice versa, includes angles and playback status.",
    params: {}
  },
  { name: "ReplayToggleLastEventCamera1", description: "", params: {} },
  { name: "ReplayToggleLastEventCamera2", description: "", params: {} },
  { name: "ReplayToggleLastEventCamera3", description: "", params: {} },
  { name: "ReplayToggleLastEventCamera4", description: "", params: {} },
  { name: "ReplayToggleLastEventCamera5", description: "", params: {} },
  { name: "ReplayToggleLastEventCamera6", description: "", params: {} },
  { name: "ReplayToggleLastEventCamera7", description: "", params: {} },
  { name: "ReplayToggleLastEventCamera8", description: "", params: {} },
  { name: "ReplayToggleSelectedEventCamera1", description: "", params: {} },
  { name: "ReplayToggleSelectedEventCamera2", description: "", params: {} },
  { name: "ReplayToggleSelectedEventCamera3", description: "", params: {} },
  { name: "ReplayToggleSelectedEventCamera4", description: "", params: {} },
  { name: "ReplayToggleSelectedEventCamera5", description: "", params: {} },
  { name: "ReplayToggleSelectedEventCamera6", description: "", params: {} },
  { name: "ReplayToggleSelectedEventCamera7", description: "", params: {} },
  { name: "ReplayToggleSelectedEventCamera8", description: "", params: {} },
  {
    name: "ReplayUpdateSelectedInPoint",
    description: "Update In point of Selected Event to current Position.",
    params: { Channel: "string" }
  },
  {
    name: "ReplayUpdateSelectedOutPoint",
    description: "Update Mark Out point of Selected Event to current Position.",
    params: { Channel: "string" }
  },
  {
    name: "ReplayUpdateSelectedSpeed",
    description: "Update Selected Event to use Current Speed.",
    params: { Channel: "string" }
  },
  {
    name: "ReplayUpdateSelectedSpeedDefault",
    description: "Update Selected Event to use Default Speed.",
    params: { Channel: "string" }
  },
  { name: "ResetInput", description: "", params: { Input: "string" } },
  { name: "Restart", description: "Restart selected Input", params: { Input: "string" } },
  {
    name: "ResumeRender",
    description: "Resume Title Input rendering after making multiple updates",
    params: { Input: "string" }
  },
  {
    name: "SavePreset",
    description: "Save preset to the specified Filename. \nValue = Filename",
    params: { Value: "string" }
  },
  {
    name: "SaveVideoDelay",
    description: "Save video clip from Video Delay according to Duration in milliseconds",
    params: { Input: "string", Duration: "string" }
  },
  { name: "ScriptStart", description: "Value = Script Name", params: { Value: "string" } },
  {
    name: "ScriptStartDynamic",
    description: "Start a dynamic script using code specified as the Value. \nValue = Code",
    params: { Value: "string" }
  },
  { name: "ScriptStop", description: "Value = Script Name", params: { Value: "string" } },
  { name: "ScriptStopAll", description: "", params: {} },
  { name: "ScriptStopDynamic", description: "", params: {} },
  {
    name: "SelectCategory",
    description:
      "Change to Category according to Value (All,Red,Green,Orange,Purple,Aqua,Blue,Custom1-16,Search) \nValue = Category",
    params: { Value: "string" }
  },
  {
    name: "SelectIndex",
    description:
      "Photos,List: Selects item in List according to Value starting from number 1 \nVirtual Set: Zooms to selected preset using the current speed settings \nValue = Index",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SelectPlayList",
    description: "Open PlayList with Name matching Value \nValue = PlayList",
    params: { Value: "string" }
  },
  {
    name: "SelectTitlePreset",
    description: "Value = Preset Index",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SendKeys",
    description: "Send keys to active window \nValue = Keys",
    params: { Value: "string" }
  },
  {
    name: "SetAlpha",
    description:
      "Set Input transparency according to Value. 0 is transparent, 255 is opaque \nValue = Alpha 0-255",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetBalance",
    description: "Value = Balance -1-1",
    params: { Value: "string", Input: "string" }
  },
  { name: "SetBusAVolume", description: "Value = Volume 0-100", params: { Value: "string" } },
  { name: "SetBusBVolume", description: "Value = Volume 0-100", params: { Value: "string" } },
  { name: "SetBusCVolume", description: "Value = Volume 0-100", params: { Value: "string" } },
  { name: "SetBusDVolume", description: "Value = Volume 0-100", params: { Value: "string" } },
  { name: "SetBusEVolume", description: "Value = Volume 0-100", params: { Value: "string" } },
  { name: "SetBusFVolume", description: "Value = Volume 0-100", params: { Value: "string" } },
  { name: "SetBusGVolume", description: "Value = Volume 0-100", params: { Value: "string" } },
  {
    name: "SetCCGainB",
    description: "Change Gain B level of Input. \n1=Original \nValue = Value 0-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetCCGainG",
    description: "Change Gain G level of Input. \n1=Original \nValue = Value 0-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetCCGainR",
    description: "Change Gain R level of Input. \n1=Original \nValue = Value 0-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetCCGainRGB",
    description: "Change Gain RGB level of Input. \n1=Original \nValue = Value 0-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetCCGainY",
    description: "Change Gain Y level of Input. \n1=Original \nValue = Value 0-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetCCGammaB",
    description: "Change Gamma B level of Input. \n0=Original \nValue = Value -1-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetCCGammaG",
    description: "Change Gamma G level of Input. \n0=Original \nValue = Value -1-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetCCGammaR",
    description: "Change Gamma R level of Input. \n0=Original \nValue = Value -1-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetCCGammaRGB",
    description: "Change Gamma RGB level of Input. \n0=Original \nValue = Value -1-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetCCGammaY",
    description: "Change Gamma Y level of Input. \n0=Original \nValue = Value -1-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetCCHue",
    description: "Change Hue level of Input. \n0=Original \nValue = Value -1-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetCCLiftB",
    description: "Change Lift B level of Input. \n0=Original \nValue = Value -1-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetCCLiftG",
    description: "Change Lift G level of Input. \n0=Original \nValue = Value -1-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetCCLiftR",
    description: "Change Lift R level of Input. \n0=Original \nValue = Value -1-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetCCLiftRGB",
    description: "Change Lift RGB level of Input. \n0=Original \nValue = Value -1-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetCCLiftY",
    description: "Change Lift Y level of Input. \n0=Original \nValue = Value -1-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetCCSaturation",
    description:
      "Change Saturation level of Input. \n0=Original, -1=Greyscale \nValue = Value -1-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetColor",
    description:
      "Change Color in Title using HTML #xxxxxxxx format. \nSelectedIndex or SelectedName can be used to select object. \nValue = Color",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetCountdown",
    description:
      "Set countdown duration according to Value as hh:mm:ss (00:00:00) \nValue = Duration 00:00:00",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetCrop",
    description:
      "Change current Crop value of Input. \nX1,Y1,X2,Y2 (values between 0 and 1) \nValue = X1,Y1,X2,Y2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetCropX1",
    description: "Change current Crop X1 value of Input. \n0=No Crop, 1=Full Crop \nValue = X1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetCropX2",
    description: "Change current Crop X2 value of Input. \n1=No Crop, 0=Full Crop \nValue = X2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetCropY1",
    description: "Change current Crop Y1 value of Input. \n0=No Crop, 1=Full Crop \nValue = Y1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetCropY2",
    description: "Change current Crop Y2 value of Input. \n1=No Crop, 0=Full Crop \nValue = Y2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetDynamicInput1",
    description: "Set Dynamic Input from Input Name or Number \nValue = Input",
    params: { Value: "string" }
  },
  {
    name: "SetDynamicInput2",
    description: "Set Dynamic Input from Input Name or Number \nValue = Input",
    params: { Value: "string" }
  },
  {
    name: "SetDynamicInput3",
    description: "Set Dynamic Input from Input Name or Number \nValue = Input",
    params: { Value: "string" }
  },
  {
    name: "SetDynamicInput4",
    description: "Set Dynamic Input from Input Name or Number \nValue = Input",
    params: { Value: "string" }
  },
  {
    name: "SetDynamicValue1",
    description:
      "Set Dynamic Value to use when specifying Dynamic1 as a shortcut value. \nValue = Value",
    params: { Value: "string" }
  },
  {
    name: "SetDynamicValue2",
    description:
      "Set Dynamic Value to use when specifying Dynamic2 as a shortcut value. \nValue = Value",
    params: { Value: "string" }
  },
  {
    name: "SetDynamicValue3",
    description:
      "Set Dynamic Value to use when specifying Dynamic3 as a shortcut value. \nValue = Value",
    params: { Value: "string" }
  },
  {
    name: "SetDynamicValue4",
    description:
      "Set Dynamic Value to use when specifying Dynamic4 as a shortcut value. \nValue = Value",
    params: { Value: "string" }
  },
  {
    name: "SetEffect1Strength",
    description: "Set Input 1 Effect Strength \nValue = Value 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetEffect2Strength",
    description: "Set Input 2 Effect Strength \nValue = Value 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetEffect3Strength",
    description: "Set Input 3 Effect Strength \nValue = Value 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetEffect4Strength",
    description: "Set Input 4 Effect Strength \nValue = Value 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetFader",
    description: "Set Master Fader T-Bar, 255 will cut to Preview \nValue = Fader 0-255",
    params: { Value: "string" }
  },
  {
    name: "SetFrameDelay",
    description: "Set the delay in frames \nValue = Frames",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetGain",
    description: "Value = Gain dB 0-24",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetGainChannel1",
    description: "Value = Gain dB 0-24",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetGainChannel2",
    description: "Value = Gain dB 0-24",
    params: { Value: "string", Input: "string" }
  },
  { name: "SetHeadphonesVolume", description: "Value = Volume 0-100", params: { Value: "string" } },
  {
    name: "SetImage",
    description:
      "Change Image in Title according to Filename or empty to clear. \nSelectedIndex or SelectedName can be used to select image. \nValue = Filename",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetImageVisible",
    description:
      "Toggle Image Visibility in Title \nSelectedIndex or SelectedName can be used to select image.",
    params: { Input: "string" }
  },
  {
    name: "SetImageVisibleOff",
    description: "Hide Image in Title \nSelectedIndex or SelectedName can be used to select image.",
    params: { Input: "string" }
  },
  {
    name: "SetImageVisibleOn",
    description: "Show Image in Title \nSelectedIndex or SelectedName can be used to select image.",
    params: { Input: "string" }
  },
  {
    name: "SetInputName",
    description: "Set the Display Name of the Input \nValue = Name",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer",
    description:
      "Change Layer in Input according to Value parameter. \nExample: 1,2 changes Layer1 to Input2 \nValue = Index,Input",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer10Crop",
    description:
      "Change current Crop value of Input Layer. \nX1,Y1,X2,Y2 (values between 0 and 1) \nValue = X1,Y1,X2,Y2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer10CropX1",
    description:
      "Change current Crop X1 value of Input Layer. \n0=No Crop, 1=Full Crop \nValue = X1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer10CropX2",
    description:
      "Change current Crop X2 value of Input Layer. \n1=No Crop, 0=Full Crop \nValue = X2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer10CropY1",
    description:
      "Change current Crop Y1 value of Input Layer. \n0=No Crop, 1=Full Crop \nValue = Y1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer10CropY2",
    description:
      "Change current Crop Y2 value of Input Layer. \n1=No Crop, 0=Full Crop \nValue = Y2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer10Height",
    description:
      "Change current Height value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer10PanX",
    description:
      "Change current PanX value of Input Layer. \n0=centered, -2=100% to left, 2=100% to right \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer10PanY",
    description:
      "Change current PanY value of Input Layer. \n0=centered, -2=100% to bottom, 2=100% to top \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer10Rectangle",
    description:
      "Change current Rectangle values of Input Layer in pixels. \nX,Y,Width,Height \nValue = X,Y,Width,Height",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer10Width",
    description:
      "Change current Width value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer10X",
    description:
      "Change current X value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer10Y",
    description:
      "Change current Y value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer10Zoom",
    description:
      "Change current Zoom level of Input Layer. \n1=100%, 0.5=50%, 2=200% \nValue = Zoom 0-5",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer1Crop",
    description:
      "Change current Crop value of Input Layer. \nX1,Y1,X2,Y2 (values between 0 and 1) \nValue = X1,Y1,X2,Y2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer1CropX1",
    description:
      "Change current Crop X1 value of Input Layer. \n0=No Crop, 1=Full Crop \nValue = X1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer1CropX2",
    description:
      "Change current Crop X2 value of Input Layer. \n1=No Crop, 0=Full Crop \nValue = X2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer1CropY1",
    description:
      "Change current Crop Y1 value of Input Layer. \n0=No Crop, 1=Full Crop \nValue = Y1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer1CropY2",
    description:
      "Change current Crop Y2 value of Input Layer. \n1=No Crop, 0=Full Crop \nValue = Y2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer1Height",
    description:
      "Change current Height value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer1PanX",
    description:
      "Change current PanX value of Input Layer. \n0=centered, -2=100% to left, 2=100% to right \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer1PanY",
    description:
      "Change current PanY value of Input Layer. \n0=centered, -2=100% to bottom, 2=100% to top \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer1Rectangle",
    description:
      "Change current Rectangle values of Input Layer in pixels. \nX,Y,Width,Height \nValue = X,Y,Width,Height",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer1Width",
    description:
      "Change current Width value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer1X",
    description:
      "Change current X value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer1Y",
    description:
      "Change current Y value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer1Zoom",
    description:
      "Change current Zoom level of Input Layer. \n1=100%, 0.5=50%, 2=200% \nValue = Zoom 0-5",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer2Crop",
    description:
      "Change current Crop value of Input Layer. \nX1,Y1,X2,Y2 (values between 0 and 1) \nValue = X1,Y1,X2,Y2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer2CropX1",
    description:
      "Change current Crop X1 value of Input Layer. \n0=No Crop, 1=Full Crop \nValue = X1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer2CropX2",
    description:
      "Change current Crop X2 value of Input Layer. \n1=No Crop, 0=Full Crop \nValue = X2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer2CropY1",
    description:
      "Change current Crop Y1 value of Input Layer. \n0=No Crop, 1=Full Crop \nValue = Y1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer2CropY2",
    description:
      "Change current Crop Y2 value of Input Layer. \n1=No Crop, 0=Full Crop \nValue = Y2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer2Height",
    description:
      "Change current Height value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer2PanX",
    description:
      "Change current PanX value of Input Layer. \n0=centered, -2=100% to left, 2=100% to right \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer2PanY",
    description:
      "Change current PanY value of Input Layer. \n0=centered, -2=100% to bottom, 2=100% to top \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer2Rectangle",
    description:
      "Change current Rectangle values of Input Layer in pixels. \nX,Y,Width,Height \nValue = X,Y,Width,Height",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer2Width",
    description:
      "Change current Width value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer2X",
    description:
      "Change current X value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer2Y",
    description:
      "Change current Y value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer2Zoom",
    description:
      "Change current Zoom level of Input Layer. \n1=100%, 0.5=50%, 2=200% \nValue = Zoom 0-5",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer3Crop",
    description:
      "Change current Crop value of Input Layer. \nX1,Y1,X2,Y2 (values between 0 and 1) \nValue = X1,Y1,X2,Y2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer3CropX1",
    description:
      "Change current Crop X1 value of Input Layer. \n0=No Crop, 1=Full Crop \nValue = X1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer3CropX2",
    description:
      "Change current Crop X2 value of Input Layer. \n1=No Crop, 0=Full Crop \nValue = X2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer3CropY1",
    description:
      "Change current Crop Y1 value of Input Layer. \n0=No Crop, 1=Full Crop \nValue = Y1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer3CropY2",
    description:
      "Change current Crop Y2 value of Input Layer. \n1=No Crop, 0=Full Crop \nValue = Y2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer3Height",
    description:
      "Change current Height value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer3PanX",
    description:
      "Change current PanX value of Input Layer. \n0=centered, -2=100% to left, 2=100% to right \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer3PanY",
    description:
      "Change current PanY value of Input Layer. \n0=centered, -2=100% to bottom, 2=100% to top \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer3Rectangle",
    description:
      "Change current Rectangle values of Input Layer in pixels. \nX,Y,Width,Height \nValue = X,Y,Width,Height",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer3Width",
    description:
      "Change current Width value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer3X",
    description:
      "Change current X value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer3Y",
    description:
      "Change current Y value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer3Zoom",
    description:
      "Change current Zoom level of Input Layer. \n1=100%, 0.5=50%, 2=200% \nValue = Zoom 0-5",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer4Crop",
    description:
      "Change current Crop value of Input Layer. \nX1,Y1,X2,Y2 (values between 0 and 1) \nValue = X1,Y1,X2,Y2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer4CropX1",
    description:
      "Change current Crop X1 value of Input Layer. \n0=No Crop, 1=Full Crop \nValue = X1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer4CropX2",
    description:
      "Change current Crop X2 value of Input Layer. \n1=No Crop, 0=Full Crop \nValue = X2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer4CropY1",
    description:
      "Change current Crop Y1 value of Input Layer. \n0=No Crop, 1=Full Crop \nValue = Y1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer4CropY2",
    description:
      "Change current Crop Y2 value of Input Layer. \n1=No Crop, 0=Full Crop \nValue = Y2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer4Height",
    description:
      "Change current Height value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer4PanX",
    description:
      "Change current PanX value of Input Layer. \n0=centered, -2=100% to left, 2=100% to right \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer4PanY",
    description:
      "Change current PanY value of Input Layer. \n0=centered, -2=100% to bottom, 2=100% to top \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer4Rectangle",
    description:
      "Change current Rectangle values of Input Layer in pixels. \nX,Y,Width,Height \nValue = X,Y,Width,Height",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer4Width",
    description:
      "Change current Width value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer4X",
    description:
      "Change current X value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer4Y",
    description:
      "Change current Y value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer4Zoom",
    description:
      "Change current Zoom level of Input Layer. \n1=100%, 0.5=50%, 2=200% \nValue = Zoom 0-5",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer5Crop",
    description:
      "Change current Crop value of Input Layer. \nX1,Y1,X2,Y2 (values between 0 and 1) \nValue = X1,Y1,X2,Y2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer5CropX1",
    description:
      "Change current Crop X1 value of Input Layer. \n0=No Crop, 1=Full Crop \nValue = X1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer5CropX2",
    description:
      "Change current Crop X2 value of Input Layer. \n1=No Crop, 0=Full Crop \nValue = X2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer5CropY1",
    description:
      "Change current Crop Y1 value of Input Layer. \n0=No Crop, 1=Full Crop \nValue = Y1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer5CropY2",
    description:
      "Change current Crop Y2 value of Input Layer. \n1=No Crop, 0=Full Crop \nValue = Y2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer5Height",
    description:
      "Change current Height value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer5PanX",
    description:
      "Change current PanX value of Input Layer. \n0=centered, -2=100% to left, 2=100% to right \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer5PanY",
    description:
      "Change current PanY value of Input Layer. \n0=centered, -2=100% to bottom, 2=100% to top \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer5Rectangle",
    description:
      "Change current Rectangle values of Input Layer in pixels. \nX,Y,Width,Height \nValue = X,Y,Width,Height",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer5Width",
    description:
      "Change current Width value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer5X",
    description:
      "Change current X value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer5Y",
    description:
      "Change current Y value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer5Zoom",
    description:
      "Change current Zoom level of Input Layer. \n1=100%, 0.5=50%, 2=200% \nValue = Zoom 0-5",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer6Crop",
    description:
      "Change current Crop value of Input Layer. \nX1,Y1,X2,Y2 (values between 0 and 1) \nValue = X1,Y1,X2,Y2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer6CropX1",
    description:
      "Change current Crop X1 value of Input Layer. \n0=No Crop, 1=Full Crop \nValue = X1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer6CropX2",
    description:
      "Change current Crop X2 value of Input Layer. \n1=No Crop, 0=Full Crop \nValue = X2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer6CropY1",
    description:
      "Change current Crop Y1 value of Input Layer. \n0=No Crop, 1=Full Crop \nValue = Y1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer6CropY2",
    description:
      "Change current Crop Y2 value of Input Layer. \n1=No Crop, 0=Full Crop \nValue = Y2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer6Height",
    description:
      "Change current Height value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer6PanX",
    description:
      "Change current PanX value of Input Layer. \n0=centered, -2=100% to left, 2=100% to right \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer6PanY",
    description:
      "Change current PanY value of Input Layer. \n0=centered, -2=100% to bottom, 2=100% to top \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer6Rectangle",
    description:
      "Change current Rectangle values of Input Layer in pixels. \nX,Y,Width,Height \nValue = X,Y,Width,Height",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer6Width",
    description:
      "Change current Width value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer6X",
    description:
      "Change current X value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer6Y",
    description:
      "Change current Y value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer6Zoom",
    description:
      "Change current Zoom level of Input Layer. \n1=100%, 0.5=50%, 2=200% \nValue = Zoom 0-5",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer7Crop",
    description:
      "Change current Crop value of Input Layer. \nX1,Y1,X2,Y2 (values between 0 and 1) \nValue = X1,Y1,X2,Y2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer7CropX1",
    description:
      "Change current Crop X1 value of Input Layer. \n0=No Crop, 1=Full Crop \nValue = X1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer7CropX2",
    description:
      "Change current Crop X2 value of Input Layer. \n1=No Crop, 0=Full Crop \nValue = X2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer7CropY1",
    description:
      "Change current Crop Y1 value of Input Layer. \n0=No Crop, 1=Full Crop \nValue = Y1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer7CropY2",
    description:
      "Change current Crop Y2 value of Input Layer. \n1=No Crop, 0=Full Crop \nValue = Y2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer7Height",
    description:
      "Change current Height value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer7PanX",
    description:
      "Change current PanX value of Input Layer. \n0=centered, -2=100% to left, 2=100% to right \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer7PanY",
    description:
      "Change current PanY value of Input Layer. \n0=centered, -2=100% to bottom, 2=100% to top \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer7Rectangle",
    description:
      "Change current Rectangle values of Input Layer in pixels. \nX,Y,Width,Height \nValue = X,Y,Width,Height",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer7Width",
    description:
      "Change current Width value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer7X",
    description:
      "Change current X value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer7Y",
    description:
      "Change current Y value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer7Zoom",
    description:
      "Change current Zoom level of Input Layer. \n1=100%, 0.5=50%, 2=200% \nValue = Zoom 0-5",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer8Crop",
    description:
      "Change current Crop value of Input Layer. \nX1,Y1,X2,Y2 (values between 0 and 1) \nValue = X1,Y1,X2,Y2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer8CropX1",
    description:
      "Change current Crop X1 value of Input Layer. \n0=No Crop, 1=Full Crop \nValue = X1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer8CropX2",
    description:
      "Change current Crop X2 value of Input Layer. \n1=No Crop, 0=Full Crop \nValue = X2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer8CropY1",
    description:
      "Change current Crop Y1 value of Input Layer. \n0=No Crop, 1=Full Crop \nValue = Y1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer8CropY2",
    description:
      "Change current Crop Y2 value of Input Layer. \n1=No Crop, 0=Full Crop \nValue = Y2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer8Height",
    description:
      "Change current Height value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer8PanX",
    description:
      "Change current PanX value of Input Layer. \n0=centered, -2=100% to left, 2=100% to right \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer8PanY",
    description:
      "Change current PanY value of Input Layer. \n0=centered, -2=100% to bottom, 2=100% to top \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer8Rectangle",
    description:
      "Change current Rectangle values of Input Layer in pixels. \nX,Y,Width,Height \nValue = X,Y,Width,Height",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer8Width",
    description:
      "Change current Width value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer8X",
    description:
      "Change current X value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer8Y",
    description:
      "Change current Y value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer8Zoom",
    description:
      "Change current Zoom level of Input Layer. \n1=100%, 0.5=50%, 2=200% \nValue = Zoom 0-5",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer9Crop",
    description:
      "Change current Crop value of Input Layer. \nX1,Y1,X2,Y2 (values between 0 and 1) \nValue = X1,Y1,X2,Y2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer9CropX1",
    description:
      "Change current Crop X1 value of Input Layer. \n0=No Crop, 1=Full Crop \nValue = X1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer9CropX2",
    description:
      "Change current Crop X2 value of Input Layer. \n1=No Crop, 0=Full Crop \nValue = X2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer9CropY1",
    description:
      "Change current Crop Y1 value of Input Layer. \n0=No Crop, 1=Full Crop \nValue = Y1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer9CropY2",
    description:
      "Change current Crop Y2 value of Input Layer. \n1=No Crop, 0=Full Crop \nValue = Y2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer9Height",
    description:
      "Change current Height value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer9PanX",
    description:
      "Change current PanX value of Input Layer. \n0=centered, -2=100% to left, 2=100% to right \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer9PanY",
    description:
      "Change current PanY value of Input Layer. \n0=centered, -2=100% to bottom, 2=100% to top \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer9Rectangle",
    description:
      "Change current Rectangle values of Input Layer in pixels. \nX,Y,Width,Height \nValue = X,Y,Width,Height",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer9Width",
    description:
      "Change current Width value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer9X",
    description:
      "Change current X value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer9Y",
    description:
      "Change current Y value of Input Layer. \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayer9Zoom",
    description:
      "Change current Zoom level of Input Layer. \n1=100%, 0.5=50%, 2=200% \nValue = Zoom 0-5",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayerAnimated",
    description:
      "Change Layer Index to Input. Animate if input exists in another layer. \nExample: 1,2,1000 changes Layer1 to Input2. \nValue = Index,Input,DurationMilliseconds",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayerDynamicCrop",
    description:
      "Change current Crop value of Input Layer from DynamicValue1 (1-10). \nX1,Y1,X2,Y2 (values between 0 and 1) \nValue = X1,Y1,X2,Y2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayerDynamicCropX1",
    description:
      "Change current Crop X1 value of Input Layer from DynamicValue1 (1-10). \n0=No Crop, 1=Full Crop \nValue = X1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayerDynamicCropX2",
    description:
      "Change current Crop X2 value of Input Layer from DynamicValue1 (1-10). \n1=No Crop, 0=Full Crop \nValue = X2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayerDynamicCropY1",
    description:
      "Change current Crop Y1 value of Input Layer from DynamicValue1 (1-10). \n0=No Crop, 1=Full Crop \nValue = Y1 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayerDynamicCropY2",
    description:
      "Change current Crop Y2 value of Input Layer from DynamicValue1 (1-10). \n1=No Crop, 0=Full Crop \nValue = Y2 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayerDynamicHeight",
    description:
      "Change current Height value of Input Layer from DynamicValue1 (1-10). \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayerDynamicPanX",
    description:
      "Change current PanX value of Input Layer from DynamicValue1 (1-10). \n0=centered, -2=100% to left, 2=100% to right \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayerDynamicPanY",
    description:
      "Change current PanY value of Input Layer from DynamicValue1 (1-10). \n0=centered, -2=100% to bottom, 2=100% to top \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayerDynamicRectangle",
    description:
      "Change current Rectangle values of Input Layer from DynamicValue1 (1-10) in pixels. \nX,Y,Width,Height \nValue = X,Y,Width,Height",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayerDynamicWidth",
    description:
      "Change current Width value of Input Layer from DynamicValue1 (1-10). \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayerDynamicX",
    description:
      "Change current X value of Input Layer from DynamicValue1 (1-10). \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayerDynamicY",
    description:
      "Change current Y value of Input Layer from DynamicValue1 (1-10). \nIn pixels based on preset resolution \nValue = Pixels -4096-4096",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetLayerDynamicZoom",
    description:
      "Change current Zoom level of Input Layer from DynamicValue1 (1-10). \n1=100%, 0.5=50%, 2=200% \nValue = Zoom 0-5",
    params: { Value: "string", Input: "string" }
  },
  { name: "SetMasterVolume", description: "Value = Volume 0-100", params: { Value: "string" } },
  {
    name: "SetMultiViewOverlay",
    description:
      "Change Layer in Input MultiView according to Value parameter. \nExample: 1,2 changes Layer 1 to Input2 \nValue = Index,Input",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetOutput2",
    description:
      "Change what is displayed on Output 2. \nOutput,Preview,MultiView,Input \nValue = Output, Preview, MultiView, Input",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetOutput3",
    description:
      "Change what is displayed on Output 3. \nOutput,Preview,MultiView,Input \nValue = Output, Preview, MultiView, Input",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetOutput4",
    description:
      "Change what is displayed on Output 4. \nOutput,Preview,MultiView,Input \nValue = Output, Preview, MultiView, Input",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetOutputExternal2",
    description:
      "Change what is displayed on the External2 output. \nOutput,Preview,MultiView,Input \nValue = Output, Preview, MultiView, Input",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetOutputFullscreen",
    description:
      "Change what is displayed on the Fullscreen output. \nOutput,Preview,MultiView,Input \nValue = Output, Preview, MultiView, Input",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetOutputFullscreen2",
    description:
      "Change what is displayed on the Fullscreen2 output. \nOutput,Preview,MultiView,Input \nValue = Output, Preview, MultiView, Input",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetPanX",
    description:
      "Change current PanX value of Input. \n0=centered, -2=100% to left, 2=100% to right \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetPanY",
    description:
      "Change current PanY value of Input. \n0=centered, -2=100% to bottom, 2=100% to top \nValue = Pan -2-2",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetPictureEffect",
    description:
      "Set transition effect for Photos and PowerPoint Inputs (Fade, Zoom, etc) \nValue = Transition",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetPictureEffectDuration",
    description: "Set duration of transition effect in Milliseconds \nValue = Duration MS",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetPictureTransition",
    description:
      "Set transition time between Photos and PowerPoint slides in Seconds \nValue = Seconds",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetPosition",
    description:
      "Set Position of selected Input according to Value in Milliseconds \nValue = Milliseconds",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetRate",
    description:
      "Set Playback speed/rate for Videos and Video Delays \n0.5=50%,1=100%,2=200% etc \nValue = Speed 0.1-4",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetRateSlowMotion",
    description:
      "Set Slow Motion speed for Instant Replay \n0.5=50%,1=100% etc \nValue = Speed 0-1",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetText",
    description:
      "Change Text in Title according to Value parameter. \nSelectedIndex or SelectedName can be used to select Text Field \nValue = Text",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetTextColour",
    description: "Change Colour of Text in Title in HTML format (#xxxxxx) \nValue = Colour",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetTextVisible",
    description:
      "Toggle Text Visibility in Title \nSelectedIndex or SelectedName can be used to select text field.",
    params: { Input: "string" }
  },
  {
    name: "SetTextVisibleOff",
    description:
      "Hide Text in Title \nSelectedIndex or SelectedName can be used to select text field.",
    params: { Input: "string" }
  },
  {
    name: "SetTextVisibleOn",
    description:
      "Show Text in Title \nSelectedIndex or SelectedName can be used to select text field.",
    params: { Input: "string" }
  },
  {
    name: "SetTickerSpeed",
    description:
      "Change Ticker Speed. \nSelectedIndex or SelectedName can be used to select ticker field. \nValue = Speed 0-1000",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetTransitionDuration1",
    description: "Change Transition Duration for Button 1 \nValue = Duration MS",
    params: { Value: "string" }
  },
  {
    name: "SetTransitionDuration2",
    description: "Change Transition Duration for Button 2 \nValue = Duration MS",
    params: { Value: "string" }
  },
  {
    name: "SetTransitionDuration3",
    description: "Change Transition Duration for Button 3 \nValue = Duration MS",
    params: { Value: "string" }
  },
  {
    name: "SetTransitionDuration4",
    description: "Change Transition Duration for Button 4 \nValue = Duration MS",
    params: { Value: "string" }
  },
  {
    name: "SetTransitionEffect1",
    description: "Change Transition for Button 1 \nValue = Transition",
    params: { Value: "string" }
  },
  {
    name: "SetTransitionEffect2",
    description: "Change Transition for Button 2 \nValue = Transition",
    params: { Value: "string" }
  },
  {
    name: "SetTransitionEffect3",
    description: "Change Transition for Button 3 \nValue = Transition",
    params: { Value: "string" }
  },
  {
    name: "SetTransitionEffect4",
    description: "Change Transition for Button 4 \nValue = Transition",
    params: { Value: "string" }
  },
  {
    name: "SetVolume",
    description: "Value = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeBusMixer",
    description: "Set Volume of an Input's Bus Mixer (M,A,B,C,D,E,F,G) \nValue = Bus,Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeBusMixerA",
    description: "Set Volume of an Input's A Bus \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeBusMixerB",
    description: "Set Volume of an Input's B Bus \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeBusMixerC",
    description: "Set Volume of an Input's C Bus \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeBusMixerD",
    description: "Set Volume of an Input's D Bus \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeBusMixerE",
    description: "Set Volume of an Input's E Bus \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeBusMixerF",
    description: "Set Volume of an Input's F Bus \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeBusMixerG",
    description: "Set Volume of an Input's G Bus \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeBusMixerM",
    description: "Set Volume of an Input's Master Bus \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeChannel1",
    description:
      "When using SeparateMono on an Audio Input, this can be used to set channel volumes independently. \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeChannel2",
    description:
      "When using SeparateMono on an Audio Input, this can be used to set channel volumes independently. \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeChannelMixer",
    description: "Set Volume of an Input's sub channel (1 to 16) \nValue = Channel,Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeChannelMixer1",
    description: "Set Volume of an Input's sub channel 1 \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeChannelMixer10",
    description: "Set Volume of an Input's sub channel 10 \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeChannelMixer11",
    description: "Set Volume of an Input's sub channel 11 \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeChannelMixer12",
    description: "Set Volume of an Input's sub channel 12 \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeChannelMixer13",
    description: "Set Volume of an Input's sub channel 13 \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeChannelMixer14",
    description: "Set Volume of an Input's sub channel 14 \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeChannelMixer15",
    description: "Set Volume of an Input's sub channel 15 \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeChannelMixer16",
    description: "Set Volume of an Input's sub channel 16 \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeChannelMixer2",
    description: "Set Volume of an Input's sub channel 2 \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeChannelMixer3",
    description: "Set Volume of an Input's sub channel 3 \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeChannelMixer4",
    description: "Set Volume of an Input's sub channel 4 \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeChannelMixer5",
    description: "Set Volume of an Input's sub channel 5 \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeChannelMixer6",
    description: "Set Volume of an Input's sub channel 6 \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeChannelMixer7",
    description: "Set Volume of an Input's sub channel 7 \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeChannelMixer8",
    description: "Set Volume of an Input's sub channel 8 \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeChannelMixer9",
    description: "Set Volume of an Input's sub channel 9 \nValue = Volume 0-100",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetVolumeFade",
    description: "Set volume gradually over x milliseconds. \nValue = Volume 0-100,Milliseconds",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "SetZoom",
    description: "Change current Zoom level of Input. \n1=100%, 0.5=50%, 2=200% \nValue = Zoom 0-5",
    params: { Value: "string", Input: "string" }
  },
  { name: "SharpenOff", description: "", params: { Input: "string" } },
  { name: "SharpenOn", description: "", params: { Input: "string" } },
  {
    name: "Snapshot",
    description:
      "Create a snapshot image of the current Output. Optional Value specifies save Filename, otherwise a save file window will appear. Filename can specify date, for example mysnapshot {0:dd MMM yyyy}.jpg \nValue = Value",
    params: { Value: "string" }
  },
  {
    name: "SnapshotInput",
    description:
      "Create a snapshot image of the selected Input. Optional Value specifies save Filename, otherwise a save file window will appear. Filename can specify date, for example mysnapshot {0:dd MMM yyyy}.jpg \nValue = Value",
    params: { Value: "string", Input: "string" }
  },
  { name: "Solo", description: "", params: { Input: "string" } },
  { name: "SoloAllOff", description: "Turn off Solo for all Inputs and Busses", params: {} },
  { name: "SoloOff", description: "", params: { Input: "string" } },
  { name: "SoloOn", description: "", params: { Input: "string" } },
  {
    name: "SoloPFL",
    description: "Toggle between AFL or PFL mode for Solo",
    params: { Input: "string" }
  },
  { name: "SoloPFLOff", description: "Turn off PFL mode for Solo", params: { Input: "string" } },
  { name: "SoloPFLOn", description: "Turn on PFL mode for Solo", params: { Input: "string" } },
  { name: "StartCountdown", description: "", params: { Input: "string" } },
  { name: "StartExternal", description: "", params: {} },
  { name: "StartMultiCorder", description: "", params: {} },
  { name: "StartPlayList", description: "", params: {} },
  { name: "StartRecording", description: "", params: {} },
  {
    name: "StartSRTOutput",
    description:
      "Optional output number starting from 0. Leave blank to control Output 1 only. \nValue = Output",
    params: { Value: "string" }
  },
  { name: "StartStopExternal", description: "", params: {} },
  { name: "StartStopMultiCorder", description: "", params: {} },
  { name: "StartStopRecording", description: "", params: {} },
  {
    name: "StartStopSRTOutput",
    description:
      "Optional output number starting from 0. Leave blank to control Output 1 only. \nValue = Output",
    params: { Value: "string" }
  },
  {
    name: "StartStopStreaming",
    description:
      "Optional stream number starting from 0. Leave blank to control all streams. \nValue = Stream",
    params: { Value: "string" }
  },
  {
    name: "StartStreaming",
    description:
      "Optional stream number starting from 0. Leave blank to control all streams. \nValue = Stream",
    params: { Value: "string" }
  },
  { name: "Stinger1", description: "", params: { Input: "string" } },
  { name: "Stinger2", description: "", params: { Input: "string" } },
  { name: "Stinger3", description: "", params: { Input: "string" } },
  { name: "Stinger4", description: "", params: { Input: "string" } },
  { name: "StopCountdown", description: "Stop and Reset Countdown", params: { Input: "string" } },
  { name: "StopExternal", description: "", params: {} },
  { name: "StopMultiCorder", description: "", params: {} },
  { name: "StopPlayList", description: "", params: {} },
  { name: "StopRecording", description: "", params: {} },
  {
    name: "StopSRTOutput",
    description:
      "Optional output number starting from 0. Leave blank to control Output 1 only. \nValue = Output",
    params: { Value: "string" }
  },
  {
    name: "StopStreaming",
    description:
      "Optional stream number starting from 0. Leave blank to control all streams. \nValue = Stream",
    params: { Value: "string" }
  },
  {
    name: "StreamingSetKey",
    description:
      "Set Key on Custom RTMP Stream. Optional stream number starting from 0 at start followed by comma, e.g 0,mystreamkey \nValue = Stream",
    params: { Value: "string" }
  },
  {
    name: "StreamingSetPassword",
    description:
      "Set Password on Custom RTMP Stream. Optional stream number starting from 0 at start followed by comma, e.g 0,password \nValue = Stream",
    params: { Value: "string" }
  },
  {
    name: "StreamingSetURL",
    description:
      "Set URL on Custom RTMP Stream. Optional stream number starting from 0 at start followed by comma, e.g 0,rtmp://myurl/ \nValue = Stream",
    params: { Value: "string" }
  },
  {
    name: "StreamingSetUsername",
    description:
      "Set Username on Custom RTMP Stream. Optional stream number starting from 0 at start followed by comma, e.g 0,username \nValue = Stream",
    params: { Value: "string" }
  },
  { name: "SuspendCountdown", description: "Pause Countdown Only", params: { Input: "string" } },
  {
    name: "SwapLayerAnimated",
    description:
      "Animate swapping the Layers in Input according to Value parameter. \nExample: 1,2,1000 swaps Layer1 and Layer2 over 1000 milliseconds. \nValue = FromIndex,ToIndex,DurationMilliseconds",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "TitleBeginAnimation",
    description: "Value = Animation",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "Transition1",
    description: "Clicks one of the four Transition buttons in the main vMix window.",
    params: {}
  },
  { name: "Transition2", description: "", params: {} },
  { name: "Transition3", description: "", params: {} },
  { name: "Transition4", description: "", params: {} },
  { name: "Undo", description: "Undo closing Input.", params: {} },
  {
    name: "VideoCallAudioSource",
    description: "Master,Headphones,BusA,BusB,BusC,BusD,BusE,BusF,BusG \nValue = Source",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "VideoCallVideoSource",
    description: "Output1,Output2,Output3,Output4 \nValue = Source",
    params: { Value: "string", Input: "string" }
  },
  {
    name: "VideoDelayStartRecording",
    description: "Start Video Delay Recording",
    params: { Input: "string", Duration: "string" }
  },
  {
    name: "VideoDelayStartStopRecording",
    description: "Toggle Video Delay Recording",
    params: { Input: "string", Duration: "string" }
  },
  {
    name: "VideoDelayStopRecording",
    description: "Stop Video Delay Recording",
    params: { Input: "string", Duration: "string" }
  },
  {
    name: "WaitForCompletion",
    description: "Wait for a Video Input to reach the end of playback.",
    params: { Input: "string", Duration: "string" }
  },
  {
    name: "WriteDurationToRecordingLog",
    description:
      "Write current recording duration to log file with optional tag text Value. \nValue = Tag Text",
    params: { Value: "string" }
  },
  { name: "ZoomMuteSelf", description: "", params: { Input: "string" } },
  {
    name: "ZoomSelectParticipantByName",
    description: "Value = Name",
    params: { Value: "string", Input: "string" }
  },
  { name: "ZoomUnMuteSelf", description: "", params: { Input: "string" } }
] as const
