const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let win;
let allowExit = false;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 750,
    fullscreen: true,
    frame: false,
    backgroundColor: "#050505",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile("index.html");

  win.on("close", (event) => {
    if (!allowExit) {
      event.preventDefault();
      win.webContents.send("exit-blocked");
    }
  });
}

ipcMain.on("safe-exit", () => {
  allowExit = true;
  app.quit();
});

app.whenReady().then(createWindow);