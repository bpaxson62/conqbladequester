module.exports = {
  name: 'Houndsmen',
  id: 'houndsmen',
  rewardType: 'unit',
  tier: 1,
  season: 9,
  prerequisites: [{ unlockId: 'claymores', requiredStages: 3 }],
  requiredPerStage: 10,
  unitChallenges: [
    { key: 0, text: 'Get an A rating or better in 8 Field or Siege battles.', stage: 1 },
    { key: 1, text: 'Be placed in the top 5 in 8 Field or Siege battles.', stage: 1 },
    { key: 2, text: 'Raise your hero 10 levels.', stage: 1 },
    { key: 3, text: 'Earn a Troop Kill Score of 5,000.', stage: 1 },
    { key: 4, text: 'Join 7 Ranked Battles or win 5 Field or Siege battles.', stage: 1 },
    {
      key: 5,
      text: 'Achieve victory at 9 Rebel Camps or Bandit Raids of any difficulty.',
      stage: 1
    },
    { key: 6, text: 'Win 9 Expeditions.', stage: 1 },
    { key: 7, text: 'Search 15 loot sites in the open world.', stage: 1 },
    { key: 8, text: 'Take part in 8 Territory War battles.', stage: 1 },
    {
      key: 9,
      text: 'Earn 40 capture points or interrupt a capture in 8 Field or Siege battles.',
      stage: 1
    },
    {
      key: 10,
      text: 'Deploy or destroy an artillery piece in 8 Field or Siege battles.',
      stage: 1
    },
    { key: 11, text: 'Earn 80 badges.', stage: 1 },
    {
      key: 0,
      text: 'Destroy a siege engine or acquire 40 capture points in 9 Field or Siege battles.',
      stage: 2
    },
    { key: 1, text: 'Get an A+ ranking or better in 15 Expedition battles.', stage: 2 },
    { key: 2, text: 'Complete 15 Fief Quests.', stage: 2 },
    { key: 3, text: 'Defeat 1,500 troops during Expeditions.', stage: 2 },
    {
      key: 4,
      text: 'Get a Troop Kill Score of 600 or more in 7 Ranked battles, or get a Troop Kill Score of 1,000 or more in 10 Field or Siege battles.',
      stage: 2
    },
    {
      key: 5,
      text: 'Complete 9 Deathmatch battles or earn 10 "Hat-Trick" or "A Deadly Century" badges in any battle.',
      stage: 2
    },
    {
      key: 6,
      text: 'Get an A rating or better in 7 Deathmatch battles, or get an A+ rating or better in 9 Field or Siege battles.',
      stage: 2
    },
    {
      key: 7,
      text: 'You or your group collectively kill a total of 240 soldiers in 9 Field or Siege battles.',
      stage: 2
    },
    {
      key: 8,
      text: 'Use artillery to kill 160 soldiers or 10 heroes in Field or Siege Battles.',
      stage: 2
    },
    {
      key: 9,
      text: 'Get a Troop Kill Score of 300 or higher with any unit in 9 Field or Siege battles.',
      stage: 2
    },
    { key: 10, text: 'Earn 9 "Shatter the Ranks" badges.', stage: 2 },
    {
      key: 11,
      text: 'Get a kill/death ratio of 1.5 or higher with any unit in 9 Field or Siege battles.',
      stage: 2
    },
    {
      key: 0,
      text: 'You or your group collectively kill a total of 8 heroes in 9 Field or Siege battles.',
      stage: 3
    },
    { key: 1, text: 'Earn 9 "Cakewalk" badges during Expeditions.', stage: 3 },
    { key: 2, text: 'Complete 15 Daily Quests.', stage: 3 },
    {
      key: 3,
      text: 'Get ranked in the top 5 in 9 Free Battles, or get MVP in 5 Field or Siege battles.',
      stage: 3
    },
    { key: 4, text: 'Join 9 Free Battles or win 7 Field or Siege battles.', stage: 3 },
    {
      key: 5,
      text: 'Earn 40 capture points or interrupt a capture in 8 Ranked Battles.',
      stage: 3
    },
    { key: 6, text: 'Raise your hero 12 levels.', stage: 3 },
    {
      key: 7,
      text: 'Use artillery to kill 160 soldiers or 10 heroes in Field or Siege Battles.',
      stage: 3
    },
    { key: 8, text: 'In Field or Siege battles, get 80 silver badges or higher.', stage: 3 },
    {
      key: 9,
      text: 'In Field or Siege battles, get a kill/death ratio of 1.5 or higher with any unit 9 times.',
      stage: 3
    },
    { key: 10, text: 'Get an A rating or better in 9 Field or Siege battles.', stage: 3 },
    { key: 11, text: 'Search 15 loot sites in the open world.', stage: 3 },
    { key: 0, text: 'Defeat 15 rebel bands in the open world.', stage: 4 },
    { key: 1, text: 'Raise your hero 12 levels.', stage: 4 },
    { key: 2, text: 'Win 10 Expeditions.', stage: 4 },
    {
      key: 3,
      text: 'Get 30 kills in Deathmatches, or get 8 kills or assists in 6 Field or Siege battles.',
      stage: 4
    },
    { key: 4, text: 'Win 10 Deathmatches or get 5 "No Quarter" badges in any PVP mode.', stage: 4 },
    {
      key: 5,
      text: 'Defeat 30 heroes in Ranked battles, or get the "Grand Bloodbath" badge 6 times in Field or Siege battles.',
      stage: 4
    },
    { key: 6, text: 'Take part in 8 Territory War battles.', stage: 4 },
    {
      key: 7,
      text: 'Win 3 Field or Siege battles in a row or join 8 Field or Siege battles.',
      stage: 4
    },
    {
      key: 8,
      text: 'Knock over a siege ladder or acquire 15 capture points in 10 Field or Siege battles.',
      stage: 4
    },
    {
      key: 9,
      text: 'You or your group members get 25 A+ or better rankings in Field or Siege battles.',
      stage: 4
    },
    {
      key: 10,
      text: 'Get 5 "Say Cheese" or "Settle the Score" badges in Field or Siege battles.',
      stage: 4
    },
    {
      key: 11,
      text: 'Get a Troop Kill Score of 800 or higher in 10 Field or Siege battles.',
      stage: 4
    },
    { key: 0, text: 'Use Houndsmen in 10 Field or Siege battles.', stage: 5 },
    { key: 1, text: 'Take part in 8 Territory War battles.', stage: 5 },
    { key: 2, text: 'Search 15 loot sites in the open world.', stage: 5 },
    {
      key: 3,
      text: 'Achieve victory at 10 Rebel Camps or Bandit Raids of any difficulty using Houndsmen.',
      stage: 5
    },
    {
      key: 4,
      text: 'Get a Troop Kill Score of 600 or more in 9 Ranked battles, or get a Troop Kill Score of 1,000 or more in 9 Field or Siege battles.',
      stage: 5
    },
    {
      key: 5,
      text: 'Get an A rank or better in 9 Free battles, or get an A+ rating or better in 10 Field or Siege battles.',
      stage: 5
    },
    {
      key: 6,
      text: 'Deploy or destroy an artillery piece in 10 Field or Siege battles.',
      stage: 5
    },
    {
      key: 7,
      text: 'Use artillery to kill 160 soldiers or 10 heroes in Field or Siege Battles.',
      stage: 5
    },
    {
      key: 8,
      text: 'In any battle, earn 80 of any kind of badge, or 25 silver or better badges.',
      stage: 5
    },
    { key: 9, text: 'Get 10 "Shatter the Ranks" badges in Field or Siege battles.', stage: 5 },
    { key: 10, text: 'Get a Troop Kill Score of 300 or higher with 15 units.', stage: 5 },
    {
      key: 11,
      text: 'You or your group collectively kill a total of 240 soldiers in 10 Field or Siege battles.',
      stage: 5
    },
    { key: 0, text: 'Complete 15 Fief Quests.', stage: 6 },
    {
      key: 1,
      text: 'Defeat 30 heroes in Deathmatch battles, or get "Hat-Trick" or "A Deadly Century" badges in 8 Field or Siege battles.',
      stage: 6
    },
    { key: 2, text: 'Join 10 Deathmatches or win 10 Field or Siege battles.', stage: 6 },
    { key: 3, text: 'Use Houndsmen in 10 Ranked Battles.', stage: 6 },
    { key: 4, text: 'Use Houndsmen and win 10 Expeditions.', stage: 6 },
    { key: 5, text: 'Complete 15 Daily Quests.', stage: 6 },
    {
      key: 6,
      text: 'You or your group collectively kill a total of 8 heroes in 10 Field or Siege battles.',
      stage: 6
    },
    {
      key: 7,
      text: 'Use artillery to kill 160 soldiers or 10 heroes in Field or Siege Battles.',
      stage: 6
    },
    { key: 8, text: 'Get an A rating or better in 10 Field or Siege battles.', stage: 6 },
    {
      key: 9,
      text: 'Get 5 "Say Cheese" or "Settle the Score" badges in Field or Siege battles.',
      stage: 6
    },
    {
      key: 10,
      text: 'Get ranked in the top five 10 times, or get MVP 10 times in Field or Siege battles.',
      stage: 6
    },
    { key: 11, text: 'Use Houndsmen to kill 200 enemy soldiers.', stage: 6 },
    {
      key: 0,
      text: 'Get 8 "No Quarter" or "Grand Bloodbath" badges in Field or Siege battles.',
      stage: 7
    },
    {
      key: 1,
      text: 'Achieve victory at 10 Rebel Camps or Bandit Raids of any difficulty using Houndsmen.',
      stage: 7
    },
    { key: 2, text: 'Take part in 8 Territory War battles.', stage: 7 },
    { key: 3, text: 'Defeat 15 rebel bands in the open world.', stage: 7 },
    {
      key: 4,
      text: 'Use Houndsmen and win 5 Free Battles, or get a Troop Kill Score of 1,000 or greater in 8 Field or Siege battles.',
      stage: 7
    },
    {
      key: 5,
      text: 'Your Houndsmen get a kill/death ratio of 0.8 or greater in 10 Free Battles, or they get a Troop Kill Score of 400 or greater in 8 Field or Siege battles.',
      stage: 7
    },
    {
      key: 6,
      text: 'Destroy a siege engine or acquire 40 capture points in 10 Field or Siege battles.',
      stage: 7
    },
    {
      key: 7,
      text: 'You or your group members get 25 A+ or better rankings or 8 S ratings in Field or Siege battles.',
      stage: 7
    },
    {
      key: 8,
      text: 'In Field or Siege battles, win 3 battles in a row or join 8 battles.',
      stage: 7
    },
    { key: 9, text: 'Use Houndsmen and win 10 Field or Siege battles.', stage: 7 },
    {
      key: 10,
      text: 'Your Houndsmen get a kill/death ratio of 0.8 or better in 10 Field or Siege battles.',
      stage: 7
    },
    {
      key: 11,
      text: 'Your Houndsmen get a kill/death ratio of 0.8 or greater in 8 Ranked Battles.',
      stage: 7
    }
  ]
}
