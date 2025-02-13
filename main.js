const { app, BrowserWindow } = require('electron/main');
const path = require('node:path');
const fs = require('fs');
//can loop through here, read directory and make buttons.

loopDir = () => {
  const directory = "/mnt/c/Users/shira/Documents/Stuff/Scripts";
        const files = fs.readdirSync(directory);

        files.forEach(file => {
            if (path.extname(`${file}`) === '.bat' ||path.extname(`${file}`) === '.ps1'){
              const fullDir = path.join(directory, file);
              console.log(fullDir);
            }
        })
}


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
  loopDir()
  

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