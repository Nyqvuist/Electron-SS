const buttonContainer = document.querySelector(".BtnContainer");
const dirArray = window.startWindow.grabDir();

let bufferedData = null;

window.addEventListener('data-from-preload', (event) => {
   const data = event.detail;
   bufferedData = data;
   document.getElementById('output').textContent = bufferedData;
})

for(let i = 0; i < dirArray[0].length; i++){
   const btn = document.createElement("button");
   btn.id = `btn${i+1}`;
   btn.value = `${dirArray[0][i]}`;
   btn.textContent = `${dirArray[1][i]}`;
   btn.className = "cybr-btn";
   const span1 = document.createElement("span");
   span1.ariaHidden;
   span1.textContent = '_';
   btn.append(span1);
   const span2 = document.createElement("span");
   span2.ariaHidden;
   span2.textContent = `${dirArray[1][i]}_`;
   span2.className = "cybr-btn__glitch";
   btn.append(span2);
   const span3 = document.createElement("span");
   span3.ariaHidden;
   span3.className = "cybr-btn__tag";
   span3.textContent = 'R25';
   btn.append(span3);
   buttonContainer.append(btn);
}


const buttons = document.querySelectorAll(".BtnContainer button");
buttons.forEach(button => {
   button.addEventListener("click", e=> {
      let id = e.target.id;
      let directory = document.getElementById(`${id}`).value;
      data = window.scriptCalls.scriptRun(directory);
      
   })
})

const fldrBtn = document.querySelectorAll(".fixed-button button");
fldrBtn.forEach(btn => {
   btn.addEventListener("click", e => {
      window.dirCall.openDir();
   })
})


