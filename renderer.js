const button = document.getElementById('button')
const path = document.getElementById('button').value

button.addEventListener('click', e=> {
   let data = window.scriptCalls.button(path);
   document.getElementById('output').textContent = data;
   console.log(data);
})