const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain;

let mainWindow;

function createWindow () {

    mainWindow = new BrowserWindow({
        width: 1800,
        height: 1200,
        movable: false,
        title: "Hands on Electron",
        frame: false,
        maximized: false,
        center: true
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.on('closed', () => {
        mainWindow = null;
    })

    const childWindow = new BrowserWindow({
       parent: mainWindow
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipc.on('log-error', () => {
    console.log('Erreur ! Veuillez rapporter ce bug au développeur de l\'application.');
});
