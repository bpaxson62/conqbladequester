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
 * number, and the challenge's stable `key` — NOT random, and NOT its
 * array position. That's what lets bundled content be re-synced on every
 * app start (picking up new/edited challenges from app updates) without
 * discarding a user's checked-off progress: the same challenge keeps the
 * same id across runs even if challenges around it are added, removed, or
 * reordered. Editing a challenge's text is likewise safe, since the id
 * doesn't depend on it.
 *
 * Keys were originally seeded from each challenge's position within its
 * stage, so ids stayed byte-identical when this replaced position-based
 * ids — no player progress moved. From that point on a key is frozen:
 * new challenges take the next unused key in their stage, and a removed
 * challenge's key is retired rather than reused.
 *
 * Files without keys (hand-written, or imported by a user) fall back to
 * array position, which is the old behaviour. Mixing keyed and unkeyed
 * challenges in one stage can collide, so that is rejected outright.
 */
function groupIntoStages(
  unlockId: string,
  challenges: { key?: number; text: string; stage: number; tags?: string[] }[],
  requiredPerStage: number | undefined,
  filePath: string
): Stage[] {
  const byStage = new Map<number, { key?: number; text: string; tags?: string[] }[]>()
  for (const c of challenges) {
    if (!byStage.has(c.stage)) byStage.set(c.stage, [])
    byStage.get(c.stage)!.push({ key: c.key, text: c.text, tags: c.tags })
  }
  return [...byStage.entries()]
    .sort(([a], [b]) => a - b)
    .map(([stage, items]) => {
      const seen = new Set<number>()
      const challenges = items.map((item, index) => {
        const key = item.key ?? index
        if (seen.has(key)) {
          throw new Error(
            `"${filePath}" stage ${stage} has two challenges with key ${key}. ` +
              'Keys must be unique within a stage — a collision would make two ' +
              "quests share one id and corrupt players' saved progress."
          )
        }
        seen.add(key)
        return {
          id: `${unlockId}:s${stage}:${key}`,
          text: item.text,
          done: false,
          ...(item.tags && item.tags.length > 0 ? { tags: item.tags } : {})
        }
      })
      return { stage, requiredCount: requiredPerStage ?? items.length, challenges }
    })
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
    stages: groupIntoStages(id, raw.unitChallenges, raw.requiredPerStage, filePath)
  }

  return { unlock, seasonNumber: raw.season }
}
