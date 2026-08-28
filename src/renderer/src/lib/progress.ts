import type { Challenge, Stage, Unlock } from '../../../shared/types'

/**
 * A stage is complete once at least `requiredCount` of its challenges are
 * checked done — not necessarily all of them (requiredCount defaults to
 * "all" when a data file doesn't set requiredPerStage).
 */
export function isStageComplete(stage: Stage): boolean {
  return (
    stage.challenges.length > 0 &&
    stage.challenges.filter((c) => c.done).length >= stage.requiredCount
  )
}

export function stageProgress(stage: Stage): { done: number; required: number } {
  return { done: stage.challenges.filter((c) => c.done).length, required: stage.requiredCount }
}

export function completedStageCount(unlock: Unlock): number {
  return unlock.stages.filter(isStageComplete).length
}

export function isUnlockComplete(unlock: Unlock): boolean {
  return unlock.stages.length > 0 && unlock.stages.every(isStageComplete)
}

/**
 * An unlock with no prerequisites is available from the start of its
 * season. Otherwise every prerequisite unlock must have at least the
 * required number of completed stages.
 */
export function isUnlockAvailable(unlock: Unlock, allUnlocks: Unlock[]): boolean {
  if (unlock.prerequisites.length === 0) return true
  return unlock.prerequisites.every((prereq) => {
    const other = allUnlocks.find((u) => u.id === prereq.unlockId)
    if (!other) return false
    return completedStageCount(other) >= prereq.requiredStages
  })
}

export function isSeasonComplete(seasonUnlocks: Unlock[]): boolean {
  return seasonUnlocks.length > 0 && seasonUnlocks.every(isUnlockComplete)
}

/**
 * Whether an unlock has any recorded progress at all — used to decide
 * whether something else's progress is currently "relying on" a prior
 * unlock/stage staying complete.
 */
export function hasAnyChallengeProgress(unlock: Unlock): boolean {
  return unlock.stages.some((s) => s.challenges.some((c) => c.done))
}

/**
 * Once you've moved on and other progress depends on a stage/unlock
 * staying complete, retroactively unchecking it would silently break
 * that downstream progress. These guards say whether undoing a given
 * stage (dropping it below its required count) is currently safe —
 * i.e. nothing later already has progress that relies on it. Checking
 * *more* things off is always safe and never needs a guard.
 */
export function canUndoStage(unlock: Unlock, stage: Stage, seasonUnlocks: Unlock[]): boolean {
  // A later stage in the same unlock already has progress — that stage
  // only became reachable because this one was complete.
  const laterStageHasProgress = unlock.stages.some(
    (s) => s.stage > stage.stage && s.challenges.some((c) => c.done)
  )
  if (laterStageHasProgress) return false

  // Some other unlock in the season requires this unlock to have enough
  // completed stages, and already has progress of its own.
  const newCompletedCount = completedStageCount(unlock) - 1
  return !seasonUnlocks.some((other) => {
    if (other.id === unlock.id) return false
    const prereq = other.prerequisites.find((p) => p.unlockId === unlock.id)
    if (!prereq) return false
    return hasAnyChallengeProgress(other) && newCompletedCount < prereq.requiredStages
  })
}

/**
 * Whether unchecking this specific challenge would actually drop its
 * stage below the required count — if the stage stays complete anyway
 * (more were checked than required), unchecking one is harmless.
 */
export function canUncheckChallenge(
  unlock: Unlock,
  stage: Stage,
  seasonUnlocks: Unlock[]
): boolean {
  const doneCount = stage.challenges.filter((c) => c.done).length
  const wouldDropBelowThreshold = doneCount - 1 < stage.requiredCount
  if (!wouldDropBelowThreshold) return true
  return canUndoStage(unlock, stage, seasonUnlocks)
}

/**
 * Whether the whole unlock can be marked incomplete — blocked if any
 * other unlock in the season that depends on it already has progress.
 */
export function canUndoUnlock(unlock: Unlock, seasonUnlocks: Unlock[]): boolean {
  return !seasonUnlocks.some((other) => {
    if (other.id === unlock.id) return false
    const prereq = other.prerequisites.find((p) => p.unlockId === unlock.id)
    if (!prereq) return false
    return hasAnyChallengeProgress(other) && prereq.requiredStages > 0
  })
}

/**
 * Stages within an unlock are sequential: stage N can't be worked on until
 * stage N-1 is fully complete. The first stage is always available.
 */
export function isStageAvailable(unlock: Unlock, stageNumber: number): boolean {
  const sorted = [...unlock.stages].sort((a, b) => a.stage - b.stage)
  const idx = sorted.findIndex((s) => s.stage === stageNumber)
  if (idx <= 0) return true
  return isStageComplete(sorted[idx - 1])
}

/**
 * How many prerequisite "hops" deep an unlock is: 0 for an unlock with no
 * prerequisites, otherwise 1 + the deepest of its prerequisites' own
 * depth. Cycles (shouldn't happen, but data files are hand-authored)
 * are guarded against rather than infinite-looping.
 */
function unlockDepth(unlock: Unlock, byId: Map<string, Unlock>, seen: Set<string>): number {
  if (unlock.prerequisites.length === 0) return 0
  if (seen.has(unlock.id)) return 0
  seen.add(unlock.id)
  let deepest = 0
  for (const prereq of unlock.prerequisites) {
    const other = byId.get(prereq.unlockId)
    if (!other) continue
    deepest = Math.max(deepest, 1 + unlockDepth(other, byId, seen))
  }
  return deepest
}

/**
 * Orders unlocks so ones with no prerequisites come first, then unlocks
 * that depend only on those, and so on — a rough "what can I work on
 * first" reading order. Ties broken alphabetically for stability.
 */
export function sortUnlocksByDependencyDepth(unlocks: Unlock[]): Unlock[] {
  const byId = new Map(unlocks.map((u) => [u.id, u]))
  return [...unlocks].sort((a, b) => {
    const depthDiff = unlockDepth(a, byId, new Set()) - unlockDepth(b, byId, new Set())
    return depthDiff !== 0 ? depthDiff : a.name.localeCompare(b.name)
  })
}

export interface ActiveQuest {
  unlock: Unlock
  stage: Stage
  challenge: Challenge
}

/**
 * The quests a player can actually go work on right now in this season:
 * challenges that aren't done yet, belonging to a stage that's unlocked
 * (its unlock is available and any earlier stage is complete) — i.e.
 * exactly the set search/filter should be searching, since anything
 * locked isn't "active" and anything already done isn't left to do.
 */
export function activeQuests(seasonUnlocks: Unlock[]): ActiveQuest[] {
  const results: ActiveQuest[] = []
  for (const unlock of seasonUnlocks) {
    if (!isUnlockAvailable(unlock, seasonUnlocks)) continue
    for (const stage of unlock.stages) {
      if (!isStageAvailable(unlock, stage.stage)) continue
      for (const challenge of stage.challenges) {
        if (challenge.done) continue
        results.push({ unlock, stage, challenge })
      }
    }
  }
  return results
}

/** How many quests are currently active in a season — shown as the count badge on its tab. */
export function seasonActiveQuestCount(seasonUnlocks: Unlock[]): number {
  return activeQuests(seasonUnlocks).length
}
