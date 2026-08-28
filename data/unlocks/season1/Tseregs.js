module.exports = {
  name: 'Tseregs',
  id: 'tseregs',
  rewardType: 'unit',
  tier: 1,
  season: 1,
  prerequisites: [
    { unlockId: 'namkhan-archers', requiredStages: 2 },
    { unlockId: 'selemchid-cavalry', requiredStages: 2 },
    { unlockId: 'khorchins', requiredStages: 2 }
  ],
  requiredPerStage: 6,
  unitChallenges: [
    { key: 0, text: 'In Field or Siege Battles, get an A+ rating or better 4 times.', stage: 1 },
    { key: 1, text: 'in Siege Battles, use trebuchets 7 times.', stage: 1 },
    { key: 2, text: 'In Expeditions, get an A ranking or better 6 times.', stage: 1 },
    { key: 3, text: 'Join a total of 4 Deathmatches.', stage: 1 },
    { key: 4, text: 'In Field or Siege Battles, earn 240 capture points.', stage: 1 },
    { key: 5, text: 'In Expeditions, use buckler units to deal 3000000 damage.', stage: 1 },
    {
      key: 6,
      text: 'In Territory Wars, take a Shortsword & Shield units into battle 4 times.',
      stage: 1
    },
    {
      key: 7,
      text: 'In Field or Siege Battles, take sword infantry into battle 8 times.',
      stage: 1
    },
    { key: 0, text: 'In Siege Battles, kick over 12 ladders put up by the enemy.', stage: 2 },
    { key: 1, text: 'Conquer 6 medium Rebel Camps.', stage: 2 },
    {
      key: 2,
      text: 'In Field or Siege Battles, use eastern spearmen to take 1500000 damage.',
      stage: 2
    },
    { key: 3, text: 'In Field or Siege Battles, get 30 assists.', stage: 2 },
    { key: 4, text: 'Search 20 loot sites in the open world.', stage: 2 },
    {
      key: 5,
      text: 'In Free Battles, take 3-star or better buckler units into battle 4 times.',
      stage: 2
    },
    { key: 6, text: 'In Field or Siege Battles, kill 100 sword infantry.', stage: 2 },
    { key: 7, text: 'In Field or Siege Battles, win 5 times.', stage: 2 },
    { key: 0, text: 'Level up your hero 6 times.', stage: 3 },
    { key: 1, text: 'In Expeditions, get an A+ ranking or better 4 times.', stage: 3 },
    { key: 2, text: 'In any mode, get the "No Quarter" badge 5 times.', stage: 3 },
    { key: 3, text: 'In Field or Siege Battles, earn 240 capture points.', stage: 3 },
    { key: 4, text: 'Win 4 Territory Wars.', stage: 3 },
    {
      key: 5,
      text: 'In Expeditions, take Silver Era or later untis into battle 8 times.',
      stage: 3
    },
    { key: 6, text: 'In Field or Siege Battles, destroy 10 artillery.', stage: 3 },
    { key: 7, text: 'In Field or Siege Battles, use sword infantry to kill 200 troops.', stage: 3 },
    {
      key: 0,
      text: 'In Field or Siege Battles, take sword infantry into battle and win 4 times.',
      stage: 4
    },
    {
      key: 1,
      text: 'In Field or Siege Battles, use sword infantry to deal 2000000 damage.',
      stage: 4
    },
    { key: 2, text: 'In Expeditions, get an A+ ranking or better 6 times.', stage: 4 },
    { key: 3, text: 'Win 3 Free Battles.', stage: 4 },
    { key: 4, text: 'In Field or Siege Battles, deploy 8 artillery.', stage: 4 },
    { key: 5, text: 'In PvP battles, get bronze quality or better badges 80 times.', stage: 4 },
    { key: 6, text: 'Kill 12 heroes in Deathmatch.', stage: 4 },
    { key: 7, text: 'Destroy 6 hard Rebel Camps.', stage: 4 }
  ]
}
