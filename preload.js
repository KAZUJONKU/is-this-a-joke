const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  safeExit: () => ipcRenderer.send("safe-exit"),
  gameStarted: () => ipcRenderer.send("game-started"),
  onExitBlocked: (callback) => ipcRenderer.on("exit-blocked", callback)
});