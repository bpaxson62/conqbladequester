import { basename, extname } from 'path'
import { pathToFileURL } from 'url'
import { readFile } from 'fs/promises'
import type { RewardType, Stage, Unlock, UnlockFileShape } from '../shared/types'

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'unlock'
  )
}

function nameFromFilePath(filePath: string): string {
  return basename(filePath, extname(filePath))
}

/**
 * Challenge ids are derived deterministically from the unlock id, stage
 * number, and position within that stage — NOT random. That's what lets
 * bundled content be re-synced on every app start (picking up new/edited
 * challenges from app updates) without discarding a user's checked-off
 * progress: the same challenge always gets the same id across runs, as
 * long as its unlock id, stage, and position don't change.
 */
function groupIntoStages(
  unlockId: string,
  challenges: { text: string; stage: number; tags?: string[] }[],
  requiredPerStage: number | undefined
): Stage[] {
  const byStage = new Map<number, { text: string; tags?: string[] }[]>()
  for (const c of challenges) {
    if (!byStage.has(c.stage)) byStage.set(c.stage, [])
    byStage.get(c.stage)!.push({ text: c.text, tags: c.tags })
  }
  return [...byStage.entries()]
    .sort(([a], [b]) => a - b)
    .map(([stage, items]) => ({
      stage,
      requiredCount: requiredPerStage ?? items.length,
      challenges: items.map((item, index) => ({
        id: `${unlockId}:s${stage}:${index}`,
        text: item.text,
        done: false,
        ...(item.tags && item.tags.length > 0 ? { tags: item.tags } : {})
      }))
    }))
}

export interface ParsedUnlockFile {
  unlock: Unlock
  seasonNumber: number
}

/**
 * Loads an unlock data file — either the legacy shape (tier/season/
 * unitChallenges only) or that same shape with the newer optional fields
 * (name/rewardType/prerequisites) appended — and normalizes it into an
 * Unlock ready to store, plus the season number it belongs to.
 *
 * Both .js (CommonJS `module.exports = {...}`) and .json files work: Node's
 * ESM loader can import a CommonJS file, exposing `module.exports` as the
 * default export.
 */
export async function parseUnlockFile(filePath: string): Promise<ParsedUnlockFile> {
  let raw: UnlockFileShape

  if (extname(filePath) === '.json') {
    raw = JSON.parse(await readFile(filePath, 'utf-8'))
  } else {
    const mod = (await import(pathToFileURL(filePath).href)) as { default: UnlockFileShape }
    raw = mod.default
  }

  if (!Array.isArray(raw.unitChallenges) || raw.unitChallenges.length === 0) {
    throw new Error(`"${filePath}" has no unitChallenges — nothing to import.`)
  }

  const name = raw.name?.trim() || nameFromFilePath(filePath)
  const rewardType: RewardType = raw.rewardType ?? 'unit'
  const id = raw.id?.trim() || slugify(name)
  const seasonId = `season-${raw.season}`

  const unlock: Unlock = {
    id,
    name,
    rewardType,
    tier: raw.tier,
    seasonId,
    prerequisites: raw.prerequisites ?? [],
    stages: groupIntoStages(id, raw.unitChallenges, raw.requiredPerStage)
  }

  return { unlock, seasonNumber: raw.season }
}
