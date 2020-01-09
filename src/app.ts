import {  ipcMain, IpcMainEvent } from 'electron';
import { InstructionParser } from './parser/instructionParser';
import { Log } from './instructions/log';
import { LogType } from './instructions/logType';

import '../cpu/shirito-ind-front/backend/cpu';


let parser: InstructionParser = new InstructionParser();

let logs: Array<String> = []

ipcMain.on('add-log', (event: IpcMainEvent, input: String) => {

    const parserReturn = parser.parse(input);
    let logsReturn = [new Log(input, LogType.ECHO)];

    if (parserReturn.error == null) {
        logsReturn.push(...parserReturn.instruction.run())
    }
    else (
        logsReturn.push(new Log(parserReturn.error.message, LogType.ERROR))
    )

    event.reply('render-new-log', logsReturn)
});

const electron = require('electron');
electron.dialog.showErrorBox = (title, content) => {
    console.log(`${title}\n${content}`);
};