//

import dotenv from "dotenv";
import {
  App,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  app as electronApp,
  ipcMain
} from "electron";
import {
  client
} from "electron-connect";
import {
  join as joinPath
} from "path";


dotenv.config({path: "./variable.env"});

const COMMON_WINDOW_OPTIONS = {
  toolbar: false,
  resizable: true,
  minimizable: true,
  maximizable: true,
  fullscreenable: false,
  autoHideMenuBar: true,
  acceptFirstMouse: true,
  useContentSize: true,
  webPreferences: {
    preload: joinPath(__dirname, "preload.js"),
    nodeIntegrationInWorker: true,
    contextIsolation: true,
    devTools: true
  }
};
const PRODUCTION_WINDOW_OPTIONS = {
  webPreferences: {
    preload: joinPath(__dirname, "preload.js"),
    nodeIntegrationInWorker: true,
    contextIsolation: true,
    devTools: false
  }
};


export class Main {

  public readonly app: App;
  public windows: Map<number, BrowserWindow>;
  public mainWindow: BrowserWindow | undefined;
  public props: Map<number, object>;

  public constructor(app: App) {
    this.app = app;
    this.windows = new Map();
    this.mainWindow = undefined;
    this.props = new Map();
  }

  public main(): void {
    this.setupEventHandlers();
    this.setupIpc();
  }

  private setupEventHandlers(): void {
    this.app.on("ready", async () => {
      this.createMainWindow();
    });
    this.app.on("activate", () => {
      if (this.windows.size <= 0) {
        this.createMainWindow();
      }
    });
    this.app.on("window-all-closed", async () => {
      this.app.quit();
    });
  }

  private setupIpc(): void {
    ipcMain.on("quit", (event) => {
      this.app.quit();
    });
    ipcMain.on("resize", (event, id, width, height) => {
      const window = this.windows.get(id);
      if (window !== undefined) {
        window.setContentSize(width, height);
      }
    });
    ipcMain.on("maximize", (event, id, width, height) => {
      const window = this.windows.get(id);
      if (window !== undefined) {
        window.maximize();
      }
    });
    ipcMain.on("open-dev-tools", (event, id) => {
      const window = this.windows.get(id);
      if (window !== undefined) {
        window.webContents.openDevTools();
      }
    });
  }

  public createWindow(parentId: number | null, path: string, props: object, options: BrowserWindowConstructorOptions & {query?: Record<string, string>}): BrowserWindow {
    const show = false;
    const parent = (parentId !== null) ? this.windows.get(parentId) : undefined;
    const additionalOptions = (!this.app.isPackaged) ? {} : PRODUCTION_WINDOW_OPTIONS;
    const window = new BrowserWindow({...COMMON_WINDOW_OPTIONS, ...additionalOptions, show, parent, ...options});
    const id = window.webContents.id;
    const idString = id.toString();
    window.loadFile(joinPath(__dirname, "index.html"), {hash: path, query: {...options.query, idString}});
    window.setMenu(null);
    window.show();
    window.once("closed", () => {
      this.windows.delete(id);
    });
    this.windows.set(id, window);
    this.props.set(id, props);
    return window;
  }

  private createMainWindow(): BrowserWindow {
    const options = {width: 960, height: 720, minWidth: 960, minHeight: 720};
    const window = this.createWindow(null, "/chart", {}, options);
    this.mainWindow = window;
    this.connectReloadClient(window);
    return window;
  }

  private connectReloadClient(window: BrowserWindow): void {
    if (process.env["DEBUG"] === "true" && !this.app.isPackaged) {
      client.create(window, {}, () => {
        console.log("Reload client connected");
      });
    }
  }

}


const main = new Main(electronApp);
main.main();