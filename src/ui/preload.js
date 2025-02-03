const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("driverStationApp", {
  openDataView: () => ipcRenderer.send("openDataView", null)
});
