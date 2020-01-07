const {ipcRenderer} = require('electron');


document.getElementById("inputCommand").addEventListener("submit", (evt)=>
{
    evt.preventDefault();

    const input = document.getElementById("textField");

    console.log(input.value);
    ipcRenderer.send('add-log', input.value);

    input.value = '';
});

ipcRenderer.on('render-new-log', (event, newLog) => {
    document.getElementById("logs").innerHTML += `${newLog}<br/>`
});