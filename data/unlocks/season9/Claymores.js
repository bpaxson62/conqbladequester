module.exports = {
  name: 'Claymores',
  id: 'claymores',
  rewardType: 'unit',
  tier: 1,
  season: 9,
  prerequisites: [{ unlockId: 'bagpipers', requiredStages: 2 }],
  requiredPerStage: 8,
  unitChallenges: [
    {
      key: 0,
      text: 'Win 3 Field or Siege battles in a row or join 8 Field or Siege battles.',
      stage: 1
    },
    { key: 1, text: 'Earn a Troop Kill Score of 4,000.', stage: 1 },
    {
      key: 2,
      text: 'Achieve victory at 7 Rebel Camps or Bandit Raids of any difficulty.',
      stage: 1
    },
    { key: 3, text: 'Complete 12 Daily Quests.', stage: 1 },
    { key: 4, text: 'Complete 12 Fief Quests.', stage: 1 },
    { key: 5, text: 'In Expeditions, get an A ranking or better 7 times.', stage: 1 },
    {
      key: 6,
      text: 'In Field or Siege battles, get a kill/death ratio of 1.5 or higher with any unit 6 times.',
      stage: 1
    },
    { key: 7, text: 'In Field or Siege battles, get 3 "No Quarter" badges.', stage: 1 },
    { key: 8, text: 'Get 50 total kills or assists in Field or Siege battles.', stage: 1 },
    {
      key: 9,
      text: 'In Deathmatch, you or your group collectively kill a total of 100 heroes.',
      stage: 1
    },
    { key: 0, text: 'Earn 3 "Combo Breaker" badges.', stage: 2 },
    { key: 1, text: 'Raise your hero 10 levels.', stage: 2 },
    { key: 2, text: 'Defeat 12 rebel bands in the open world.', stage: 2 },
    { key: 3, text: 'In Expeditions, get an A ranking or better 7 times.', stage: 2 },
    {
      key: 4,
      text: 'Kill 30 enemy heroes in Deathmatch, or earn 4 "No Quarter" badges.',
      stage: 2
    },
    {
      key: 5,
      text: 'Knock over a siege ladder or acquire 15 capture points in 7 Field or Siege battles.',
      stage: 2
    },
    { key: 6, text: 'Deploy or destroy an artillery piece in 7 Field or Siege battles.', stage: 2 },
    {
      key: 7,
      text: 'You or your group collectively kill a total of 240 soldiers in 7 Field or Siege battles.',
      stage: 2
    },
    {
      key: 8,
      text: 'Get a Troop Kill Score of 800 or higher in 7 Field or Siege battles.',
      stage: 2
    },
    { key: 9, text: 'Get ranked in the top 5 in 7 Field or Siege battles.', stage: 2 },
    { key: 0, text: 'In Expeditions, get an A ranking or better 8 times.', stage: 3 },
    { key: 1, text: 'Defeat 12 rebel bands in the open world.', stage: 3 },
    { key: 2, text: 'Complete 12 Fief Quests.', stage: 3 },
    {
      key: 3,
      text: 'Get 20 kills or assists in Free Battles, or get 8 kills or assists in 7 Field or Siege battles.',
      stage: 3
    },
    { key: 4, text: 'Earn 8 "A Deadly Century" or "Hat-Trick" badges.', stage: 3 },
    {
      key: 5,
      text: 'You or your group collectively kill a total of 8 heroes in 7 Field or Siege battles.',
      stage: 3
    },
    {
      key: 6,
      text: 'Use a trebuchet or interrupt a capture in 7 Field or Siege battles.',
      stage: 3
    },
    {
      key: 7,
      text: 'Get a kill/death ratio of 1.5 or higher with any unit in 7 Field or Siege battles.',
      stage: 3
    },
    {
      key: 8,
      text: 'In Field or Siege battles, get a Troop Kill Score of 400 or higher with 10 units.',
      stage: 3
    },
    { key: 9, text: 'Get an A rating or better in 7 Field or Siege battles.', stage: 3 },
    { key: 0, text: 'Join 7 Free Battles or win 5 Field or Siege battles.', stage: 4 },
    {
      key: 1,
      text: 'Achieve victory at 8 Rebel Camps or Bandit Raids of any difficulty using Claymores.',
      stage: 4
    },
    { key: 2, text: 'Defeat 1,200 troops during Expeditions.', stage: 4 },
    { key: 3, text: 'Raise your hero 10 levels.', stage: 4 },
    { key: 4, text: 'Search 12 loot sites in the open world.', stage: 4 },
    {
      key: 5,
      text: 'In Field or Siege battles, you or your group members get 40 B+ or better rankings or get 10 A+ or better rankings.',
      stage: 4
    },
    {
      key: 6,
      text: 'Use Claymores and get a kill/death ratio of 1.5 or more in 7 Field or Siege battles.',
      stage: 4
    },
    { key: 7, text: 'In Field or Siege battles, get an iron or better badge 20 times.', stage: 4 },
    {
      key: 8,
      text: 'In Field or Siege battles, use artillery to kill 140 soldiers or 8 heroes.',
      stage: 4
    },
    {
      key: 9,
      text: 'Get a Troop Kill Score of 300 or higher with any unit in 7 Field or Siege battles.',
      stage: 4
    },
    { key: 0, text: 'Deploy or destroy an artillery piece in 7 Field or Siege battles.', stage: 5 },
    {
      key: 1,
      text: 'Use Claymores and get a Troop Kill Score of 300 or more in 7 Field or Siege battles.',
      stage: 5
    },
    {
      key: 2,
      text: 'In Field or Siege battles, use Claymores to kill 200 enemy soldiers.',
      stage: 5
    },
    { key: 3, text: 'Get 50 total kills or assists in Field or Siege battles.', stage: 5 },
    {
      key: 4,
      text: 'You or your group collectively kill a total of 240 soldiers in 7 Field or Siege battles.',
      stage: 5
    },
    {
      key: 5,
      text: 'Get a Troop Kill Score of 1,000 or higher in 7 Field or Siege battles.',
      stage: 5
    },
    {
      key: 6,
      text: 'Get an A rating or better in 7 Deathmatch battles, or get an A+ rating or better in 7 Field or Siege battles.',
      stage: 5
    },
    { key: 7, text: 'Get an A+ ranking or better in 8 Expedition battles.', stage: 5 },
    { key: 8, text: 'Defeat 12 rebel bands in the open world.', stage: 5 },
    { key: 9, text: 'Complete 12 Daily Quests.', stage: 5 }
  ]
}
