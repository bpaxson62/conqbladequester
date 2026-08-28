module.exports = {
  name: 'Crescent Monks',
  id: 'crescent-monks',
  rewardType: 'unit',
  tier: 1,
  season: 14,
  prerequisites: [{ unlockId: 'wuxing-pikemen', requiredStages: 2 }],
  requiredPerStage: 8,
  unitChallenges: [
    {
      key: 0,
      text: 'Get a kill/death ratio of 1.5 or higher with any unit in 8 Field or Siege Battles of any type.',
      stage: 1
    },
    {
      key: 1,
      text: 'Get a Troop Kill Score of 800 or higher in 8 Field or Siege Battles of any type.',
      stage: 1
    },
    { key: 2, text: 'Earn 8 "Cakewalk" badges during Expeditions.', stage: 1 },
    { key: 3, text: 'Achieve victory in 8 Raider Camps or Bandit Raids.', stage: 1 },
    { key: 4, text: 'Defeat a band of rebels 12 times in the open world.', stage: 1 },
    { key: 5, text: 'Raise your hero up 10 levels.', stage: 1 },
    {
      key: 6,
      text: 'Get an A rating or better in 8 Field or Siege Battles of any type.',
      stage: 1
    },
    {
      key: 7,
      text: 'Earn 40 capture points or interrupt a capture in 8 Field or Siege Battles of any type.',
      stage: 1
    },
    {
      key: 8,
      text: 'Get 40 total kills or assists in Field or Siege Battles of any type.',
      stage: 1
    },
    {
      key: 9,
      text: 'You or your group members get 15 A+ or better ratings in Field or Siege Battles of any type.',
      stage: 1
    },
    {
      key: 0,
      text: 'In Deathmatch, you or your group collectively kill a total of 100 heroes.',
      stage: 2
    },
    { key: 1, text: 'Earn 8 "Cakewalk" badges during Expeditions.', stage: 2 },
    {
      key: 2,
      text: 'Get 40 kills or assists in Free Battles, or get 8 kills or assists in 8 Field or Siege Battles of any type.',
      stage: 2
    },
    { key: 3, text: 'Defeat a band of rebels 12 times in the open world.', stage: 2 },
    { key: 4, text: 'Raise your hero up 10 levels.', stage: 2 },
    {
      key: 5,
      text: 'Deploy or destroy an artillery piece in 8 Field or Siege Battles of any type.',
      stage: 2
    },
    {
      key: 6,
      text: 'Get 6 "No Quarter" or "Grand Bloodbath" badges in Field or Siege Battles of any type.',
      stage: 2
    },
    {
      key: 7,
      text: 'Get 40 total kills or assists in Field or Siege Battles of any type.',
      stage: 2
    },
    {
      key: 8,
      text: 'Get an A rating or better in 8 Field or Siege Battles of any type.',
      stage: 2
    },
    {
      key: 9,
      text: 'In Field or Siege Battles of any type, win 3 battles in a row or join 5 battles.',
      stage: 2
    },
    { key: 0, text: 'Achieve victory in 8 Raider Camps or Bandit Raids.', stage: 3 },
    {
      key: 1,
      text: 'Get 40 kills or assists in Free Battles, or get 8 kills or assists in 8 Field or Siege Battles of any type.',
      stage: 3
    },
    { key: 2, text: 'Take part in 8 Territory War battles.', stage: 3 },
    { key: 3, text: 'Complete 12 Fief Quests.', stage: 3 },
    {
      key: 4,
      text: 'You or your group collectively kill a total of 8 heroes in 8 Field or Siege Battles of any type.',
      stage: 3
    },
    {
      key: 5,
      text: 'Get 6 "No Quarter" or "Grand Bloodbath" badges in Field or Siege Battles of any type.',
      stage: 3
    },
    {
      key: 6,
      text: 'Get an A rating or better in 8 Free Battles, or get an A+ rating or better in 8 Field or Siege Battles of any type.',
      stage: 3
    },
    {
      key: 7,
      text: 'In Field or Siege Battles of any type, get a kill/death ratio of 1 or higher with any two units 8 times.',
      stage: 3
    },
    {
      key: 8,
      text: 'Get 40 total kills or assists in Field or Siege Battles of any type.',
      stage: 3
    },
    {
      key: 9,
      text: 'Use artillery to kill 130 soldiers or 8 heroes in Field or Siege Battles of any type.',
      stage: 3
    },
    { key: 0, text: 'Complete 12 Fief Quests.', stage: 4 },
    { key: 1, text: 'Earn 8 "Cakewalk" badges during Expeditions.', stage: 4 },
    {
      key: 2,
      text: 'Join 8 Ranked Battles or win 8 Field or Siege Battles of any type.',
      stage: 4
    },
    { key: 3, text: 'Raise your hero up 10 levels.', stage: 4 },
    {
      key: 4,
      text: 'You or your group collectively kill a total of 240 soldiers in 8 Field or Siege Battles of any type.',
      stage: 4
    },
    {
      key: 5,
      text: 'Use artillery to kill 30 soldiers or 2 heroes in 8 Field or Siege Battles of any type.',
      stage: 4
    },
    {
      key: 6,
      text: 'Get 6 "No Quarter" or "Grand Bloodbath" badges in Field or Siege Battles of any type.',
      stage: 4
    },
    {
      key: 7,
      text: 'Get an A rating or better in 8 Field or Siege Battles of any type.',
      stage: 4
    },
    {
      key: 8,
      text: 'In Field or Siege Battles of any type, win 3 battles in a row or join 5 battles.',
      stage: 4
    },
    {
      key: 9,
      text: 'Use Crescent Monks and win 10 PvE Battles (excluding Training Battle).',
      stage: 4
    },
    { key: 0, text: 'Using Crescent Monks, win 8 Raider Camps or Bandit Raids.', stage: 5 },
    {
      key: 1,
      text: 'In Field or Siege Battles of any type, use the Crescent Monks "Deadly Epicycle" skill to kill 200 enemy soldiers.',
      stage: 5
    },
    {
      key: 2,
      text: 'In Field or Siege Battles of any type, get a kill/death ratio of 1 or higher with any units 8 times.',
      stage: 5
    },
    {
      key: 3,
      text: 'Get 5 "Say Cheese" or "Settle the Score" badges in Field or Siege Battles of any type.',
      stage: 5
    },
    {
      key: 4,
      text: 'Use artillery to kill 130 soldiers or 8 heroes in Field or Siege Battles of any type.',
      stage: 5
    },
    {
      key: 5,
      text: 'In Deathmatch, you or your group collectively kill a total of 100 heroes.',
      stage: 5
    },
    { key: 6, text: 'Complete 12 Fief Quests.', stage: 5 },
    { key: 7, text: 'Take part in 8 Territory War battles.', stage: 5 },
    {
      key: 8,
      text: 'Defeat 20 heroes in Ranked battles, or get the "Grand Bloodbath" badge 4 times in Field or Siege Battles of any type.',
      stage: 5
    },
    { key: 9, text: 'Achieve victory in 8 Raider Camps or Bandit Raids.', stage: 5 }
  ]
}
