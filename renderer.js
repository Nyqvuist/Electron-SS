const buttons = document.querySelectorAll("button")

buttons.forEach(button => {
   button.addEventListener("click", e=> {
      let id = e.target.id;
      let path = document.getElementById(`${id}`).value;
      let data = window.scriptCalls.button(path);
      document.getElementById('output').textContent = data;
   })
})

/*
btnContainer.addEventListener('click', e=> {
   let data = window.scriptCalls.button(path);
   document.getElementById('output').textContent = data;
   console.log(data);
})
   */