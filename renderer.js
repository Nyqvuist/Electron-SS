const buttons = document.querySelectorAll("button");
const testBtn = document.getElementById("btn3");

testBtn.addEventListener("click", e => {
   const files = window.createButtons.buttonScripts();
   files.forEach(file => {
      console.log(file);
   })

})

// buttons.forEach(button => {
//    button.addEventListener("click", e=> {
//       let id = e.target.id;
//       let directory = document.getElementById(`${id}`).value;
//       let data = window.scriptCalls.scriptRun(directory);
//       document.getElementById('output').textContent = data;
//    })
// })

