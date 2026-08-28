module.exports = {
  name: 'Shieldmaidens',
  id: 'shieldmaidens',
  rewardType: 'unit',
  tier: 1,
  season: 6,
  prerequisites: [{ unlockId: 'berserkers', requiredStages: 3 }],
  requiredPerStage: 10,
  unitChallenges: [
    { key: 0, text: 'Win 6 Field or Siege Battles.', stage: 1 },
    {
      key: 1,
      text: 'In Field or Siege Battles, have any unit kill/death ratio reach 1 or above 8 times.',
      stage: 1
    },
    {
      key: 2,
      text: 'In Expeditions, use Northlander units and get an A ranking or better 8 times.',
      stage: 1
    },
    { key: 3, text: 'Raise your hero up 12 levels.', stage: 1 },
    { key: 4, text: 'Search 20 loot sites in the open world.', stage: 1 },
    { key: 5, text: 'Get the "A Deadly Century" badge 7 times.', stage: 1 },
    {
      key: 6,
      text: 'Earn 8 "Cakewalk" badges while using Northlander units during Expeditions.',
      stage: 1
    },
    {
      key: 7,
      text: 'In Siege or Field Battles, earn 40 capture points or interrupt a capture in 7 battles.',
      stage: 1
    },
    {
      key: 8,
      text: 'In Deathmatch, you or your group collectively kill a total of 120 heroes.',
      stage: 1
    },
    {
      key: 9,
      text: 'Push a siege tower to the ramparts or destroy a siege engine in 6 Siege Battles.',
      stage: 1
    },
    { key: 10, text: 'In Siege or Field Battles, get ranked in the top 5, 8 times.', stage: 1 },
    {
      key: 11,
      text: 'In Field or Siege Battles, win without taking a 1-star unit 4 times.',
      stage: 1
    },
    {
      key: 0,
      text: 'In Siege or Field Battles, you or your group collectively kill a total of 8 heroes in 10 battles.',
      stage: 2
    },
    { key: 1, text: 'Win 6 Ranked Battles.', stage: 2 },
    { key: 2, text: 'Use Northlander units in 10 Ranked Battles.', stage: 2 },
    { key: 3, text: 'In Field or Siege Battles, use artillery to kill 200 troops.', stage: 2 },
    { key: 4, text: 'Earn 10 "Hat Trick" badges.', stage: 2 },
    { key: 5, text: 'Get 80 hero kills or assists in Free Battles.', stage: 2 },
    {
      key: 6,
      text: 'Take a sword infantry unit into a Siege or Field battle 6 times and win.',
      stage: 2
    },
    { key: 7, text: 'In Siege or Field Battles, use Northlander units and win 6 times.', stage: 2 },
    {
      key: 8,
      text: 'Get a K/D ratio of 2 or greater with a Northlander unit, during 12 Expedition battles.',
      stage: 2
    },
    { key: 9, text: 'In Siege or Field Battles, get ranked in the top 5, 12 times.', stage: 2 },
    { key: 10, text: 'In Siege or Field Battles, deal 400,000 Critical damage.', stage: 2 },
    {
      key: 11,
      text: 'In Siege or Field Battles, use Northlander units to kill 500 troops.',
      stage: 2
    },
    { key: 0, text: 'Defeat 2,000 troops during Expeditions.', stage: 3 },
    {
      key: 1,
      text: 'In Siege Battles, deploy or destroy an artillery piece in 12 battles.',
      stage: 3
    },
    { key: 2, text: 'In Siege Battles, get the "Say Cheese" badge 4 times.', stage: 3 },
    { key: 3, text: 'Get 40 silver or better badges in any battle.', stage: 3 },
    { key: 4, text: 'In Deathmatch, get an A ranking or better 10 times.', stage: 3 },
    { key: 5, text: 'Take part in 8 Territory Wars.', stage: 3 },
    { key: 6, text: 'Earn 12 "Shatter the Ranks" badges.', stage: 3 },
    { key: 7, text: 'Complete 20 Fief Quests.', stage: 3 },
    {
      key: 8,
      text: 'In Siege or Field Battles, you (or your group collectively) defeat 60 heroes.',
      stage: 3
    },
    {
      key: 9,
      text: 'Use four units from different eras in a Siege or Field battle 12 times and win.',
      stage: 3
    },
    {
      key: 10,
      text: 'In Field or Siege Battles, use a Charge-type unit skill to kill 180 or more troops.',
      stage: 3
    },
    {
      key: 11,
      text: 'In Siege or Field Battles, earn 40 capture points or interrupt a capture in 8 battles.',
      stage: 3
    },
    { key: 0, text: 'Win 6 Deathmatches.', stage: 4 },
    { key: 1, text: 'Take part in 8 Territory Wars.', stage: 4 },
    { key: 2, text: 'In Ranked Battles, get an A ranking or better 10 times.', stage: 4 },
    { key: 3, text: 'Earn 120 badges.', stage: 4 },
    {
      key: 4,
      text: 'In Expeditions, use Northlander units and get an A ranking or better 12 times.',
      stage: 4
    },
    {
      key: 5,
      text: 'Push a siege tower to the ramparts or destroy a siege engine in 8 Siege Battles.',
      stage: 4
    },
    {
      key: 6,
      text: 'In Siege or Field Battles, you or your group members get 30 rankings of A+ or better.',
      stage: 4
    },
    { key: 7, text: 'In Siege or Field Battles, get ranked in the top 5, 10 times.', stage: 4 },
    {
      key: 8,
      text: "In Field or Siege Battles, have any unit's kill/death ratio reach 1 or above 12 times.",
      stage: 4
    },
    { key: 9, text: 'In 10 Field or Siege Battles, get 8 kills or assists.', stage: 4 },
    { key: 10, text: 'In Field or Siege Battles, kill 600 troops.', stage: 4 },
    { key: 11, text: 'Use Northlander units in 5 Ranked Battles and win.', stage: 4 },
    { key: 0, text: 'Raise your hero up 15 levels.', stage: 5 },
    { key: 1, text: 'Earn 6 "Drop Dead" badges.', stage: 5 },
    { key: 2, text: 'In Expedition Mode, get an S ranking 10 times.', stage: 5 },
    { key: 3, text: 'Earn 8 "Cakewalk" badges during Expeditions.', stage: 5 },
    {
      key: 4,
      text: 'Achieve victory on 10 Rebel Camps or Bandit Raids of any difficulty.',
      stage: 5
    },
    { key: 5, text: 'Earn 7 "No Quarter" badges.', stage: 5 },
    {
      key: 6,
      text: 'In Siege or Field Battles, you or your group members get 50 rankings of B+ or better.',
      stage: 5
    },
    { key: 7, text: 'In Free Battles, kill 600 troops.', stage: 5 },
    { key: 8, text: 'In Field or Siege Battles, kill 25 heroes.', stage: 5 },
    { key: 9, text: 'In Siege or Field Battles, get ranked in the top 5, 10 times.', stage: 5 },
    {
      key: 10,
      text: 'In Siege Battles, destroy a siege ladder or acquire 15 capture points in 12 battles.',
      stage: 5
    },
    { key: 11, text: 'In Siege or Field Battles, your spearmen take 6,000,000 damage.', stage: 5 },
    { key: 0, text: 'Win 10 Expeditions using Shieldmaidens.', stage: 6 },
    { key: 1, text: 'Earn 3 "Settle the Score" badges.', stage: 6 },
    { key: 2, text: 'In Ranked Battles, get an S ranking 8 times.', stage: 6 },
    { key: 3, text: 'Win 8 Deathmatches.', stage: 6 },
    {
      key: 4,
      text: 'In Deathmatch, you or your group collectively kill a total of 150 heroes.',
      stage: 6
    },
    { key: 5, text: 'Take Shieldmaidens into 6 Ranked Battles and win.', stage: 6 },
    { key: 6, text: 'In Siege or Field Battles, get an S rating or better 7 times.', stage: 6 },
    {
      key: 7,
      text: 'In Siege or Field Battles, earn 40 capture points or interrupt a capture in 10 battles.',
      stage: 6
    },
    {
      key: 8,
      text: 'In Siege or Field Battles, you or your group collectively kill a total of 240 soldiers in 12 battles.',
      stage: 6
    },
    {
      key: 9,
      text: 'In Siege Battles, deploy or destroy an artillery piece in 12 battles.',
      stage: 6
    },
    { key: 10, text: 'Take Shieldmaidens into a Siege or Field battle 12 times.', stage: 6 },
    { key: 11, text: 'In Siege or Field Battles, earn 12 "A Deadly Century" badges.', stage: 6 },
    { key: 0, text: 'Earn 2 "Combo Breaker" badges.', stage: 7 },
    {
      key: 1,
      text: 'In Field or Siege Battles, use Shieldmaidens to take 7,000,000 damage.',
      stage: 7
    },
    {
      key: 2,
      text: 'Achieve victory at 8 Rebel Camps or Bandit Raids of any difficulty using Shieldmaidens.',
      stage: 7
    },
    { key: 3, text: 'Kill 200 soldiers in a single battle in any mode 10 times.', stage: 7 },
    {
      key: 4,
      text: 'Take Shieldmaidens into 10 Free Battles and get an A rating or better.',
      stage: 7
    },
    { key: 5, text: 'Take Shieldmaidens into 6 Free Battles and win.', stage: 7 },
    {
      key: 6,
      text: 'Take Shieldmaidens into 10 Ranked Battles and get a K/D ratio greater than 1.',
      stage: 7
    },
    {
      key: 7,
      text: 'In Field or Siege Battles, use Shieldmaidens\' skill "Freyja\'s Charge" to deal 1,000,000 damage.',
      stage: 7
    },
    {
      key: 8,
      text: 'In Siege or Field Battles, you or your group collectively kill a total of 8 heroes in 12 battles.',
      stage: 7
    },
    { key: 9, text: 'In Siege or Field Battles, get ranked in the top 5, 10 times.', stage: 7 },
    {
      key: 10,
      text: 'In Field or Siege Battles, use Shieldmaidens to kill 600 soldiers.',
      stage: 7
    },
    {
      key: 11,
      text: 'In Siege or Field Battles, use Shieldmaidens and get an A rating or better 10 times.',
      stage: 7
    }
  ]
}
