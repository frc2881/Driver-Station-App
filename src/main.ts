import { app, screen, Rectangle, BrowserWindow } from "electron";
import * as path from "path";
import minimist from "minimist";
import { fork, ChildProcess } from "child_process";
import { watch } from "fs";
import { 
  Configuration, 
  AppArguments, 
  AppWindowType, 
  AppWindowOptions 
} from "./common";

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
    const secondaryDisplay = displays.length === 2 ? displays[1] : null;

    this.createAppWindow(AppWindowType.Hud, {
      title: "Heads-Up Display",
      bounds:{ 
        x: 0, 
        y: secondaryDisplay?.bounds.y ?? 0,
        width: Configuration.Settings.WINDOW_MAX_WIDTH, 
        height: Configuration.Settings.WINDOW_MAX_HEIGHT 
      },
      isFullScreen: !this._isDevMode && secondaryDisplay !== null,
      isMinimized: secondaryDisplay === null
    });

    this.createAppWindow(AppWindowType.Dashboard, {
      title: "Dashboard",
      bounds: { 
        x: 0, 
        y: 0, 
        width: Configuration.Settings.WINDOW_MAX_WIDTH, 
        height: Configuration.Settings.WINDOW_MAX_HEIGHT - Configuration.Settings.FRC_DS_APP_DOCKED_HEIGHT 
      },
      isFullScreen: false,
      isMinimized: false
    });

    this.createAppWindow(AppWindowType.Data, { 
      title: "Data Explorer",
      bounds: { 
        x: 0, 
        y: 0, 
        width: Configuration.Settings.WINDOW_MAX_WIDTH, 
        height: Configuration.Settings.WINDOW_MAX_HEIGHT - Configuration.Settings.FRC_DS_APP_DOCKED_HEIGHT
      } as Rectangle,
      isFullScreen: false,
      isMinimized: !this._isDevMode
    });

    if (this._isDevMode) {
      this.startUiAutoReload();
    }
  }

  private createAppWindow = (type: AppWindowType, options: AppWindowOptions): void => {
    const { title, bounds, isFullScreen, isMinimized } = options;
    const appWindow = new BrowserWindow({
      title: `Driver Station App - ${ title }`,
      width: bounds.width,
      height: bounds.height,
      x: bounds.x,
      y: bounds.y,
      fullscreen: isFullScreen,
      backgroundColor: "#000000",
      webPreferences: { 
        webSecurity: false,
        zoomFactor: 1
      }
    });
    if (isMinimized) { appWindow.minimize(); }
    appWindow.menuBarVisible = false;
    appWindow.loadFile(
      path.join(__dirname, "ui/index.html"), 
      { query: { "appWindowType": type } }
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