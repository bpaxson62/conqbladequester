import Store from 'electron-store'
import type { Season, Unlock } from '../shared/types'

type StoreSchema = {
  seasons: Season[]
  unlocks: Unlock[]
}

/**
 * File-backed JSON store (via electron-store), saved under Electron's
 * per-OS userData directory — separate from the app's install location,
 * so it survives auto-updates replacing the app files.
 */
export const store = new Store<StoreSchema>({
  defaults: {
    seasons: [],
    unlocks: []
  }
})
