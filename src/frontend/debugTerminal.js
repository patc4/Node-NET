const { ipcRenderer } = require('electron');
const { LogTypes } = require('../instructions/logType');


const colors = [
    '#777777', // ECHO
    '#000000', // LOG
    '#FF0000' // ERROR
]

document.getElementById("inputCommand").addEventListener("submit", (evt) => {
    evt.preventDefault();

    const input = document.getElementById("textField");

    console.log(input.value);
    ipcRenderer.send('add-log', input.value);

    input.value = '';
});

ipcRenderer.on('render-new-log', (event, newLog) => {
    let logsFormat = '';

    for (let i = 0; i < newLog.length; i++) {
        logsFormat += `<span style="color: ${colors[newLog[i].logType]}">${newLog[i].logType == 0 ? '>' : ''} ${newLog[i].value}</span><br/>`
    }

    document.getElementById("logs").innerHTML += logsFormat
});