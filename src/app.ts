import { app, ipcMain, BrowserWindow, IpcMainEvent } from 'electron';

let mainWindow: BrowserWindow;

function createWindow() {

    mainWindow = new BrowserWindow({ 
        width: 1800, 
        height: 1200,
        webPreferences: { 
            webSecurity: false,
            nodeIntegration: true
        },
    }); 

    // Uncomment to get developer console
    // mainWindow.webContents.openDevTools()
    
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

ipcMain.on('add-log', (event: IpcMainEvent, log: String)=>{
    log = `> ${log}`
    logs.push(log);

    event.reply('render-new-log', log)
});