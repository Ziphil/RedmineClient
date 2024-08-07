//

import {IpcRenderer} from "electron";
import type {ApiCatalog} from "/main/api";


declare global {

  type WindowApi = ApiCatalog & {
    send: IpcRenderer["send"],
    on: IpcRenderer["on"],
    invoke: IpcRenderer["invoke"]
  };

  interface Window {
    api: WindowApi;
  }

}