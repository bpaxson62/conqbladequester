module.exports = {
  name: 'Chevaliers',
  id: 'chevaliers',
  rewardType: 'unit',
  tier: 1,
  season: 10,
  prerequisites: [{ unlockId: 'banner-guards', requiredStages: 3 }],
  requiredPerStage: 10,
  unitChallenges: [
    { key: 0, text: 'Get ranked in the top 5 in 8 Field or Siege Battles of any type.', stage: 1 },
    {
      key: 1,
      text: 'Get a Troop Kill Score of 5,000 in Field or Siege Battles of any type.',
      stage: 1
    },
    { key: 2, text: 'Join 7 Deathmatches or win 7 Field or Siege Battles of any type.', stage: 1 },
    { key: 3, text: 'Complete 15 Daily Quests.', stage: 1 },
    {
      key: 4,
      text: 'Achieve victory at 8 Rebel Camps or Bandit Raids of any difficulty.',
      stage: 1
    },
    { key: 5, text: 'Win 15 Expeditions.', stage: 1 },
    {
      key: 6,
      text: 'Get a Troop Kill Score of 600 or more in 8 Ranked battles, or get a Troop Kill Score of 1,000 or more in 8 Field or Siege Battles of any type.',
      stage: 1
    },
    {
      key: 7,
      text: 'Destroy a siege engine or acquire 40 capture points in 8 Field or Siege Battles of any type.',
      stage: 1
    },
    {
      key: 8,
      text: 'Destroy or deploy an artillery piece in 8 Field or Siege Battles of any type.',
      stage: 1
    },
    { key: 9, text: 'In Field or Siege Battles of any type, get 80 badges.', stage: 1 },
    {
      key: 10,
      text: 'Get 8 "Shatter the Ranks" badges in Field or Siege Battles of any type.',
      stage: 1
    },
    { key: 11, text: 'Complete 15 Fief Quests.', stage: 1 },
    {
      key: 0,
      text: 'Get an A rank or better in 7 Free battles, or get an A+ rating or better in 9 Field or Siege Battles of any type.',
      stage: 2
    },
    { key: 1, text: 'Get an A+ ranking or better in 10 Expedition battles.', stage: 2 },
    { key: 2, text: 'Join 10 Territory Wars.', stage: 2 },
    { key: 3, text: 'Defeat 1,500 troops during Expeditions.', stage: 2 },
    {
      key: 4,
      text: 'Join 7 Ranked Battles or win 7 Field or Siege Battles of any type.',
      stage: 2
    },
    {
      key: 5,
      text: 'Get the "Hat-Trick" badge in 9 Free Battles, or get the "Quad Kill" badge in 9 Field or Siege Battles of any type.',
      stage: 2
    },
    {
      key: 6,
      text: 'You or your group collectively kill a total of 240 soldiers in 9 Field or Siege Battles of any type.',
      stage: 2
    },
    {
      key: 7,
      text: 'Use artillery to kill 160 soldiers or 10 heroes in Field or Siege Battles of any type.',
      stage: 2
    },
    {
      key: 8,
      text: 'Earn 40 capture points or interrupt a capture in 9 Field or Siege Battles of any type.',
      stage: 2
    },
    {
      key: 9,
      text: 'Get a Troop Kill Score of 300 or higher with any unit in 9 Field or Siege Battles of any type.',
      stage: 2
    },
    { key: 10, text: 'Get 8 kills or assists in 9 Field or Siege Battles of any type.', stage: 2 },
    {
      key: 11,
      text: 'In Field or Siege Battles of any type, get a kill/death ratio of 1.5 or higher with any unit 15 times.',
      stage: 2
    },
    {
      key: 0,
      text: 'In Field or Siege Battles of any type, get 80 iron or better badges, or get 12 silver or better badges.',
      stage: 3
    },
    { key: 1, text: 'Earn 8 "Cakewalk" badges during Expeditions.', stage: 3 },
    {
      key: 2,
      text: 'Achieve victory at 10 Rebel Camps or Bandit Raids of any difficulty.',
      stage: 3
    },
    {
      key: 3,
      text: 'Get 8 kills or assists in 8 Field or Siege Battles of any type, or you or your group collectively kill a total of 35 heroes in Deathmatches.',
      stage: 3
    },
    {
      key: 4,
      text: 'Join 9 Deathmatches or get 7 "No Quarter" badges in Field or Siege Battles of any type.',
      stage: 3
    },
    {
      key: 5,
      text: 'Get ranked in the top 5 in 8 Ranked Battles, or get MVP in 6 Field or Siege Battles of any type.',
      stage: 3
    },
    { key: 6, text: 'Search 15 loot sites in the open world.', stage: 3 },
    { key: 7, text: 'Raise your hero up 12 levels.', stage: 3 },
    {
      key: 8,
      text: 'Use artillery to kill 200 soldiers or 12 heroes in Field or Siege Battles of any type.',
      stage: 3
    },
    {
      key: 9,
      text: 'You or your group collectively kill a total of 8 heroes in 9 Field or Siege Battles of any type.',
      stage: 3
    },
    {
      key: 10,
      text: 'In Field or Siege Battles of any type, get a kill/death ratio of 1.5 or higher with any unit 9 times.',
      stage: 3
    },
    {
      key: 11,
      text: 'Get an A rating or better in 9 Field or Siege Battles of any type.',
      stage: 3
    },
    { key: 0, text: 'Raise your hero up 12 levels.', stage: 4 },
    { key: 1, text: 'Win 10 Expeditions.', stage: 4 },
    {
      key: 2,
      text: 'Get a Troop Kill Score of 1,000 or higher in 7 Free Battles, or earn the "Grand Bloodbath" badge 6 times in Field or Siege Battles of any type.',
      stage: 4
    },
    {
      key: 3,
      text: 'Complete 9 Free Battles or win 8 Field or Siege Battles of any type.',
      stage: 4
    },
    {
      key: 4,
      text: 'Get 35 hero kills or assists in Ranked Battles, or get 6 "No Quarter" badges in Field or Siege Battles of any type.',
      stage: 4
    },
    { key: 5, text: 'Defeat 15 rebel bands in the open world.', stage: 4 },
    { key: 6, text: 'Get ranked in the top 5 in 10 Field or Siege Battles of any type.', stage: 4 },
    {
      key: 7,
      text: 'Knock over a ladder or acquire 15 capture points in 10 Field or Siege Battles of any type.',
      stage: 4
    },
    {
      key: 8,
      text: 'You or your group members get 25 A+ or better rankings in Field or Siege Battles of any type.',
      stage: 4
    },
    {
      key: 9,
      text: 'Get 7 "Say Cheese" or "Settle the Score" badges in Field or Siege Battles of any type.',
      stage: 4
    },
    {
      key: 10,
      text: 'Get a Troop Kill Score of 400 or higher with any unit in 10 Field or Siege Battles of any type.',
      stage: 4
    },
    {
      key: 11,
      text: 'Destroy or deploy an artillery piece in 10 Field or Siege Battles of any type.',
      stage: 4
    },
    {
      key: 0,
      text: 'You or your group collectively kill a total of 240 soldiers in 10 Field or Siege Battles of any type.',
      stage: 5
    },
    { key: 1, text: 'Complete 15 Daily Quests.', stage: 5 },
    { key: 2, text: 'Search 15 loot sites in the open world.', stage: 5 },
    {
      key: 3,
      text: 'Achieve victory at 10 Rebel Camps or Bandit Raids of any difficulty using Chevaliers.',
      stage: 5
    },
    {
      key: 4,
      text: 'Get a Troop Kill Score of 600 or more in 9 Free Battles, or get a Troop Kill Score of 1,000 or more in 9 Field or Siege Battles of any type.',
      stage: 5
    },
    {
      key: 5,
      text: 'Get an A rating or better in 9 Free Battles or get an A+ rating or better in 10 Field or Siege Battles of any type.',
      stage: 5
    },
    {
      key: 6,
      text: 'Destroy a siege engine or acquire 40 capture points in 10 Field or Siege Battles of any type.',
      stage: 5
    },
    {
      key: 7,
      text: 'Use artillery to kill 200 soldiers or 12 heroes in Field or Siege Battles of any type.',
      stage: 5
    },
    {
      key: 8,
      text: 'Get 10 "No Quarter" or "Grand Bloodbath" badges in Field or Siege Battles of any type.',
      stage: 5
    },
    {
      key: 9,
      text: 'Get an A+ rating or better in 10 Field or Siege Battles of any type.',
      stage: 5
    },
    {
      key: 10,
      text: 'Get a Troop Kill Score of 300 or higher with 15 units in any type of Field or Siege Battle.',
      stage: 5
    },
    { key: 11, text: 'Use Chevaliers in 10 Field or Siege Battles of any type.', stage: 5 },
    {
      key: 0,
      text: 'In Field or Siege Battles of any type, get a kill/death ratio of 1.5 or higher with any unit 15 times.',
      stage: 6
    },
    {
      key: 1,
      text: 'Defeat 35 heroes in Deathmatch battles, or get the "Hat-Trick" badge in 8 Field or Siege Battles of any type.',
      stage: 6
    },
    { key: 2, text: 'Join 8 Deathmatches or win 10 Field or Siege Battles of any type.', stage: 6 },
    { key: 3, text: 'Use Chevaliers and win 7 Ranked Battles.', stage: 6 },
    { key: 4, text: 'Use Chevaliers and win 10 Expeditions.', stage: 6 },
    { key: 5, text: 'Join 10 Territory Wars.', stage: 6 },
    {
      key: 6,
      text: 'You or your group collectively kill a total of 8 heroes in 10 Field or Siege Battles of any type.',
      stage: 6
    },
    {
      key: 7,
      text: 'Use artillery to kill 200 soldiers or 12 heroes in Field or Siege Battles of any type.',
      stage: 6
    },
    {
      key: 8,
      text: 'In Field or Siege Battles of any type, get 80 iron or better badges, or get 12 silver or better badges.',
      stage: 6
    },
    {
      key: 9,
      text: 'In Field or Siege Battles of any type, get ranked in the top 5, 10 times, or get MVP 5 times.',
      stage: 6
    },
    {
      key: 10,
      text: 'In Field or Siege Battles of any type, use Chevaliers to kill 300 enemy soldiers.',
      stage: 6
    },
    { key: 11, text: 'Complete 15 Fief Quests.', stage: 6 },
    {
      key: 0,
      text: 'Achieve victory at 10 Rebel Camps or Bandit Raids of any difficulty using Chevaliers.',
      stage: 7
    },
    { key: 1, text: 'Join 8 Territory Wars.', stage: 7 },
    { key: 2, text: 'Defeat 15 rebel bands in the open world.', stage: 7 },
    {
      key: 3,
      text: 'Complete 8 Free Battles or win 4 Field or Siege Battles of any type in a row.',
      stage: 7
    },
    {
      key: 4,
      text: 'Use Chevaliers and get a Troop Kill Score of 300 or better in 8 Free Battles, or use this unit and get a Troop Kill Score of 400 or greater in 8 Field or Siege Battles of any type.',
      stage: 7
    },
    {
      key: 5,
      text: 'Use Chevaliers and get a Troop Kill Score of 400 or better in 8 Ranked Battles.',
      stage: 7
    },
    {
      key: 6,
      text: 'Destroy or deploy an artillery piece in 10 Field or Siege Battles of any type.',
      stage: 7
    },
    {
      key: 7,
      text: 'In Field or Siege Battles of any type, you or your group members get 25 A+ or better rankings or 8 S rankings.',
      stage: 7
    },
    {
      key: 8,
      text: 'Get 8 "No Quarter" or "Grand Bloodbath" badges in Field or Siege Battles of any type.',
      stage: 7
    },
    {
      key: 9,
      text: 'In Field or Siege Battles of any type, get a kill/death ratio of 1 or higher with any two units 8 times.',
      stage: 7
    },
    { key: 10, text: 'Use Chevaliers and win 5 Field or Siege Battles of any type.', stage: 7 },
    {
      key: 11,
      text: 'Use the Chevaliers skill "Assault" to kill 200 troops in Field or Siege Battles of any type.',
      stage: 7
    }
  ]
}
