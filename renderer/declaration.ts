//

import {
  IpcRenderer
} from "electron";
import type {
  ApiTypes
} from "/main/api";


declare global {

  type WindowApi = ApiTypes & {
    send: IpcRenderer["send"],
    on: IpcRenderer["on"],
    invoke: IpcRenderer["invoke"]
  };

  interface Window {
    api: WindowApi;
  }

}