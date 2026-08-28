import { app } from 'electron'
import { join } from 'path'
import { readFile, readdir } from 'fs/promises'
import { parseUnlockFile } from './unlockFile'
import { store } from './store'
import type { Season, Unlock } from '../shared/types'

interface SeasonMeta {
  number: number
  name: string
}

/**
 * Where the bundled `data/` directory lives: the project root in dev,
 * or the packaged app's resources directory in a built installer (see
 * `extraResources` in electron-builder.yml, which copies `data/` there).
 */
function dataDir(): string {
  return app.isPackaged ? join(process.resourcesPath, 'data') : join(app.getAppPath(), 'data')
}

async function loadSeasonMeta(): Promise<SeasonMeta[]> {
  try {
    const raw = await readFile(join(dataDir(), 'seasons.json'), 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

/**
 * Recursively collects every .js/.json unlock file under data/unlocks —
 * contributors are free to organize them into subfolders (e.g. one per
 * season) purely for their own convenience; the folder structure has no
 * effect on the app, since each file's own `season` field is what
 * actually determines which season an unlock belongs to.
 */
async function findUnlockFiles(dir?: string): Promise<string[]> {
  const root = dir ?? join(dataDir(), 'unlocks')
  try {
    const entries = await readdir(root, { withFileTypes: true })
    const files: string[] = []
    for (const entry of entries) {
      const entryPath = join(root, entry.name)
      if (entry.isDirectory()) {
        files.push(...(await findUnlockFiles(entryPath)))
      } else if (entry.name.endsWith('.js') || entry.name.endsWith('.json')) {
        files.push(entryPath)
      }
    }
    return files
  } catch {
    return []
  }
}

/**
 * Merges an unlock parsed from a bundled data file into the user's saved
 * unlock, preserving `done` state for any challenge whose id still exists.
 * A brand-new challenge id starts undone; a challenge id that no longer
 * appears in the bundled file (content was edited/removed upstream) is
 * dropped.
 */
function mergeUnlock(incoming: Unlock, existing: Unlock | undefined): Unlock {
  if (!existing) return incoming
  const doneById = new Map<string, boolean>()
  for (const stage of existing.stages) {
    for (const c of stage.challenges) doneById.set(c.id, c.done)
  }
  return {
    ...incoming,
    stages: incoming.stages.map((stage) => ({
      ...stage,
      challenges: stage.challenges.map((c) => ({ ...c, done: doneById.get(c.id) ?? false }))
    }))
  }
}

/**
 * Reads every unlock file bundled under data/unlocks, and merges them into
 * the local store — adding new content, updating edited text/metadata,
 * and always preserving the user's own checked-off progress. Runs once on
 * every app startup, so a new app version with updated/added quest data
 * "just works" without any manual re-import.
 */
export async function syncBundledContent(): Promise<void> {
  const [seasonMeta, filePaths] = await Promise.all([loadSeasonMeta(), findUnlockFiles()])
  const seasonNameByNumber = new Map(seasonMeta.map((s) => [s.number, s.name]))

  const existingUnlocks = store.get('unlocks')
  const existingUnlockById = new Map(existingUnlocks.map((u) => [u.id, u]))
  const seenSeasonNumbers = new Set<number>()
  const seenUnlockIds = new Set<string>()
  const mergedUnlocks: Unlock[] = []

  for (const filePath of filePaths) {
    try {
      const { unlock, seasonNumber } = await parseUnlockFile(filePath)
      if (seenUnlockIds.has(unlock.id)) {
        // Two data files produced the same unlock id (e.g. a leftover
        // duplicate after a rename/move) — keep whichever was found
        // first and skip the rest rather than loading it twice.
        console.error(
          `[content] duplicate unlock id "${unlock.id}" in ${filePath} — ` +
            'already loaded from another file, skipping this one'
        )
        continue
      }
      seenUnlockIds.add(unlock.id)
      seenSeasonNumbers.add(seasonNumber)
      mergedUnlocks.push(mergeUnlock(unlock, existingUnlockById.get(unlock.id)))
    } catch (err) {
      console.error(`[content] failed to load ${filePath}:`, err)
    }
  }

  // Unlocks the user created manually (via "+ Import unlock", not bundled
  // under data/unlocks) are untouched — only ids that came from a bundled
  // file this run get replaced by the merge above.
  const bundledIds = new Set(mergedUnlocks.map((u) => u.id))
  const manualUnlocks = existingUnlocks.filter((u) => !bundledIds.has(u.id))
  store.set('unlocks', [...manualUnlocks, ...mergedUnlocks])

  // Seasons are entirely derived from the bundled files' own `season`
  // fields, so rebuild the list from what was actually seen this run —
  // this both adds newly-introduced seasons and drops ones that no
  // longer have any unlocks pointing at them (e.g. after a season
  // renumber), instead of leaving empty ghost seasons around forever.
  // Existing ids/names are preserved where the season number still
  // matches, so this never re-orders or renames a season on its own.
  const existingSeasons = store.get('seasons')
  const existingSeasonByNumber = new Map(existingSeasons.map((s) => [s.number, s]))
  const finalSeasons: Season[] = [...seenSeasonNumbers]
    .sort((a, b) => a - b)
    .map((number) => {
      const id = `season-${number}`
      const existing = existingSeasonByNumber.get(number)
      return {
        id,
        number,
        name: seasonNameByNumber.get(number) ?? existing?.name ?? `Season ${number}`
      }
    })
  store.set('seasons', finalSeasons)
}
