module.exports = {
  name: 'Janissaries',
  id: 'janissaries',
  rewardType: 'unit',
  tier: 1,
  season: 3,
  prerequisites: [],
  requiredPerStage: 6,
  unitChallenges: [
    {
      key: 0,
      text: "In Siege or Field Battles, have any unit's kill/death ratio reach 1 or above 6 times.",
      stage: 1
    },
    {
      key: 1,
      text: 'Take three or more units from different eras into a Siege or Field battle 5 times.',
      stage: 1
    },
    {
      key: 2,
      text: 'In 4 Siege Battles, destroy a siege engines or get 40 capture points 4 times.',
      stage: 1
    },
    { key: 3, text: 'Use a trebuchet or interrupt a capture in 6 Siege Battles.', stage: 1 },
    { key: 4, text: 'Raise your hero up 5 levels.', stage: 1 },
    { key: 5, text: 'Complete 8 Fief Quests.', stage: 1 },
    { key: 6, text: 'Earn 5 "Shatter the Ranks" badges.', stage: 1 },
    {
      key: 7,
      text: 'In Siege or Field Battles, you (or your group collectively) defeat 35 heroes.',
      stage: 1
    },
    { key: 0, text: 'Win 4 Field or Siege Battles.', stage: 2 },
    { key: 1, text: 'Get 40 hero kills or assists in Free Battles.', stage: 2 },
    {
      key: 2,
      text: 'Achieve victory at 6 Rebel Camps or Bandit Raids of any difficulty.',
      stage: 2
    },
    { key: 3, text: 'Win 6 Expeditions.', stage: 2 },
    { key: 4, text: 'In Siege or Field Battles, get an A rating or better 6 times.', stage: 2 },
    {
      key: 5,
      text: 'In Siege or Field Battles, use firearm-wielding units to deal 3,000,000 damage.',
      stage: 2
    },
    { key: 6, text: 'Take a firearm unit into 5 Siege battles.', stage: 2 },
    {
      key: 7,
      text: 'In Siege or Field Battles, you or your group collectively kill a total of 240 soldiers in 6 battles.',
      stage: 2
    },
    {
      key: 0,
      text: 'In Siege or Field Battles, you or your group collectively kill a total of 8 heroes in 5 battles.',
      stage: 3
    },
    {
      key: 1,
      text: 'In Siege Battles, deploy or destroy an artillery piece in 6 battles.',
      stage: 3
    },
    {
      key: 2,
      text: 'In Siege Battles, use Janissaries and earn a kill/death ratio greater than 1 in 6 battles.',
      stage: 3
    },
    { key: 3, text: 'In Siege or Field Battles, use Janissaries to kill 180 troops.', stage: 3 },
    { key: 4, text: 'In Siege or Field Battles, deal 180,000 Critical damage.', stage: 3 },
    { key: 5, text: 'Kill 10 heroes in Deathmatch.', stage: 3 },
    { key: 6, text: 'Take Janissaries into 6 Free Battles.', stage: 3 },
    { key: 7, text: 'Earn 5 "Hat Trick" badges.', stage: 3 }
  ]
}
