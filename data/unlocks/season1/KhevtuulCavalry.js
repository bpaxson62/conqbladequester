module.exports = {
  name: 'Khevtuul Cavalry',
  id: 'khevtuul-cavalry',
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
    { key: 0, text: 'In Field or Siege Battles, take steppe units into battle 8 times.', stage: 1 },
    { key: 1, text: 'In Field or Siege Battles, get an A rating or better 5 times.', stage: 1 },
    { key: 2, text: 'In Expeditions, use Steppe units to deal 6 damage.', stage: 1 },
    { key: 3, text: 'Complete any Fief Quest 10 times.', stage: 1 },
    { key: 4, text: 'In Field or Siege Battles, use artillery to kill 140 troops.', stage: 1 },
    { key: 5, text: 'In Field or Siege Battles, get 30 assists.', stage: 1 },
    { key: 6, text: 'In Free Battles, take 3-star or better units into battle 5 times.', stage: 1 },
    { key: 7, text: 'Add 6 hero levels.', stage: 1 },
    { key: 0, text: 'In PvP battles, destroy 10 artillery pieces.', stage: 2 },
    { key: 1, text: 'Take part in 4 Territory Wars.', stage: 2 },
    { key: 2, text: 'Defeat a total of 500 soldiers during Expeditions.', stage: 2 },
    {
      key: 3,
      text: 'Take Steppe units into battle and get a kill/death ratio of greater than 1 on 5 occasions.',
      stage: 2
    },
    { key: 4, text: 'Destroy 6 easy Rebel Camps.', stage: 2 },
    { key: 5, text: 'In Expeditions, get an A or better ranking 6 times.', stage: 2 },
    {
      key: 6,
      text: 'In PvP battles, take Steppe units into battle and deal 3000000 damage.',
      stage: 2
    },
    { key: 7, text: 'In PvP battles, get the "A Deadly Century" badge 8 times.', stage: 2 },
    { key: 0, text: 'In Field or Siege Battles, get a B+ rating or better 8 times.', stage: 3 },
    { key: 1, text: 'Kill 12 heroes in Deathmatch.', stage: 3 },
    { key: 2, text: 'In an Expedition, inflict a total of 10000000 damage.', stage: 3 },
    { key: 3, text: 'In Field or Siege Battles, earn 240 capture points.', stage: 3 },
    { key: 4, text: 'Defeat 15 bands of wandering rebels.', stage: 3 },
    { key: 5, text: 'Earn 5 "Cakewalk" badges during Expeditions.', stage: 3 },
    { key: 6, text: 'In PvP battles, get the "Hat-Trick" badge 10 times.', stage: 3 },
    { key: 7, text: 'In Field or Siege Battles, get 30 assists.', stage: 3 },
    { key: 0, text: 'In Field or Siege Battles, use artillery to kill 140 troops.', stage: 4 },
    { key: 1, text: 'In Siege Battles, use trebuchets 7 times.', stage: 4 },
    { key: 2, text: 'In PvP battles, get the "Shatter the Ranks" badge 10 times.', stage: 4 },
    { key: 3, text: 'Win 4 Territory Wars.', stage: 4 },
    { key: 4, text: 'In Siege Battles, destroy 4 siege engines.', stage: 4 },
    { key: 5, text: 'In Field or Siege Battles, win 6 times.', stage: 4 },
    { key: 6, text: 'Win 2 Free Battles.', stage: 4 },
    { key: 7, text: 'Destroy 6 Medium Rebel Camps.', stage: 4 }
  ]
}
