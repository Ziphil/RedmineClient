//

import {contextBridge, ipcRenderer} from "electron";
import {API_CATALOG} from "/main/api";


const send = ipcRenderer.send.bind(ipcRenderer);
const on = ipcRenderer.on.bind(ipcRenderer);
const invoke = ipcRenderer.invoke.bind(ipcRenderer);

const apis = Object.fromEntries(Object.entries(API_CATALOG).map(([name]) => {
  const invokeIpc = function (arg: any): any {
    return invoke("api", name, arg);
  };
  return [name, invokeIpc];
}));

contextBridge.exposeInMainWorld("api", {send, on, invoke, ...apis});