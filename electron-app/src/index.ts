import { StepIconClassKey } from '@mui/material';
import { app, BrowserWindow, ipcMain, dialog, Menu, protocol } from 'electron';
import path from 'path';
import fs from 'fs';

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    frame: true,
    title: '吉里吉里工作台',
    icon: path.join(__dirname, '../../public/icon/icon.ico'),
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  /* Menu.setApplicationMenu(Menu.buildFromTemplate([{
    label: "Application",
    submenu: [
      { label: "About Application"},
      { type: "separator" },
      { label: "Quit", accelerator: "Command+Q", click: () => app.quit() },
    ]}, {
    label: "Edit",
    submenu: [
      { label: "Undo", accelerator: "CmdOrCtrl+Z" },
      { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z" },
      { type: "separator" },
      { label: "Cut", accelerator: "CmdOrCtrl+X" },
      { label: "Copy", accelerator: "CmdOrCtrl+C" },
      { label: "Paste", accelerator: "CmdOrCtrl+V" },
      { label: "Select All", accelerator: "CmdOrCtrl+A" },
    ]},
  ])) */

  ipcMain.on('min-app', () => {
    mainWindow.minimize();
  });

  ipcMain.on('max-app', () => {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
  });

  ipcMain.on('close-app', () => {
    if(mainWindow){
      mainWindow.close();
    }
  });

  ipcMain.on('open-folder', async () => {
    const url = await dialog.showOpenDialog({ properties: ['openFile'] });
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
/* app.on('ready', createWindow); */
app.whenReady().then(()=>{
  ipcMain.handle('get-appPath', () => {
    return __dirname;
  });
  ipcMain.handle('get-imgBase64', (event, relativePath) => {
    const imagePath = path.join(__dirname, '../../' + relativePath);
    const imageBase64 = fs.readFileSync(imagePath).toString('base64');
    return imageBase64;
  })
  createWindow();
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
