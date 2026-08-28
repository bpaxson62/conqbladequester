module.exports = {
  name: 'Berserkers',
  id: 'berserkers',
  rewardType: 'unit',
  tier: 1,
  season: 6,
  prerequisites: [{ unlockId: 'sons-of-fenrir', requiredStages: 2 }],
  requiredPerStage: 8,
  unitChallenges: [
    { key: 0, text: 'Win 6 Field or Siege Battles.', stage: 1 },
    {
      key: 1,
      text: 'In Siege Battles, destroy a siege ladder or acquire 15 capture points in 6 battles.',
      stage: 1
    },
    { key: 2, text: 'Win 3 Deathmatches.', stage: 1 },
    { key: 3, text: 'Earn 4 "Grand Bloodbath" badges.', stage: 1 },
    { key: 4, text: 'Get 20 silver or gold badges in any battle.', stage: 1 },
    { key: 5, text: 'Defeat 1,200 troops during Expeditions.', stage: 1 },
    { key: 6, text: 'Raise your hero up 8 levels.', stage: 1 },
    {
      key: 7,
      text: 'In Siege or Field Battles, use charge-type skills to kill 100 troops.',
      stage: 1
    },
    { key: 8, text: 'In Siege or Field Battles, earn 6 "A Deadly Century" badges.', stage: 1 },
    { key: 9, text: 'In Field or Siege Battles, get 45 total kills or assists.', stage: 1 },
    { key: 0, text: 'Search 12 loot sites in the open world.', stage: 2 },
    { key: 1, text: 'Earn 4 "No Quarter" badges.', stage: 2 },
    {
      key: 2,
      text: 'Achieve victory on 6 Rebel Camps or Bandit Raids of any difficulty.',
      stage: 2
    },
    {
      key: 3,
      text: 'In Field or Siege Battles, use Brace Weapons-type skills to kill 100 troops.',
      stage: 2
    },
    { key: 4, text: 'In 6 Siege or Field Battles, kill 60 troops per battle.', stage: 2 },
    {
      key: 5,
      text: 'In Siege or Field Battles, you or your group collectively kill a total of 8 heroes in 7 battles.',
      stage: 2
    },
    { key: 6, text: 'In Siege or Field Battles, use artillery to kill 160 troops.', stage: 2 },
    { key: 7, text: 'In Siege or Field Battles, get an A rating or better 7 times.', stage: 2 },
    { key: 8, text: 'In Ranked Battles, rank in the top 5, 6 times.', stage: 2 },
    {
      key: 9,
      text: 'Push a siege tower to the ramparts or destroy a siege engine in 5 Siege Battles.',
      stage: 2
    },
    { key: 0, text: 'In Expeditions, get an A+ ranking or better 8 times.', stage: 3 },
    { key: 1, text: 'In Ranked Battles, rank in the top 5, 8 times.', stage: 3 },
    { key: 2, text: 'Win 5 Free Battles.', stage: 3 },
    { key: 3, text: 'Raise your hero up 10 levels.', stage: 3 },
    { key: 4, text: 'Defeat 10 rebel or Marauder bands in the open world.', stage: 3 },
    {
      key: 5,
      text: 'In Siege or Field Battles, you or your group collectively kill a total of 240 soldiers in 8 battles.',
      stage: 3
    },
    { key: 6, text: 'Earn 6 "Drop Dead" badges.', stage: 3 },
    { key: 7, text: 'In Siege or Field Battles, get ranked in the top 5, 8 times.', stage: 3 },
    { key: 8, text: 'Use a trebuchet or interrupt a capture in 7 Siege Battles.', stage: 3 },
    { key: 9, text: 'In Siege or Field Battles, use artillery to kill 180 troops.', stage: 3 },
    { key: 0, text: 'Get 25 silver or gold badges in any battle.', stage: 4 },
    { key: 1, text: 'Take part in 6 Territory Wars.', stage: 4 },
    { key: 2, text: 'In Ranked Battles, get an A ranking or better 7 times.', stage: 4 },
    {
      key: 3,
      text: 'Use four units from different eras in a Siege or Field battle 6 times and win.',
      stage: 4
    },
    { key: 4, text: 'Take Berserkers into 8 Siege or Field battles.', stage: 4 },
    {
      key: 5,
      text: 'Achieve victory at 6 Rebel Camps or Bandit Raids of any difficulty using Berserkers.',
      stage: 4
    },
    {
      key: 6,
      text: 'In Siege or Field Battles, you (or your group collectively) defeat 90 heroes.',
      stage: 4
    },
    { key: 7, text: 'In Field or Siege Battles, get 60 total kills or assists.', stage: 4 },
    { key: 8, text: 'Earn 4 "No Quarter" badges.', stage: 4 },
    {
      key: 9,
      text: 'In Siege Battles, deploy or destroy an artillery piece in 8 battles.',
      stage: 4
    },
    { key: 0, text: 'In Field or Siege Battles, kill 20 heroes.', stage: 5 },
    {
      key: 1,
      text: 'In Siege or Field Battles, you or your group collectively kill a total of 240 soldiers in 8 battles.',
      stage: 5
    },
    {
      key: 2,
      text: 'Push a siege tower to the ramparts or destroy a siege engine in 4 Siege Battles.',
      stage: 5
    },
    { key: 3, text: 'Earn 80 badges.', stage: 5 },
    {
      key: 4,
      text: 'In Siege or Field Battles, take the Berserkers into battle and earn an A ranking or better 6 times.',
      stage: 5
    },
    { key: 5, text: 'In Free Battle mode, take the Berserkers into battle 8 times.', stage: 5 },
    {
      key: 6,
      text: 'In Expedition, take the Berserkers into battle and defeat 2,000 enemy soldiers.',
      stage: 5
    },
    {
      key: 7,
      text: 'In Ranked Battles, take the Berserkers into battle 6 times while getting a KD of at least 4.',
      stage: 5
    },
    {
      key: 8,
      text: 'In Expedition, take the Berserkers into battle and get a rating of A+ or higher 8 times.',
      stage: 5
    },
    {
      key: 9,
      text: 'In Siege Battles, kill 200 enemies with the Berserkers Frenzy skill.',
      stage: 5
    }
  ]
}
