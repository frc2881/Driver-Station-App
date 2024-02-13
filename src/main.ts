import { app, screen, Rectangle, BrowserWindow, Tray, Menu } from "electron";
import * as path from "path";
import minimist from "minimist";
import { fork, ChildProcess } from "child_process";
import { watch } from "fs";
import { Configuration } from "./config";
import { 
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
  private _appWindows = new Map<AppWindowType, BrowserWindow>();
  private _abortController = new AbortController();
  private _isDevMode = !app.isPackaged;

  private init = async (): Promise<void> => {
    if (!app.requestSingleInstanceLock()) {
      app.quit();
      return;
    }

    const args = minimist(process.argv, {
      default: { 
        "serverAddress": Configuration.Settings.Networking.ServerAddress 
      }
    }) as AppArguments;

    this._appServer = fork(path.join(__dirname, "server/main.js"), [ `--serverAddress=${ args.serverAddress }` ]);

    await app.whenReady();

    const tray = new Tray(`resources/${ !this._isDevMode ? "app.asar/resources/" : "" }app-icon.png`);
    tray.setContextMenu(Menu.buildFromTemplate([
      { label: "Open Data Explorer", click: () => { this.openAppWindow(AppWindowType.Data); }},
      { label: "Exit", click: () => { app.quit(); }}
    ]));

    this.openAppWindow(AppWindowType.Hud);
    this.openAppWindow(AppWindowType.Dashboard);

    if (this._isDevMode) {
      this.startUiAutoReload();
    }
  }

  private openAppWindow(type: AppWindowType) {
    if (this._appWindows.has(type)) { 
      const appWindow = this._appWindows.get(type);
      if (appWindow?.isDestroyed()) {
        this._appWindows.delete(type);
      } else {
        appWindow?.show();
        return;
      }
    }

    const displays = screen.getAllDisplays();
    const secondaryDisplay = displays.length === 2 ? displays[1] : null;

    const { Windows } = Configuration.Settings

    let options!: AppWindowOptions;
    switch (type) {
      case AppWindowType.Hud:
        options = {
          title: "Heads-Up Display",
          bounds:{ 
            x: 0, 
            y: secondaryDisplay?.bounds.y ?? 0,
            width: Windows.MaxWidth, 
            height: Windows.MaxHeight 
          },
          isMinimized: secondaryDisplay === null,
          isTransparent: true,
          isFrameless: true,
          isFullscreen: secondaryDisplay !== null
        };
        break;
      case AppWindowType.Dashboard:
        options = {
          title: "Dashboard",
          bounds: { 
            x: 0, 
            y: 0, 
            width: Windows.MaxWidth, 
            height: Windows.MaxHeight - Windows.DockedHeight 
          },
          isMinimized: false,
          isTransparent: true,
          isFrameless: true,
          isFullscreen: false
        };
        break;
      case AppWindowType.Data:
        options = { 
          title: "Data Explorer",
          bounds: { 
            x: 0, 
            y: 0, 
            width: Windows.MaxWidth, 
            height: Windows.MaxHeight - Windows.DockedHeight
          } as Rectangle,
          isMinimized: false,
          isTransparent: false,
          isFrameless: false,
          isFullscreen: false
        };
        break;
      default:
        break;
    }
    this.createAppWindow(type, options);
  }

  private createAppWindow = (type: AppWindowType, options: AppWindowOptions): void => {
    const { title, bounds, isMinimized, isFrameless, isTransparent, isFullscreen } = options;
    const appWindow = new BrowserWindow({
      title: `Driver Station App - ${ title }`,
      width: bounds.width,
      height: bounds.height,
      x: bounds.x,
      y: bounds.y,
      transparent: isTransparent,
      frame: !isFrameless,
      fullscreen: isFullscreen,
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
    this._appWindows.set(type, appWindow);
  }

  private startUiAutoReload = (): void => {
    watch(
      path.join(__dirname, "ui"), { 
        recursive: true, 
        signal: this._abortController.signal 
      }).on("change", () => {
        for (const appWindow of this._appWindows.values()) {
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