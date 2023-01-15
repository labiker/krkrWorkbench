// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';
/* const { contextBridge } = require('electron'); */

/* contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    // 新建一个 preload.js 文件。该脚本通过 versions 这一全局变量，将 Electron 的 process.versions 对象暴露给渲染器。
    // 能暴露的不仅仅是函数，我们还可以暴露变量
}); */

contextBridge.exposeInMainWorld('controlProgram', {
    minApp: () => ipcRenderer.send('min-app'),
    maxApp: () => ipcRenderer.send('max-app'),
    closeApp: () => ipcRenderer.send('close-app'),
});