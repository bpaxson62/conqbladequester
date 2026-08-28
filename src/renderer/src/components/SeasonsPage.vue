<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Unlock } from '../../../shared/types'
import { useUnlockStore } from '../stores/unlocks'
import {
  activeQuests,
  isSeasonComplete,
  seasonActiveQuestCount,
  sortUnlocksByDependencyDepth
} from '../lib/progress'
import { availableTags, challengeHasTag, fuzzyScore } from '../lib/search'
import UnlockCard from './UnlockCard.vue'

const store = useUnlockStore()

const activeSeasonId = ref<string | null>(null)
const searchQuery = ref('')
const activeTag = ref<string | null>(null)

// Default to the first season once seasons load, and keep the selection
// valid if the active season ever disappears (e.g. content re-sync).
watch(
  () => store.seasons,
  (seasons) => {
    if (seasons.length === 0) {
      activeSeasonId.value = null
      return
    }
    if (!activeSeasonId.value || !seasons.some((s) => s.id === activeSeasonId.value)) {
      activeSeasonId.value = seasons[0].id
    }
  },
  { immediate: true }
)

const activeSeason = computed(() => store.seasons.find((s) => s.id === activeSeasonId.value))

function orderedUnlocks(seasonId: string): Unlock[] {
  return sortUnlocksByDependencyDepth(store.unlocksBySeason(seasonId))
}

function toggleSeasonComplete(seasonId: string): void {
  store.setSeasonComplete(seasonId, !isSeasonComplete(store.unlocksBySeason(seasonId)))
}

// Tag chips are offered across all seasons' active quests, not just the
// one currently selected, so they stay available and stable no matter
// which season tab you're looking at.
const tagOptions = computed(() =>
  availableTags(
    store.seasons.flatMap((season) =>
      activeQuests(store.unlocksBySeason(season.id)).map((q) => q.challenge)
    )
  )
)

// Only one tag chip can be active at a time — picking a different one
// (or clicking the active one again) always replaces/clears the
// selection rather than combining tags.
function toggleTag(tag: string): void {
  activeTag.value = activeTag.value === tag ? null : tag
}

/**
 * How many of a season's currently-active quests match the search box
 * and selected tags — purely a display count for the season button.
 * With no query and no tags selected this is just the total active
 * count. This never filters, hides, or otherwise touches the actual
 * unlock/stage/quest tracking UI below — that always shows everything,
 * exactly as if search didn't exist.
 */
function matchCount(seasonId: string): number {
  const query = searchQuery.value.trim()
  const tag = activeTag.value
  if (!query && !tag) return seasonActiveQuestCount(store.unlocksBySeason(seasonId))

  return activeQuests(store.unlocksBySeason(seasonId)).filter((q) => {
    if (tag && !challengeHasTag(q.challenge, tag)) return false
    if (query && fuzzyScore(query, q.challenge.text) === null) return false
    return true
  }).length
}
</script>

<template>
  <div class="seasons-page">
    <p
      v-if="store.seasons.length === 0"
      class="empty"
    >
      No quest data yet — add unlock files under
      <code>data/unlocks/</code> (see <code>data/README.md</code>).
    </p>

    <div
      v-if="store.seasons.length > 0"
      class="search-bar"
    >
      <input
        v-model="searchQuery"
        type="text"
        class="search-input"
        placeholder="Search quests…"
      >
      <div class="tag-chips">
        <button
          v-for="tag in tagOptions"
          :key="tag"
          type="button"
          class="tag-chip"
          :class="{ active: activeTag === tag }"
          @click="toggleTag(tag)"
        >
          {{ tag }}
        </button>
      </div>
    </div>

    <nav
      v-if="store.seasons.length > 1"
      class="season-tabs"
    >
      <button
        v-for="season in store.seasons"
        :key="season.id"
        type="button"
        class="season-tab"
        :class="{
          active: season.id === activeSeasonId,
          complete: isSeasonComplete(store.unlocksBySeason(season.id))
        }"
        @click="activeSeasonId = season.id"
      >
        {{ season.name }}
        <span
          v-if="isSeasonComplete(store.unlocksBySeason(season.id))"
        >✓</span>
        <span
          v-else
          class="tab-quest-count"
        >{{ matchCount(season.id) }}</span>
      </button>
    </nav>

    <section
      v-if="activeSeason"
      class="season"
    >
      <h2
        class="season-header"
        title="Click to mark the whole season complete"
        @click="toggleSeasonComplete(activeSeason.id)"
      >
        {{ activeSeason.name }}
        <span
          v-if="isSeasonComplete(store.unlocksBySeason(activeSeason.id))"
          class="badge complete"
        >Complete</span>
        <span
          v-else
          class="badge count"
        >{{ matchCount(activeSeason.id) }} matching</span>
      </h2>

      <p
        v-if="store.unlocksBySeason(activeSeason.id).length === 0"
        class="empty"
      >
        No unlocks in this season yet.
      </p>

      <div class="unlock-grid">
        <UnlockCard
          v-for="unlock in orderedUnlocks(activeSeason.id)"
          :key="unlock.id"
          :unlock="unlock"
          :available="store.unlockAvailable(unlock)"
          :season-unlocks="store.unlocksBySeason(activeSeason.id)"
          :search-query="searchQuery"
          :active-tag="activeTag"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.seasons-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.empty {
  color: #9a9ba0;
}
.empty code {
  background: #2b2d31;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}
.search-bar {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.search-input {
  width: 100%;
  max-width: 420px;
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  border: 1px solid #34363b;
  background: #1e1f22;
  color: #e6e6e6;
  font-size: 0.85rem;
  font-family: inherit;
}
.search-input:focus {
  outline: none;
  border-color: #5865f2;
}
.tag-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.tag-chip {
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  border: 1px solid #3f4147;
  background: #26282c;
  color: #b8b9bd;
  font-size: 0.75rem;
  cursor: pointer;
  font-family: inherit;
}
.tag-chip:hover {
  border-color: #4752c4;
}
.tag-chip.active {
  border-color: #5865f2;
  background: #313463;
  color: white;
}
.season-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.season-tab {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  border: 1px solid #34363b;
  background: #26282c;
  color: #d6d7db;
  font-size: 0.85rem;
  cursor: pointer;
  font-family: inherit;
}
.season-tab:hover {
  border-color: #4752c4;
}
.season-tab.active {
  border-color: #5865f2;
  background: #313463;
  color: white;
}
.season-tab.complete {
  color: #8ef0a8;
}
.season-tab.active.complete {
  color: #d6ffe0;
}
.tab-quest-count {
  background: #1e1f22;
  color: #9a9ba0;
  border-radius: 999px;
  padding: 0.05rem 0.45rem;
  font-size: 0.7rem;
}
.season-tab.active .tab-quest-count {
  background: #1e2050;
  color: #c7cbff;
}
.season-header {
  margin: 0 0 0.9rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  width: fit-content;
  padding: 0.15rem 0.4rem;
  margin-left: -0.4rem;
  border-radius: 6px;
}
.season-header:hover {
  background: #26282c;
}
.badge.complete {
  padding: 0.05rem 0.5rem;
  border-radius: 999px;
  font-size: 0.72rem;
  background: #2b5b39;
  color: #8ef0a8;
}
.badge.count {
  padding: 0.05rem 0.5rem;
  border-radius: 999px;
  font-size: 0.72rem;
  background: #2b2d31;
  color: #9a9ba0;
}
.unlock-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 0.8rem;
  align-items: start;
}
</style>
