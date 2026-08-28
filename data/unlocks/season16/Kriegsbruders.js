module.exports = {
  name: 'Kriegsbruders',
  id: 'kriegsbruders',
  rewardType: 'unit',
  tier: 1,
  season: 16,
  prerequisites: [{ unlockId: 'schutzdieners', requiredStages: 2 }],
  requiredPerStage: 8,
  unitChallenges: [
    {
      key: 0,
      text: 'Get 40 total kills or assists in Field or Siege Battles of any type.',
      stage: 1
    },
    {
      key: 1,
      text: 'In Field or Siege Battles of any type, get a Troop Kill Score of 400 or higher with 10 units.',
      stage: 1
    },
    { key: 2, text: 'Defeat 1200 troops during Expeditions.', stage: 1 },
    { key: 3, text: 'Get an A+ rating or better in 8 Expedition battles.', stage: 1 },
    { key: 4, text: 'Defeat a band of rebels 12 times in the open world.', stage: 1 },
    { key: 5, text: 'Complete 12 Daily Quests.', stage: 1 },
    { key: 6, text: 'Use a trebuchet or knock down a ladder in 8 battles in any mode.', stage: 1 },
    {
      key: 7,
      text: 'Get a Troop Kill Score of 1000 or higher in 6 Field or Siege Battles of any type.',
      stage: 1
    },
    {
      key: 8,
      text: 'Get a kill/death ratio of 1.5 or higher with any unit in 8 Field or Siege Battles of any type.',
      stage: 1
    },
    {
      key: 9,
      text: 'You or your group collectively kill a total of 8 heroes in 8 Field or Siege Battles of any type.',
      stage: 1
    },
    {
      key: 0,
      text: 'In Field or Siege Battles of any type, you or your group members get 40 B+ or better ratings or get 8 A+ or better ratings.',
      stage: 2
    },
    { key: 1, text: 'Earn 8 "Cakewalk" badges during Expeditions.', stage: 2 },
    {
      key: 2,
      text: 'Get 40 kills or assists in Free Battles, or get 8 kills or assists in 8 Field or Siege Battles of any type.',
      stage: 2
    },
    { key: 3, text: 'Complete 12 Fief Quests.', stage: 2 },
    { key: 4, text: 'Raise your hero up 10 levels.', stage: 2 },
    {
      key: 5,
      text: 'Deploy or destroy an artillery piece in 8 Field or Siege Battles of any type.',
      stage: 2
    },
    { key: 6, text: 'Earn 8 "Shatter the Ranks" badges.', stage: 2 },
    {
      key: 7,
      text: 'Get a kill/death ratio of 1 or higher with any unit in 8 Field or Siege Battles of any type.',
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
    { key: 0, text: 'Earn 8 "Cakewalk" badges during Expeditions.', stage: 3 },
    {
      key: 1,
      text: 'Get an A rating or better in 8 Free Battles, or get an A+ rating or better in 8 Field or Siege Battles of any type.',
      stage: 3
    },
    { key: 2, text: 'Take part in 8 Territory War battles.', stage: 3 },
    { key: 3, text: 'Defeat a band of rebels 12 times in the open world.', stage: 3 },
    {
      key: 4,
      text: 'You or your group collectively kill a total of 240 soldiers in 8 Field or Siege Battles of any type.',
      stage: 3
    },
    {
      key: 5,
      text: 'Get 5 "Say Cheese" or "Settle the Score" badges in Field or Siege Battles of any type.',
      stage: 3
    },
    {
      key: 6,
      text: 'Get an A rating or better in 8 Free Battles, or get an A+ rating or better in 8 Field or Siege Battles of any type.',
      stage: 3
    },
    {
      key: 7,
      text: 'Get a Troop Kill Score of 300 or higher with any unit in 8 Field or Siege Battles of any type.',
      stage: 3
    },
    {
      key: 8,
      text: 'In Field or Siege Battles of any type, win 3 battles in a row or join 5 battles.',
      stage: 3
    },
    {
      key: 9,
      text: 'Use artillery to kill 30 soldiers or 2 heroes in 8 Field or Siege Battles of any type.',
      stage: 3
    },
    { key: 0, text: 'Complete 12 Fief Quests.', stage: 4 },
    { key: 1, text: 'Earn 8 "Cakewalk" badges during Expeditions.', stage: 4 },
    {
      key: 2,
      text: 'Join 8 Ranked Battles or win 8 Field or Siege Battles of any type.',
      stage: 4
    },
    { key: 3, text: 'Complete 12 Daily Quests.', stage: 4 },
    {
      key: 4,
      text: 'You or your group collectively kill a total of 240 soldiers in 8 Field or Siege Battles of any type.',
      stage: 4
    },
    {
      key: 5,
      text: 'Deploy or destroy an artillery piece in 8 Field or Siege Battles of any type.',
      stage: 4
    },
    {
      key: 6,
      text: 'Get 6 "No Quarter" or "Grand Bloodbath" badges in Field or Siege Battles of any type.',
      stage: 4
    },
    {
      key: 7,
      text: 'Destroy a siege engine or acquire 40 capture points in 8 Field or Siege Battles of any type.',
      stage: 4
    },
    {
      key: 8,
      text: 'In Field or Siege Battles of any type, win 3 battles in a row or join 5 battles.',
      stage: 4
    },
    { key: 9, text: 'Use Kriegsbruders and win 8 Expeditions.', stage: 4 },
    {
      key: 0,
      text: 'In Field or Siege Battles of any type, use the Kriegsbruders "Bloodbath" skill to kill 200 enemy soldiers.',
      stage: 5
    },
    {
      key: 1,
      text: 'Use Kriegsbruders to attack 8 Rebel Camps of any difficulty and win.',
      stage: 5
    },
    {
      key: 2,
      text: 'Knock over a siege ladder or acquire 15 capture points in 8 Field or Siege battle.',
      stage: 5
    },
    { key: 3, text: 'Earn 8 "Shatter the Ranks" badges.', stage: 5 },
    {
      key: 4,
      text: 'Deploy or destroy an artillery piece in 8 Field or Siege Battles of any type.',
      stage: 5
    },
    {
      key: 5,
      text: 'You or your group collectively kill a total of 240 soldiers in 8 Field or Siege Battles of any type.',
      stage: 5
    },
    { key: 6, text: 'Complete 12 Daily Quests.', stage: 5 },
    { key: 7, text: 'Take part in 8 Territory War battles.', stage: 5 },
    {
      key: 8,
      text: 'Defeat 20 heroes in Ranked battles, or get the "Grand Bloodbath" badge 4 times in Field or Siege Battles of any type.',
      stage: 5
    },
    { key: 9, text: 'Achieve victory in 8 Raider Camps or Bandit Raids.', stage: 5 }
  ]
}
