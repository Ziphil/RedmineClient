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

const apis = Object.fromEntries(Object.entries(APIS).map(([name]) => {
  const invokeIpc = function (arg: any): any {
    return invoke("api", name, arg);
  };
  return [name, invokeIpc];
}));

contextBridge.exposeInMainWorld("api", {send, on, invoke, ...apis});