const { contextBridge, ipcRenderer } = require('electron')
const {spawn} = require('child_process');


contextBridge.exposeInMainWorld('scriptCalls', {
    startZoom: () => {
        spawn('powershell.exe', ['-ExecutionPolicy','Bypass','-file','C:\\Users\\hassan.shirazi\\OneDrive - Johnstone Supply NJ\\Documents\\Powershell Scripts\\startZoom.ps1'])
    }
})

/*
const childC = spawn('cmd.exe', ['/c', `${path}`])

childP.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
})

childP.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});
  
childP.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
*/