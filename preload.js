const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  safeExit: () => ipcRenderer.send("safe-exit"),
  onExitBlocked: (callback) => ipcRenderer.on("exit-blocked", callback)
});