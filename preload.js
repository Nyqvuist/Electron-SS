const { contextBridge, ipcRenderer } = require('electron')
const { spawnSync, execSync, execFileSync, spawn} = require('child_process');
const path = require('node:path')
const fs = require('fs')

let dirArr = [];
let nameArr = [];
///mnt/c/Scripts
//Need to filter .ps1 and .bat for different command calling.
loopDir = () => {
  const directory = "./Scripts";
  if(!fs.existsSync(directory)){
    fs.mkdirSync(directory);
  }
        const files = fs.readdirSync(directory);

        files.forEach(file => {
            if (path.extname(`${file}`) === '.bat' || path.extname(`${file}`) === '.ps1'){
              const fullDir = path.join(directory, file);
              const name = path.parse(file);
              nameArr.push(name.name.slice(0,12));
              dirArr.push(fullDir);
            }
        })
}

contextBridge.exposeInMainWorld('appinit', loopDir);

loopDir();

contextBridge.exposeInMainWorld('startWindow', {
    grabDir: () => {
        return [dirArr, nameArr];
    }
})

function wslToWindowsPath(wslPath) {
    if (wslPath.startsWith('/mnt/')) {
      const driveLetter = wslPath.charAt(5);
      const windowsPath = `${c}:\\${wslPath.substring(7).replace(/\//g, '\\')}`;
      const w = windowsPath.replace(/\\/g,'\\\\');
      return w;
    }
      return wslPath;
  }

contextBridge.exposeInMainWorld('dirCall', {
    openDir: () => {
        const dir = "./Scripts";
        execSync('start "" ".\\Scripts"');
    }
})

contextBridge.exposeInMainWorld('scriptCalls', {
    scriptRun: (directory) => {

        if(path.extname(`${directory}`) === '.bat'){
            const child = spawnSync('cmd.exe', ['/c',`${directory}`], {encoding: 'utf8'});
            return(child.stdout);
        } else {
            let output = '';
            const child = spawn('powershell.exe',['-ExecutionPolicy', 'Bypass', '-File',`${wslToWindowsPath(directory)}`], {encoding: 'utf8'});
            child.stdout.on('data', (data) => {
                output += data.toString();
                const event = new CustomEvent('data-from-preload', {
                    detail: output
                });
                window.dispatchEvent(event);
            })
            // return(child.stdout);
        }

        // if(path.extname(`${directory}`) === '.bat'){
        //     console.log(directory)
        //     const child = spawnSync('cmd.exe', ['/c',`${directory}`], {encoding: 'utf8'});
        //     return(child.stdout);
        // } else {
        //     const child = spawnSync('powershell.exe',['-ExecutionPolicy', 'Bypass', '-File',`${directory}`], {encoding: 'utf8'});
        //     return(child.stdout);
        // }
    }
})