//

import {
  contextBridge,
  ipcRenderer
} from "electron";
import {
  APIS
} from "/main/api";


const send = ipcRenderer.send.bind(ipcRenderer);
const on = ipcRenderer.on.bind(ipcRenderer);
const invoke = ipcRenderer.invoke.bind(ipcRenderer);

contextBridge.exposeInMainWorld("api", {send, on, invoke, ...APIS});