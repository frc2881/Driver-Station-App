import { app, screen, BrowserWindow, Rectangle } from "electron";
import * as path from "path";
import minimist from "minimist";
import { fork, ChildProcess } from "child_process";
import { watch } from "fs";
import { Configuration, AppArguments, AppWindowType } from "./common";

class Main {
  constructor() {
    app.on("will-quit", this.onAppWillQuit);
    app.on("quit", this.onAppQuit);
    this.init();
  }

  private _appServer!: ChildProcess;
  private _appWindows = [] as BrowserWindow[];
  private _abortController = new AbortController();
  private _isDevMode = !app.isPackaged;

  private init = async (): Promise<void> => {
    if (!app.requestSingleInstanceLock()) {
      app.quit();
      return;
    }

    const args = minimist(process.argv, {
      default: { 
        "ntServerAddress": Configuration.Settings.Defaults.NT_SERVER_ADDRESS,
        "ntVersion": Configuration.Settings.Defaults.NT_VERSION 
      }
    }) as AppArguments;

    this._appServer = fork(path.join(__dirname, "server/main.js"), [ `--ntServerAddress=${ args.ntServerAddress }`, `--ntVersion=${ args.ntVersion }` ]);

    await app.whenReady();

    const displays = screen.getAllDisplays();
    const primaryDisplay = displays[0];
    const secondaryDisplay = displays.length === 2 ? displays[1] : null;

    this.createAppWindow(
      AppWindowType.HUD, { 
        x: 0, 
        y: secondaryDisplay?.bounds.y ?? 0, 
        width: secondaryDisplay?.bounds.width ?? primaryDisplay.bounds.width, 
        height: secondaryDisplay?.bounds.height ?? primaryDisplay.bounds.height  
      }, 
      secondaryDisplay !== null);

    this.createAppWindow(
      AppWindowType.DASHBOARD, 
      { 
        x: 0, 
        y: 0, 
        width: primaryDisplay.bounds.width, 
        height: primaryDisplay.bounds.height - Configuration.Settings.FRC_DRIVER_STATION_APP_DOCKED_HEIGHT 
      }
    );
    
    this.createAppWindow(
      AppWindowType.DATA, 
      { 
        x: 0, 
        y: 0, 
        width: primaryDisplay.bounds.width, 
        height: primaryDisplay.bounds.height - Configuration.Settings.FRC_DRIVER_STATION_APP_DOCKED_HEIGHT 
      }
    );

    if (this._isDevMode) {
      this.startUiAutoReload();
    }
  }

  private createAppWindow = (appWindowType: AppWindowType, bounds: Rectangle, isFullScreen: boolean = false): void => {
    const appWindow = new BrowserWindow({
      title: `Driver Station - ${ appWindowType }`,
      width: bounds.width,
      height: bounds.height,
      x: bounds.x,
      y: bounds.y,
      fullscreen: isFullScreen,
      backgroundColor: "#000000",
      webPreferences: { 
        webSecurity: false
      }
    });
    appWindow.menuBarVisible = false;
    appWindow.loadFile(
      path.join(__dirname, "ui/index.html"), 
      { query: { "appWindowType": appWindowType } }
    );
    this._appWindows.push(appWindow);
  }

  private startUiAutoReload = (): void => {
    watch(
      path.join(__dirname, "ui"), { 
        recursive: true, 
        signal: this._abortController.signal 
      }).on("change", () => {
        for (const appWindow of this._appWindows) {
          try {
            appWindow.reload();
          } catch {}
        }
    });
  }

  private onAppWillQuit = (): void => {
    this._appServer?.disconnect();
  }

  private onAppQuit = (): void => {
    this._abortController?.abort();
    if (this._isDevMode) {
      console.log("All windows closed and application exited. Press [ Ctrl+C ] to terminate process.");
    }
  }
}

new Main();