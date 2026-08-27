import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs exposed to the renderer, safely, via contextBridge.
// Never expose ipcRenderer or node APIs directly — only specific,
// narrow functions the renderer actually needs.
const api = {
  getVersion: (): Promise<string> => ipcRenderer.invoke('app:getVersion')
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
