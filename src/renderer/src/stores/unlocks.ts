import { defineStore } from 'pinia'
import type { Prerequisite, Season, Unlock } from '../../../shared/types'
import { isSeasonComplete, isUnlockAvailable, isUnlockComplete } from '../lib/progress'

interface State {
  seasons: Season[]
  unlocks: Unlock[]
  loaded: boolean
}

export const useUnlockStore = defineStore('unlocks', {
  state: (): State => ({
    seasons: [],
    unlocks: [],
    loaded: false
  }),

  getters: {
    unlocksBySeason:
      (state) =>
      (seasonId: string): Unlock[] =>
        state.unlocks.filter((u) => u.seasonId === seasonId),

    seasonComplete:
      (state) =>
      (seasonId: string): boolean =>
        isSeasonComplete(state.unlocks.filter((u) => u.seasonId === seasonId)),

    unlockAvailable: (state) => (unlock: Unlock): boolean => isUnlockAvailable(unlock, state.unlocks),

    unlockComplete: () => (unlock: Unlock): boolean => isUnlockComplete(unlock)
  },

  actions: {
    async load(): Promise<void> {
      const [seasons, unlocks] = await Promise.all([
        window.api.seasons.list(),
        window.api.unlocks.list()
      ])
      this.seasons = seasons
      this.unlocks = unlocks
      this.loaded = true
    },

    async createSeason(name: string, number: number): Promise<void> {
      const season = await window.api.seasons.create(name, number)
      this.seasons.push(season)
    },

    async deleteSeason(id: string): Promise<void> {
      await window.api.seasons.delete(id)
      this.seasons = this.seasons.filter((s) => s.id !== id)
      this.unlocks = this.unlocks.filter((u) => u.seasonId !== id)
    },

    async setSeasonComplete(seasonId: string, done: boolean): Promise<void> {
      const updated = await window.api.seasons.setComplete(seasonId, done)
      this.replaceUnlocks(updated)
    },

    async importUnlock(seasonId: string): Promise<{ error: string } | undefined> {
      const result = await window.api.unlocks.import(seasonId)
      if ('canceled' in result) return undefined
      if ('error' in result) return result
      this.unlocks.push(result)
      return undefined
    },

    async deleteUnlock(id: string): Promise<void> {
      await window.api.unlocks.delete(id)
      this.unlocks = this.unlocks.filter((u) => u.id !== id)
    },

    async updatePrerequisites(id: string, prerequisites: Prerequisite[]): Promise<void> {
      await window.api.unlocks.updatePrerequisites(id, prerequisites)
      const unlock = this.unlocks.find((u) => u.id === id)
      if (unlock) unlock.prerequisites = prerequisites
    },

    async toggleChallenge(unlockId: string, stage: number, challengeId: string): Promise<void> {
      const updated = await window.api.unlocks.toggleChallenge(unlockId, stage, challengeId)
      this.replaceUnlock(updated)
    },

    async setStageComplete(unlockId: string, stage: number, done: boolean): Promise<void> {
      const updated = await window.api.unlocks.setStageComplete(unlockId, stage, done)
      this.replaceUnlock(updated)
    },

    async setUnlockComplete(unlockId: string, done: boolean): Promise<void> {
      const updated = await window.api.unlocks.setUnlockComplete(unlockId, done)
      this.replaceUnlock(updated)
    },

    replaceUnlock(updated: Unlock | undefined): void {
      if (!updated) return
      const idx = this.unlocks.findIndex((u) => u.id === updated.id)
      if (idx !== -1) this.unlocks[idx] = updated
    },

    replaceUnlocks(updatedList: Unlock[]): void {
      for (const updated of updatedList) this.replaceUnlock(updated)
    }
  }
})
