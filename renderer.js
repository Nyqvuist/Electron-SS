const buttons = document.querySelectorAll("button");
const testBtn = document.getElementById("btn3");

testBtn.addEventListener("click", e => {
   window.createButtons.buttonScripts();
})

console.log(window.startWindow.grabDir());
// buttons.forEach(button => {
//    button.addEventListener("click", e=> {
//       let id = e.target.id;
//       let directory = document.getElementById(`${id}`).value;
//       let data = window.scriptCalls.scriptRun(directory);
//       document.getElementById('output').textContent = data;
//    })
// })

