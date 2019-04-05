const db = require('../../firebase.js');

function postLosers(userHandles) {
  const ref = db.collection('users');
  const promises = userHandles.map(async (user) => {
    const document = ref.doc(user);
    const data = await document.get();
    if (data['_createTime'] === undefined) {
      return document.set({
        wins: 0,
        losses: 1,
        winStreak: 0,
        lossStreak: 1,
        scoreRank: calculateRankScore(0, 1),
      });
    } else {
      const fields = data['_fieldsProto'];
      const updatedLosses = Number(fields['losses']['integerValue']) + 1;
      const updatedLossStreak =
        Number(fields['lossStreak']['integerValue']) + 1;
      const wins = Number(fields['wins']['integerValue']);
      const score = calculateRankScore(wins, updatedLosses);
      return document.update({
        losses: updatedLosses,
        lossStreak: updatedLossStreak,
        winStreak: 0,
        rankScore: score,
      });
    }
  });

  const updated = Promise.all(promises)
    .then((_result) => {
      cache.newLosers(userHandles);
      return userHandles;
    })
    .catch((_error) => {
      return [];
    });
  return updated;
}

function calculateRankScore(wins, losses) {
  score = (wins + 100 * 0.2) / (wins + losses + 100);
  return score;
}

module.exports = postLosers;
