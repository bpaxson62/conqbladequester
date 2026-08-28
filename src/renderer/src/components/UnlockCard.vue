<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Challenge, Stage, Unlock } from '../../../shared/types'
import {
  canUncheckChallenge,
  canUndoStage,
  canUndoUnlock,
  isStageAvailable,
  isStageComplete,
  isUnlockComplete,
  stageProgress
} from '../lib/progress'
import { challengeHasTag, fuzzyScore } from '../lib/search'
import { useUnlockStore } from '../stores/unlocks'

const props = defineProps<{
  unlock: Unlock
  available: boolean
  seasonUnlocks: Unlock[]
  searchQuery: string
  activeTag: string | null
}>()

const store = useUnlockStore()

// Auto-expand a card so its currently active stage is visible right away
// when there's actually something to work on — but leave locked or
// fully-completed unlocks collapsed, since there's nothing actionable to
// show. Computed once at setup, so switching seasons (which remounts
// each card fresh) re-evaluates this per unlock.
const expanded = ref(props.available && !isUnlockComplete(props.unlock))

const rewardIcon: Record<string, string> = { unit: '🛡️', weapon: '⚔️', item: '🎁' }

const sortedStages = computed(() => [...props.unlock.stages].sort((a, b) => a.stage - b.stage))

// Default to whichever stage the player's actually working on: the first
// available-but-not-yet-complete one, or the last stage if everything's
// done. Computed once at setup so it doesn't jump around as the player
// checks things off mid-session.
const activeStage = ref<number>(pickDefaultStage())
function pickDefaultStage(): number {
  const stages = sortedStages.value
  const current = stages.find((s) => isStageAvailable(props.unlock, s.stage) && !isStageComplete(s))
  return (current ?? stages[stages.length - 1] ?? stages[0])?.stage ?? 1
}

const activeStageObj = computed(
  () => sortedStages.value.find((s) => s.stage === activeStage.value) ?? sortedStages.value[0]
)

function stageAvailable(stage: number): boolean {
  return isStageAvailable(props.unlock, stage)
}

function selectStage(stage: Stage): void {
  if (!props.available || !stageAvailable(stage.stage)) return
  activeStage.value = stage.stage
}

function toggle(stage: number, challengeId: string): void {
  if (!props.available || !stageAvailable(stage)) return
  const stageObj = sortedStages.value.find((s) => s.stage === stage)
  const challenge = stageObj?.challenges.find((c) => c.id === challengeId)
  if (
    challenge?.done &&
    stageObj &&
    !canUncheckChallenge(props.unlock, stageObj, props.seasonUnlocks)
  ) {
    return
  }
  store.toggleChallenge(props.unlock.id, stage, challengeId)
}

// Click a stage's header to instantly check off every challenge in it (or
// uncheck them all again if it's already complete) — a shortcut for when
// you already know you finished a stage and don't want to click each
// quest individually. Unchecking is blocked once something later relies
// on this stage staying complete.
function toggleWholeStage(stage: Stage): void {
  if (!props.available || !stageAvailable(stage.stage)) return
  const complete = isStageComplete(stage)
  if (complete && !canUndoStage(props.unlock, stage, props.seasonUnlocks)) return
  store.setStageComplete(props.unlock.id, stage.stage, !complete)
}

function toggleWholeUnlock(): void {
  if (!props.available) return
  const complete = isUnlockComplete(props.unlock)
  if (complete && !canUndoUnlock(props.unlock, props.seasonUnlocks)) return
  store.setUnlockComplete(props.unlock.id, !complete)
}

function stageLocked(stage: Stage): boolean {
  return isStageComplete(stage) && !canUndoStage(props.unlock, stage, props.seasonUnlocks)
}

const unlockLocked = computed(
  () => isUnlockComplete(props.unlock) && !canUndoUnlock(props.unlock, props.seasonUnlocks)
)

// Whether a challenge matches the current search box/tag — same "active
// quest" rules as the season count badge (not done yet), so a row only
// highlights if it would actually count toward that number. Purely a
// visual cue: it never filters, hides, or changes anything else here.
function isMatched(challenge: Challenge): boolean {
  if (challenge.done) return false
  if (!props.searchQuery.trim() && !props.activeTag) return false
  if (props.activeTag && !challengeHasTag(challenge, props.activeTag)) return false
  if (props.searchQuery.trim() && fuzzyScore(props.searchQuery, challenge.text) === null) {
    return false
  }
  return true
}
</script>

<template>
  <div
    class="unlock-card"
    :class="{ locked: !available }"
  >
    <div
      class="header"
      @click="expanded = !expanded"
    >
      <div class="title">
        <span class="reward-icon">{{ rewardIcon[unlock.rewardType] ?? '🎁' }}</span>
        <div>
          <h3>{{ unlock.name }}</h3>
          <p class="meta">
            Tier {{ unlock.tier }}
            <span
              v-if="isUnlockComplete(unlock)"
              class="badge complete"
            >Complete</span>
            <span
              v-else-if="!available"
              class="badge locked"
            >Locked</span>
          </p>
        </div>
      </div>
      <div class="header-actions">
        <button
          type="button"
          class="complete-toggle"
          :class="{ done: isUnlockComplete(unlock), protected: unlockLocked }"
          :title="
            unlockLocked
              ? 'Locked in — a later unlock already has progress that depends on this'
              : 'Mark the whole unlock complete'
          "
          @click.stop="toggleWholeUnlock"
        >
          {{ unlockLocked ? '🔒' : '✓' }}
        </button>
        <span class="chevron">{{ expanded ? '▾' : '▸' }}</span>
      </div>
    </div>

    <div
      v-if="expanded"
      class="body"
    >
      <div class="tabs">
        <button
          v-for="stage in sortedStages"
          :key="stage.stage"
          type="button"
          class="tab"
          :class="{
            active: stage.stage === activeStage,
            complete: isStageComplete(stage),
            locked: !stageAvailable(stage.stage)
          }"
          :disabled="!stageAvailable(stage.stage)"
          @click="selectStage(stage)"
        >
          Stage {{ stage.stage }}
          <span v-if="isStageComplete(stage)">✓</span>
          <span v-else-if="!stageAvailable(stage.stage)">🔒</span>
          <span
            v-else
            class="tab-count"
          >{{ stageProgress(stage).done }}/{{ stageProgress(stage).required }}</span>
        </button>
      </div>

      <div
        v-if="activeStageObj"
        class="stage-panel"
      >
        <div
          class="stage-header"
          :class="{ clickable: stageAvailable(activeStageObj.stage) }"
          :title="
            stageLocked(activeStageObj)
              ? 'Locked in — a later stage or unlock already has progress that depends on this'
              : 'Click to check off the whole stage'
          "
          @click="toggleWholeStage(activeStageObj)"
        >
          <strong>Stage {{ activeStageObj.stage }} progress</strong>
          <span
            class="stage-count"
            :class="{ met: isStageComplete(activeStageObj) }"
          >
            {{ stageProgress(activeStageObj).done }}/{{ stageProgress(activeStageObj).required }}
            <span v-if="stageLocked(activeStageObj)">🔒</span>
          </span>
        </div>

        <ul>
          <li
            v-for="challenge in activeStageObj.challenges"
            :key="challenge.id"
            class="challenge-row"
            :class="{
              done: challenge.done,
              protected:
                challenge.done && !canUncheckChallenge(unlock, activeStageObj, seasonUnlocks),
              matched: isMatched(challenge)
            }"
            :title="
              challenge.done && !canUncheckChallenge(unlock, activeStageObj, seasonUnlocks)
                ? 'Locked in — a later stage or unlock already has progress that depends on this'
                : ''
            "
            @click="toggle(activeStageObj.stage, challenge.id)"
          >
            <span class="check-mark">{{ challenge.done ? '✓' : '' }}</span>
            <span class="challenge-text">{{ challenge.text }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.unlock-card {
  background: #26282c;
  border: 1px solid #34363b;
  border-radius: 10px;
  overflow: hidden;
}
.unlock-card.locked {
  opacity: 0.6;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1rem;
  cursor: pointer;
}
.title {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.reward-icon {
  font-size: 1.3rem;
}
h3 {
  margin: 0;
  font-size: 0.95rem;
}
.meta {
  margin: 0.15rem 0 0;
  font-size: 0.78rem;
  color: #9a9ba0;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.badge {
  padding: 0.05rem 0.5rem;
  border-radius: 999px;
  font-size: 0.72rem;
}
.badge.complete {
  background: #2b5b39;
  color: #8ef0a8;
}
.badge.locked {
  background: #5b3a2b;
  color: #f0b28e;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.complete-toggle {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 999px;
  border: 1px solid #4a4c52;
  background: transparent;
  color: #6a6c72;
  cursor: pointer;
  font-size: 0.85rem;
  line-height: 1;
}
.complete-toggle:hover {
  border-color: #8ef0a8;
  color: #8ef0a8;
}
.complete-toggle.done {
  background: #2b5b39;
  border-color: #2b5b39;
  color: #8ef0a8;
}
.complete-toggle.protected {
  cursor: default;
}
.chevron {
  color: #9a9ba0;
}
.body {
  padding: 0 1rem 1rem;
  border-top: 1px solid #34363b;
}
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.9rem;
}
.tab {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  border: 1px solid #3f4147;
  background: #2b2d31;
  color: #d6d7db;
  font-size: 0.78rem;
  cursor: pointer;
  font-family: inherit;
}
.tab:hover:not(:disabled) {
  border-color: #4752c4;
}
.tab.active {
  border-color: #5865f2;
  background: #313463;
  color: white;
}
.tab.complete {
  color: #8ef0a8;
}
.tab.active.complete {
  color: #d6ffe0;
}
.tab.locked,
.tab:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.tab-count {
  color: #9a9ba0;
  font-size: 0.72rem;
}
.stage-panel {
  margin-top: 0.9rem;
}
.stage-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.4rem;
  margin: 0 0 0.5rem -0.4rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #d6d7db;
}
.stage-header.clickable {
  cursor: pointer;
}
.stage-header.clickable:hover {
  background: #2f3136;
}
.stage-count {
  font-weight: 400;
  font-size: 0.75rem;
  color: #9a9ba0;
}
.stage-count.met {
  color: #8ef0a8;
}
.stage-panel ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.challenge-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-height: 2.4rem;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  border: 1px solid #34363b;
  background: #2b2d31;
  font-size: 0.85rem;
  cursor: pointer;
  user-select: none;
}
.challenge-row:hover {
  border-color: #4752c4;
}
.challenge-row.done {
  background: #21301f;
  border-color: #2b5b39;
}
.challenge-row.protected {
  cursor: default;
}
.challenge-row.protected:hover {
  border-color: #2b5b39;
}
.challenge-row.matched {
  box-shadow: 0 0 0 2px #eab308 inset;
}
.check-mark {
  flex: none;
  width: 1.3rem;
  height: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid #4a4c52;
  color: #8ef0a8;
  font-size: 0.85rem;
}
.challenge-row.done .check-mark {
  border-color: #2b5b39;
  background: #2b5b39;
}
.challenge-text {
  flex: 1;
}
.challenge-row.done .challenge-text {
  text-decoration: line-through;
  color: #8a8b90;
}
</style>
