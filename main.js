const { app, BrowserWindow } = require('electron/main');
const path = require('node:path');
const fs = require('fs');
//can loop through here, read directory and make buttons.

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 768,
    autoHideMenuBar: true,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

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