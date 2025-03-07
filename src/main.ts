import { app, screen, BrowserWindow } from "electron";
import path from "path";
import { fork, type ChildProcess } from "child_process";
import { watch } from "fs";
import { type AppWindowOptions, AppWindowType } from "./common/index.js";

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
    await app.whenReady();
    this._appServer = fork(path.join(import.meta.dirname, "server/main.js"), [ process.argv[2] ?? "127.0.0.1" ]);
    this._appServer.on("message", (message) => {
      if (message == "connected") {
        this.openAppWindow(AppWindowType.Hud);
        this.openAppWindow(AppWindowType.Dashboard);
        if (this._isDevMode) {
          this.startUiAutoReload();
        }
      }
    });
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

    const Layout = { MaxWidth: 1920, MaxHeight: 1080, DockedHeight: 248 };

    let options!: AppWindowOptions;
    switch (type) {
      case AppWindowType.Hud:
        options = {
          title: "Heads-Up Display",
          bounds:{ 
            x: 0, 
            y: secondaryDisplay?.bounds.y ?? 0,
            width: Layout.MaxWidth, 
            height: secondaryDisplay !== null ? Layout.MaxHeight : Layout.MaxHeight - Layout.DockedHeight
          },
          isMinimized: false,
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
            width: Layout.MaxWidth, 
            height: Layout.MaxHeight - Layout.DockedHeight 
          },
          isMinimized: false,
          isTransparent: true,
          isFrameless: true,
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
      path.join(import.meta.dirname, "ui/index.html"), 
      { query: { "appWindowType": type } }
    );
    this._appWindows.set(type, appWindow);
  }

  private startUiAutoReload = (): void => {
    watch(
      path.join(import.meta.dirname, "ui"), { 
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