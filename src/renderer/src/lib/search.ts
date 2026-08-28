import type { Challenge } from '../../../shared/types'

/**
 * Tags every quest is checked against by default, regardless of what the
 * data files say — matched against the challenge's own text so existing
 * content doesn't need to be touched to get these for free. Most default
 * tags match a single keyword equal to their own label (e.g. "Siege"
 * looks for "siege"), but a tag can list several keywords when its
 * quests don't all share one word — "Open World" covers "open world",
 * "loot site", and "rebel" so it catches things like Rebel Camp quests
 * that never literally say "open world". Contributors can layer on
 * additional custom tags per-challenge (see `tags` in data/README.md)
 * which are matched the same way, just not shown as a chip unless some
 * active quest in the current season actually uses them.
 */
const DEFAULT_TAG_KEYWORDS: Record<string, string[]> = {
  Siege: ['siege'],
  'Free Battle': ['free battle'],
  'Death Match': ['death match'],
  'Territory War': ['territory war'],
  'Open World': ['open world', 'loot site', 'rebel']
}

export const DEFAULT_TAGS = Object.keys(DEFAULT_TAG_KEYWORDS)

/**
 * Lowercases and strips everything but letters/digits, so "Death Match"
 * matches "Deathmatches" and "Territory War" matches "Territory Wars" —
 * tag keywords are meant to be loose, not exact-word matches.
 */
function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '')
}

/**
 * Whether a challenge matches a given tag. A default tag (Siege, Free
 * Battle, etc) matches if the challenge text contains ANY of that tag's
 * keywords; any other (custom, data-file-supplied) tag matches if the
 * tag name itself is a loose keyword found in the text, or if the
 * challenge was explicitly tagged with it (or something containing it).
 */
export function challengeHasTag(challenge: Challenge, tag: string): boolean {
  const text = normalize(challenge.text)
  const keywords = DEFAULT_TAG_KEYWORDS[tag] ?? [tag]

  if (keywords.some((keyword) => text.includes(normalize(keyword)))) return true

  const target = normalize(tag)
  if (!target) return false
  return (challenge.tags ?? []).some((t) => normalize(t).includes(target))
}

/**
 * Every tag a set of challenges actually matches: the default tags plus
 * any custom tags found on those challenges, deduplicated case/spacing-
 * insensitively against the defaults so a data file tagging something
 * "siege" doesn't produce a redundant second "Siege" chip.
 */
export function availableTags(challenges: Challenge[]): string[] {
  const seen = new Set(DEFAULT_TAGS.map(normalize))
  const custom: string[] = []
  for (const challenge of challenges) {
    for (const tag of challenge.tags ?? []) {
      const key = normalize(tag)
      if (key && !seen.has(key)) {
        seen.add(key)
        custom.push(tag)
      }
    }
  }
  return [...DEFAULT_TAGS, ...custom.sort((a, b) => a.localeCompare(b))]
}

/**
 * Matches `query` against `target`. A literal substring always matches
 * (the common case — typing part of a quest's actual wording) and scores
 * highest, favoring an earlier match. Otherwise falls back to an in-order
 * subsequence match (tolerates a typo or a skipped letter, e.g. "sege"
 * finding "Siege"), but only when the matched letters land within a
 * tight span of the text — quest sentences are long, and without that
 * span limit a loose subsequence match finds almost any short query's
 * letters *somewhere* in order across the whole sentence, matching
 * nearly everything regardless of relevance. Returns a score (higher =
 * better) or null when nothing qualifies. No dependency needed — it's a
 * small, self-contained algorithm.
 */
export function fuzzyScore(query: string, target: string): number | null {
  const q = query.trim().toLowerCase()
  if (!q) return 0
  const t = target.toLowerCase()

  const literalIndex = t.indexOf(q)
  if (literalIndex !== -1) return 10000 - literalIndex

  // A multi-word phrase that isn't a literal substring stops here —
  // subsequence-matching several separate words against a long sentence
  // is exactly what produced false positives (each word's letters can
  // cluster together in unrelated text purely by chance). Single-word
  // queries still get typo/skip tolerance below.
  if (/\s/.test(q)) return null

  let qi = 0
  let start = -1
  let end = -1
  let consecutive = 0
  let score = 0
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      if (start === -1) start = ti
      end = ti
      qi++
      consecutive++
      score += consecutive
    } else {
      consecutive = 0
    }
  }
  if (qi < q.length) return null

  const span = end - start + 1
  const maxSpan = q.length + 2
  return span <= maxSpan ? score : null
}
