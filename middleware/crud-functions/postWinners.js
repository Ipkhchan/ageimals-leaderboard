const db = require('../../firebase.js');
const calculateRankScore = require('../../utilities/calculations.js');

function postWinners(userHandles) {
  let ref = db.collection('users');
  let promises = userHandles.map(async (user) => {
    const document = ref.doc(user);
    const data = await document.get();
    if (data['_createTime'] === undefined) {
      return document.set({
        wins: 1,
        losses: 0,
        winStreak: 1,
        lossStreak: 0,
        scoreRank: calculateRankScore(1, 0),
      });
    } else {
      const fields = data['_fieldsProto'];
      const updatedWins = Number(fields['wins']['integerValue']) + 1;
      const updatedWinStreak = Number(fields['winStreak']['integerValue']) + 1;
      const losses = Number(fields['losses']['integerValue']);
      const score = calculateRankScore(updatedWins, losses);
      return document.update({
        wins: updatedWins,
        winStreak: updatedWinStreak,
        lossStreak: 0,
        rankScore: score,
      });
    }
  });

  result = Promise.all(promises)
    .then(result => {
      return true;
    })
    .catch(error => {
      return false;
    });
  return result;
}

module.exports = postWinners;
