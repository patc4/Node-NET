
import { app, BrowserWindow } from 'electron';

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

    // Uncomment to get developer console for frontend
    mainWindow.webContents.openDevTools()

    mainWindow.loadURL(`file://${__dirname}/../frontend/index.html`); // here is the absolute path to the frontend

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