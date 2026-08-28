import { ElectronAPI } from '@electron-toolkit/preload'
import type { Prerequisite, Season, Unlock } from '../shared/types'

type ImportResult = Unlock | { canceled: true } | { error: string }

interface Api {
  getVersion: () => Promise<string>
  seasons: {
    list: () => Promise<Season[]>
    create: (name: string, number: number) => Promise<Season>
    delete: (id: string) => Promise<void>
    setComplete: (seasonId: string, done: boolean) => Promise<Unlock[]>
  }
  unlocks: {
    list: () => Promise<Unlock[]>
    delete: (id: string) => Promise<void>
    updatePrerequisites: (id: string, prerequisites: Prerequisite[]) => Promise<void>
    toggleChallenge: (
      unlockId: string,
      stage: number,
      challengeId: string
    ) => Promise<Unlock | undefined>
    setStageComplete: (unlockId: string, stage: number, done: boolean) => Promise<Unlock | undefined>
    setUnlockComplete: (unlockId: string, done: boolean) => Promise<Unlock | undefined>
    import: (seasonId: string) => Promise<ImportResult>
  }
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
