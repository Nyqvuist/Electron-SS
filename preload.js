const { contextBridge, ipcRenderer } = require('electron')
const {spawn, spawnSync} = require('child_process');


contextBridge.exposeInMainWorld('scriptCalls', {
    button: (path) => {
        
        const child = spawnSync('cmd.exe', ['/c',`${path}`], {encoding: 'utf8'});
        console.log("Process Finished.");
        console.log("stdout: ", child.stdout);
        return(child.stdout);

        /*
        child.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`)
            output += data.toString();
        })
        
        child.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
          
        child.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            return(output)
        });
        */
        
    }
})

/*
const childC = spawn('cmd.exe', ['/c', `${path}`])
spawn('powershell.exe', ['-ExecutionPolicy','Bypass','-file','C:\\Users\\hassan.shirazi\\OneDrive - Johnstone Supply NJ\\Documents\\Powershell Scripts\\startZoom.ps1'])

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