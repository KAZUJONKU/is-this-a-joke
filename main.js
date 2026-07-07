const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let win;
let gameStarted = false;

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
    if (gameStarted) {
      event.preventDefault();
      win.webContents.send("exit-blocked");
    }
  });
}

ipcMain.on("safe-exit", () => {
  app.quit();
});

ipcMain.on("game-started", () => {
  gameStarted = true;
});

app.whenReady().then(createWindow);