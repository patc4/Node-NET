import { app, ipcMain, BrowserWindow, IpcMainEvent } from 'electron';
import {InstructionParser} from './parser/instructionParser';
import { Log } from './instructions/log';
import { LogType } from './instructions/logType';

let mainWindow: BrowserWindow;
let parser: InstructionParser = new InstructionParser();

function createWindow() {

    mainWindow = new BrowserWindow({ 
        width: 1800, 
        height: 1200,
        webPreferences: { 
            webSecurity: false,
            nodeIntegration: true
        },
    }); 

    // Uncomment to get developer console for frontend
   //  mainWindow.webContents.openDevTools()
    
    mainWindow.loadURL(`file://${__dirname}/frontend/index.html`); // here is the absolute path to the frontend

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

let logs: Array<String> = []

ipcMain.on('add-log', (event: IpcMainEvent, input: String)=>{

    const instruction = parser.parse(input);

    event.reply('render-new-log', [new Log(input, LogType.ECHO), ...instruction.run()])
});