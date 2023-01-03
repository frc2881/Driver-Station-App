import { app, BrowserWindow } from "electron";
import * as path from "path";
import { fork, ChildProcess } from "child_process";
import { AppWindowType, Position } from "./common";

class Main {
  constructor() {
    app.on("before-quit", this.onAppBeforeQuit);
    app.on("quit", this.onAppQuit);
    this.init();
  }

  private _server!: ChildProcess;

  private init = async (): Promise<void> => {
    if (!app.isPackaged) {
      const electronReload = (await import("electron-reload")).default;
      electronReload(path.join(__dirname, "ui"), {});
    }

    await app.whenReady();

    this.createAppWindow(AppWindowType.HUD, { x: 0, y: 0 });
    this.createAppWindow(AppWindowType.DASHBOARD, { x: 25, y: 40 });
    this.createAppWindow(AppWindowType.DATA, { x: 50, y: 80 });

    this._server = fork(path.join(__dirname, "server/main.js"));
  }

  private createAppWindow = (appWindowType: AppWindowType, position: Position): void => {
    const window = new BrowserWindow({
      title: `Driver Station App - ${appWindowType}`,
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

  private onAppBeforeQuit = (): void => {
    this._server.disconnect();
  }

  private onAppQuit = (): void => {
    app.exit(1);
  }
}

new Main();