const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  save: (data) => ipcRenderer.send('save', data)
})