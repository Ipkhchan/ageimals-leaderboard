const db = require('../../firebase.js');

function postWinners(userHandles) {
  var ref = db.collection('users');
  userHandles.map(async (user) => {
    const document = ref.doc(user);
    const data = await document.get();
    if (data['_createTime'] === undefined) {
      document
        .set({
          wins: 1,
          losses: 0,
          winStreak: 1,
          lossStreak: 0,
          scoreRank: calculateRankScore(1, 0),
        })
        .then(() => {
          console.log(user, ' successfully written!');
        })
        .catch((error) => {
          console.error('Error writing user: ', error);
        });
    } else {
      const fields = data['_fieldsProto'];
      let updatedWins = Number(fields['wins']['integerValue']) + 1;
      let updatedWinStreak = Number(fields['winStreak']['integerValue']) + 1;
      let losses = Number(fields['losses']['integerValue']);
      const score = calculateRankScore(updatedWins, losses);
      document
        .update({
          wins: updatedWins,
          winStreak: updatedWinStreak,
          lossStreak: 0,
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

module.exports = postWinners;
