import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { Prerequisite, Season, Unlock } from '../shared/types'

type ImportResult = Unlock | { canceled: true } | { error: string }

// Custom APIs exposed to the renderer, safely, via contextBridge.
// Never expose ipcRenderer or node APIs directly — only specific,
// narrow functions the renderer actually needs.
const api = {
  getVersion: (): Promise<string> => ipcRenderer.invoke('app:getVersion'),
  seasons: {
    list: (): Promise<Season[]> => ipcRenderer.invoke('seasons:list'),
    create: (name: string, number: number): Promise<Season> =>
      ipcRenderer.invoke('seasons:create', name, number),
    delete: (id: string): Promise<void> => ipcRenderer.invoke('seasons:delete', id),
    setComplete: (seasonId: string, done: boolean): Promise<Unlock[]> =>
      ipcRenderer.invoke('seasons:setComplete', seasonId, done)
  },
  unlocks: {
    list: (): Promise<Unlock[]> => ipcRenderer.invoke('unlocks:list'),
    delete: (id: string): Promise<void> => ipcRenderer.invoke('unlocks:delete', id),
    updatePrerequisites: (id: string, prerequisites: Prerequisite[]): Promise<void> =>
      ipcRenderer.invoke('unlocks:updatePrerequisites', id, prerequisites),
    toggleChallenge: (
      unlockId: string,
      stage: number,
      challengeId: string
    ): Promise<Unlock | undefined> =>
      ipcRenderer.invoke('unlocks:toggleChallenge', unlockId, stage, challengeId),
    setStageComplete: (
      unlockId: string,
      stage: number,
      done: boolean
    ): Promise<Unlock | undefined> =>
      ipcRenderer.invoke('unlocks:setStageComplete', unlockId, stage, done),
    setUnlockComplete: (unlockId: string, done: boolean): Promise<Unlock | undefined> =>
      ipcRenderer.invoke('unlocks:setUnlockComplete', unlockId, done),
    import: (seasonId: string): Promise<ImportResult> =>
      ipcRenderer.invoke('unlocks:import', seasonId)
  }
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
