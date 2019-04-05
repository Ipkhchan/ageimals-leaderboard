const db = require('../../firebase.js');

function postLosers(userHandles) {
  var ref = db.collection('users');
  userHandles.map(async (user) => {
    const document = ref.doc(user);
    const data = await document.get();
    if (data['_createTime'] === undefined) {
      document
        .set({
          wins: 0,
          losses: 1,
          winStreak: 0,
          lossStreak: 1,
          scoreRank: calculateRankScore(0, 1),
        })
        .then(() => {
          console.log(user, ' successfully written!');
        })
        .catch((error) => {
          console.error('Error writing user: ', error);
        });
    } else {
      const fields = data['_fieldsProto'];
      const updatedLosses = Number(fields['losses']['integerValue']) + 1;
      const updatedLossStreak =
        Number(fields['lossStreak']['integerValue']) + 1;
      const wins = Number(fields['wins']['integerValue']);
      const score = calculateRankScore(wins, updatedLosses);
      document
        .update({
          losses: updatedLosses,
          lossStreak: updatedLossStreak,
          winStreak: 0,
          rankScore: score,
        })
        .then(() => {
          console.log(user, ' successfully updated!');
        })
        .catch((error) => {
          console.error('Error writing user: ', error);
        });
    }
  });

  return true;
}

function calculateRankScore(wins, losses) {
  score = (wins + 100 * 0.2) / (wins + losses + 100);
  return score;
}

module.exports = postLosers;
