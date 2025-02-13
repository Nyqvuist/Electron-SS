const { contextBridge, ipcRenderer } = require('electron')
const { spawnSync} = require('child_process');
const path = require('node:path')
const fs = require('fs')

//Need to filter .ps1 and .bat for different command calling.

contextBridge.exposeInMainWorld('scriptCalls', {
    scriptRun: (directory) => {

        if(path.extname(`${directory}`) === '.bat'){
            const child = spawnSync('cmd.exe', ['/c',`${directory}`], {encoding: 'utf8'});
            return(child.stdout);
        } else {
            const child = spawnSync('powershell.exe',['-ExecutionPolicy', 'Bypass', '-File',`${directory}`], {encoding: 'utf8'});
            return(child.stdout);
        }
    }
})

contextBridge.exposeInMainWorld('createButtons', {
    buttonScripts: () => {
        
    }
})