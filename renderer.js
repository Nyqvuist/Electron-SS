const buttonContainer = document.querySelector(".BtnContainer");
const dirArray = window.startWindow.grabDir();

for(let i = 0; i < dirArray[0].length; i++){
   const btn = document.createElement("button");
   btn.id = `btn${i+1}`;
   btn.value = `${dirArray[0][i]}`;
   btn.textContent = `${dirArray[1][i]}`;
   buttonContainer.append(btn);
}

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
   button.addEventListener("click", e=> {
      let id = e.target.id;
      let directory = document.getElementById(`${id}`).value;
      let data = window.scriptCalls.scriptRun(directory);
      document.getElementById('output').textContent = data;
   })
})

