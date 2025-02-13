const { contextBridge, ipcRenderer } = require('electron')
const { spawnSync} = require('child_process');
const path = require('node:path')
const fs = require('fs')

//Need to filter .ps1 and .bat for different command calling.
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

contextBridge.exposeInMainWorld('appinit', loopDir);

loopDir();

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