/**
 * Validates everything under data/unlocks before it can reach a player.
 *
 * The checks here exist because the failure mode of bad quest data is
 * silent: the app doesn't crash, it just quietly attaches someone's
 * completed checkmarks to the wrong quests, or makes an unlock
 * permanently unreachable. Run via `npm test`.
 */
/* eslint-disable @typescript-eslint/explicit-function-return-type -- plain JS build script, not TypeScript */
import { readdir } from 'fs/promises'
import { join, resolve } from 'path'
import { pathToFileURL } from 'url'

const errors = []
const warnings = []
const err = (file, msg) => errors.push(`${file}: ${msg}`)
const warn = (file, msg) => warnings.push(`${file}: ${msg}`)

async function walk(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(p)))
    else if (e.name.endsWith('.js') || e.name.endsWith('.json')) out.push(p)
  }
  return out
}

const slugify = (n) =>
  n
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'unlock'

const files = (await walk('data/unlocks')).sort()
if (files.length === 0) {
  console.error('No data files found under data/unlocks — is the path right?')
  process.exit(1)
}

const byId = new Map()
let challengeCount = 0

for (const file of files) {
  let d
  try {
    d = (await import(pathToFileURL(resolve(file)).href)).default
  } catch (e) {
    err(file, `failed to load: ${e.message}`)
    continue
  }

  if (!d?.name) err(file, 'missing `name`')
  if (typeof d?.season !== 'number') err(file, 'missing or non-numeric `season`')

  // id must be explicit and immutable — an implicit id changes whenever the
  // display name changes, which orphans progress and breaks prerequisites.
  if (!d?.id) {
    err(file, 'missing explicit `id` (required — see data/README.md)')
  } else if (d.name && d.id !== slugify(d.name)) {
    // Legal, but worth surfacing: it means the unit was renamed after release.
    warn(
      file,
      `id "${d.id}" no longer matches slug of name "${d.name}" (fine if renamed post-release)`
    )
  }

  if (d?.id) {
    if (byId.has(d.id)) err(file, `duplicate id "${d.id}" (also in ${byId.get(d.id).file})`)
    else
      byId.set(d.id, {
        file,
        season: d.season,
        prerequisites: d.prerequisites ?? [],
        stages: new Map()
      })
  }

  if (!Array.isArray(d?.unitChallenges) || d.unitChallenges.length === 0) {
    err(file, 'missing or empty `unitChallenges`')
    continue
  }

  if (typeof d.requiredPerStage !== 'number') {
    err(
      file,
      'missing `requiredPerStage` (omitting it makes the completion threshold shift whenever the challenge count changes)'
    )
  }

  const stages = new Map()
  for (const c of d.unitChallenges) {
    challengeCount++
    if (typeof c.stage !== 'number') {
      err(file, `challenge has non-numeric stage: ${c.text}`)
      continue
    }
    if (typeof c.text !== 'string' || !c.text.trim())
      err(file, `challenge in stage ${c.stage} has empty text`)
    if (typeof c.key !== 'number')
      err(file, `challenge in stage ${c.stage} is missing a \`key\`: "${c.text}"`)
    if (!stages.has(c.stage)) stages.set(c.stage, [])
    stages.get(c.stage).push(c)
  }

  // Stage numbers: start at 1, no gaps.
  const nums = [...stages.keys()].sort((a, b) => a - b)
  nums.forEach((n, i) => {
    if (n !== i + 1)
      err(file, `stage numbers must start at 1 with no gaps — got ${nums.join(', ')}`)
  })

  for (const [stage, items] of stages) {
    const seen = new Set()
    for (const c of items) {
      if (typeof c.key !== 'number') continue
      if (seen.has(c.key))
        err(file, `stage ${stage} has duplicate key ${c.key} — two quests would share one id`)
      seen.add(c.key)
    }
    if (typeof d.requiredPerStage === 'number' && d.requiredPerStage > items.length) {
      err(
        file,
        `stage ${stage} has ${items.length} challenges but requiredPerStage is ${d.requiredPerStage} — impossible to complete`
      )
    }
    if (d?.id) byId.get(d.id)?.stages.set(stage, items.length)
  }
}

// Prerequisites must resolve, and must be in the same season — progress.ts
// only ever looks within a season, so a cross-season ref silently locks the
// unlock forever.
for (const [id, u] of byId) {
  for (const p of u.prerequisites) {
    const target = byId.get(p.unlockId)
    if (!target) {
      err(
        u.file,
        `prerequisite "${p.unlockId}" does not exist — "${id}" would be permanently locked`
      )
      continue
    }
    if (target.season !== u.season) {
      err(
        u.file,
        `prerequisite "${p.unlockId}" is in season ${target.season} but "${id}" is in season ${u.season} — cross-season prerequisites never resolve`
      )
    }
    if (typeof p.requiredStages !== 'number' || p.requiredStages < 1) {
      err(u.file, `prerequisite "${p.unlockId}" has invalid requiredStages: ${p.requiredStages}`)
    } else if (p.requiredStages > target.stages.size) {
      err(
        u.file,
        `prerequisite "${p.unlockId}" requires ${p.requiredStages} stages but it only has ${target.stages.size} — "${id}" would be permanently locked`
      )
    }
  }
}

for (const w of warnings) console.warn(`  warn  ${w}`)
for (const e of errors) console.error(`  ERROR ${e}`)

console.log(
  `\n${files.length} files, ${byId.size} unlocks, ${challengeCount} challenges checked — ` +
    `${errors.length} error(s), ${warnings.length} warning(s)`
)
process.exit(errors.length > 0 ? 1 : 0)
