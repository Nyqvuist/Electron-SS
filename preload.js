const { contextBridge, ipcRenderer } = require('electron')
const {spawn, spawnSync} = require('child_process');
const path = require('node:path')
var fs = require('fs')

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
        const directory = "C:\\Users\\hassan.shirazi\\OneDrive - Johnstone Supply NJ\\Documents\\Scripts";
        
        try {
            const files = fs.readdirSync(`${directory}`);
            return files.map(file => path.join(`${directory}`, file));
        } catch (err){
            console.error("Error reading directory: ", err);
            return [];
        }
    }
})