import { app, BrowserWindow } from "electron";
import * as path from "path";
import minimist from "minimist";
import { fork, ChildProcess } from "child_process";
import { 
  Configuration,
  AppArguments, 
  AppWindowType, 
  Position 
} from "./common";

class Main {
  constructor() {
    app.on("will-quit", this.onAppWillQuit);
    app.on("quit", this.onAppQuit);
    this.init();
  }

  private _appServer!: ChildProcess;

  private init = async (): Promise<void> => {
    const args = minimist(process.argv, {
      default: { 
        "ntServerAddress": Configuration.Settings.Defaults.NT_SERVER_ADDRESS,
        "ntVersion": Configuration.Settings.Defaults.NT_VERSION 
      }
    }) as AppArguments;

    this._appServer = fork(path.join(__dirname, "server/main.js"), [ `--ntServerAddress=${ args.ntServerAddress }`, `--ntVersion=${ args.ntVersion }` ]);

    await app.whenReady();

    this.createAppWindow(AppWindowType.HUD, { x: 0, y: 0 });
    this.createAppWindow(AppWindowType.DASHBOARD, { x: 30, y: 50 });
    this.createAppWindow(AppWindowType.DATA, { x: 60, y: 100 });

    if (!app.isPackaged) {
      const electronReload = (await import("electron-reload")).default;
      electronReload(path.join(__dirname, "ui"), { hardResetMethod: "exit" });
    }
  }

  private createAppWindow = (appWindowType: AppWindowType, position: Position): void => {
    const window = new BrowserWindow({
      title: `Driver Station - ${ appWindowType }`,
      width: 1280,
      height: 720,
      x: position.x,
      y: position.y,
      backgroundColor: "#000000",
      webPreferences: { 
        webSecurity: false
      }
    });
    window.menuBarVisible = false;
    window.loadFile(
      path.join(__dirname, "ui/index.html"), 
      { query: { "appWindowType": appWindowType } }
    );
  }

  private onAppWillQuit = (): void => {
    this._appServer.disconnect();
  }

  private onAppQuit = (): void => {
    if (!app.isPackaged) {
      console.log("All windows closed and application exited. Press [ Ctrl+C ] to terminate process.");
    }
  }
}

new Main();