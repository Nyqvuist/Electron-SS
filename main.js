const { app, BrowserWindow } = require('electron/main');
const path = require('node:path');

app.disableHardwareAcceleration();

let win;

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 768,
    autoHideMenuBar: true,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
    }
  })

  win.loadFile('index.html');

  return win;
}

app.whenReady().then(() => {
  win = createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
      
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})