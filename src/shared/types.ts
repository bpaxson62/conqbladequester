export type RewardType = 'unit' | 'weapon' | 'item'

export interface Challenge {
  id: string
  text: string
  done: boolean
  /** Optional contributor-supplied tags, matched by the quest search/filter
   *  UI in addition to the built-in keyword-derived tags (Siege, Free
   *  Battle, Death Match, Territory War, etc). */
  tags?: string[]
}

export interface Stage {
  stage: number
  challenges: Challenge[]
  /**
   * How many challenges in this stage must be checked done before the
   * stage counts as complete — not necessarily all of them. Set from the
   * unlock's `requiredPerStage` field at import time; defaults to
   * `challenges.length` (i.e. all of them) when that field is omitted.
   */
  requiredCount: number
}

/** Unlock B can require that unlock A has N of its stages fully completed. */
export interface Prerequisite {
  unlockId: string
  requiredStages: number
}

export interface Unlock {
  id: string
  name: string
  rewardType: RewardType
  /** Carried over from the original data format and never populated — every
   *  bundled file says 1. Nothing reads it; it is no longer displayed. Kept
   *  optional so a file *can* record a real unit tier later without the
   *  format forcing a meaningless value on every unlock. */
  tier?: number
  seasonId: string
  /** Empty = available from the start of the season (no prior unlock needed). */
  prerequisites: Prerequisite[]
  stages: Stage[]
}

export interface Season {
  id: string
  name: string
  /** The old data files' numeric "season" field, kept for import matching. */
  number: number
}

/**
 * The raw shape of a legacy/authored unlock data file (e.g. Kheshigs.js),
 * extended with a few optional metadata fields. Existing files only need
 * those new fields appended — `unitChallenges` and `stage` stay as-is.
 */
export interface UnlockFileShape {
  id?: string
  name?: string
  rewardType?: RewardType
  /** Optional — see `tier` on Unlock. */
  tier?: number
  season: number
  prerequisites?: { unlockId: string; requiredStages: number }[]
  /**
   * How many challenges must be done, per stage, for that stage to count
   * as complete. Omit to require all challenges in the stage (the
   * default). Applies uniformly to every stage in this unlock.
   */
  requiredPerStage?: number
  unitChallenges: {
    /** Stable identifier for this challenge within its stage. Assigned once
     *  when the challenge is first added and never changed or reused
     *  afterwards — it is what a player's saved progress is matched on, so
     *  renumbering keys silently moves completed checkmarks onto the wrong
     *  quests. Omitted only in hand-written/imported files, where the
     *  challenge's array position is used as a fallback. */
    key?: number
    text: string
    stage: number
    tags?: string[]
  }[]
}
