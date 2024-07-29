/* eslint-disable @typescript-eslint/no-explicit-any */
import { initAPI } from "./types/api/API"
import { initIPC } from "./types/ipc/IPC"

if (!globalThis.API) globalThis.API = initAPI()
if (!globalThis.IPC) globalThis.IPC = initIPC()
