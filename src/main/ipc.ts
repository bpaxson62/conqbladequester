import { ipcMain, dialog, BrowserWindow } from 'electron'
import { store } from './store'
import { parseUnlockFile } from './unlockFile'
import type { Season, Unlock } from '../shared/types'

export function registerIpcHandlers(): void {
  // ---- Seasons ----

  ipcMain.handle('seasons:list', (): Season[] => store.get('seasons'))

  ipcMain.handle('seasons:create', (_event, name: string, number: number): Season => {
    // Deterministic id (matches bundled-content sync) so a manually created
    // season merges cleanly if a data file for the same number appears later.
    const id = `season-${number}`
    const existing = store.get('seasons').find((s) => s.id === id)
    if (existing) return existing

    const season: Season = { id, name: name.trim(), number }
    store.set('seasons', [...store.get('seasons'), season])
    return season
  })

  ipcMain.handle('seasons:delete', (_event, id: string): void => {
    store.set(
      'seasons',
      store.get('seasons').filter((s) => s.id !== id)
    )
    // A season's unlocks have no home without it — remove them too.
    store.set(
      'unlocks',
      store.get('unlocks').filter((u) => u.seasonId !== id)
    )
  })

  // ---- Unlocks ----

  ipcMain.handle('unlocks:list', (): Unlock[] => store.get('unlocks'))

  ipcMain.handle('unlocks:delete', (_event, id: string): void => {
    store.set(
      'unlocks',
      store.get('unlocks').filter((u) => u.id !== id)
    )
  })

  ipcMain.handle(
    'unlocks:updatePrerequisites',
    (_event, id: string, prerequisites: { unlockId: string; requiredStages: number }[]) => {
      store.set(
        'unlocks',
        store.get('unlocks').map((u) => (u.id === id ? { ...u, prerequisites } : u))
      )
    }
  )

  // Toggle a single challenge. This is the one source of truth — stage/
  // unlock/season completion are always derived from these, never stored,
  // so unchecking one challenge never resets progress on any other.
  ipcMain.handle(
    'unlocks:toggleChallenge',
    (_event, unlockId: string, stageNumber: number, challengeId: string): Unlock | undefined => {
      const unlocks = store.get('unlocks')
      const unlock = unlocks.find((u) => u.id === unlockId)
      if (!unlock) return undefined

      const updated: Unlock = {
        ...unlock,
        stages: unlock.stages.map((stage) =>
          stage.stage !== stageNumber
            ? stage
            : {
                ...stage,
                challenges: stage.challenges.map((c) =>
                  c.id === challengeId ? { ...c, done: !c.done } : c
                )
              }
        )
      }
      store.set(
        'unlocks',
        unlocks.map((u) => (u.id === unlockId ? updated : u))
      )
      return updated
    }
  )

  // Bulk-set every challenge under a stage/unlock/season to a given
  // done state — this is what "mark complete" (or "mark incomplete") does.
  function setChallenges(unlock: Unlock, done: boolean, onlyStage?: number): Unlock {
    return {
      ...unlock,
      stages: unlock.stages.map((stage) =>
        onlyStage !== undefined && stage.stage !== onlyStage
          ? stage
          : { ...stage, challenges: stage.challenges.map((c) => ({ ...c, done })) }
      )
    }
  }

  ipcMain.handle(
    'unlocks:setStageComplete',
    (_event, unlockId: string, stageNumber: number, done: boolean): Unlock | undefined => {
      const unlocks = store.get('unlocks')
      const unlock = unlocks.find((u) => u.id === unlockId)
      if (!unlock) return undefined
      const updated = setChallenges(unlock, done, stageNumber)
      store.set(
        'unlocks',
        unlocks.map((u) => (u.id === unlockId ? updated : u))
      )
      return updated
    }
  )

  ipcMain.handle(
    'unlocks:setUnlockComplete',
    (_event, unlockId: string, done: boolean): Unlock | undefined => {
      const unlocks = store.get('unlocks')
      const unlock = unlocks.find((u) => u.id === unlockId)
      if (!unlock) return undefined
      const updated = setChallenges(unlock, done)
      store.set(
        'unlocks',
        unlocks.map((u) => (u.id === unlockId ? updated : u))
      )
      return updated
    }
  )

  ipcMain.handle('seasons:setComplete', (_event, seasonId: string, done: boolean): Unlock[] => {
    const unlocks = store.get('unlocks')
    const updatedList = unlocks.map((u) => (u.seasonId === seasonId ? setChallenges(u, done) : u))
    store.set('unlocks', updatedList)
    return updatedList.filter((u) => u.seasonId === seasonId)
  })

  // ---- Import ----

  ipcMain.handle(
    'unlocks:import',
    async (): Promise<Unlock | { canceled: true } | { error: string }> => {
      const win = BrowserWindow.getFocusedWindow()
      const result = await dialog.showOpenDialog(win ?? undefined!, {
        title: 'Import unlock file',
        properties: ['openFile'],
        filters: [{ name: 'Unlock data', extensions: ['js', 'json'] }]
      })
      if (result.canceled || result.filePaths.length === 0) {
        return { canceled: true }
      }

      try {
        const { unlock, seasonNumber } = await parseUnlockFile(result.filePaths[0])
        const unlocks = store.get('unlocks')
        if (unlocks.some((u) => u.id === unlock.id)) {
          return { error: `An unlock with id "${unlock.id}" already exists.` }
        }
        store.set('unlocks', [...unlocks, unlock])

        // Auto-create the season this unlock belongs to if it doesn't exist yet.
        const seasons = store.get('seasons')
        if (!seasons.some((s) => s.id === unlock.seasonId)) {
          store.set('seasons', [
            ...seasons,
            { id: unlock.seasonId, number: seasonNumber, name: `Season ${seasonNumber}` }
          ])
        }

        return unlock
      } catch (err) {
        return { error: err instanceof Error ? err.message : String(err) }
      }
    }
  )
}
