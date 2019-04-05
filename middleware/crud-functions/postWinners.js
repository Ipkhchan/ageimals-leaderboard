const db = require('../../firebase.js');
const calculateRankScore = require('../../utilities/calculations.js');

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
      const updatedWins = Number(fields['wins']['integerValue']) + 1;
      const updatedWinStreak = Number(fields['winStreak']['integerValue']) + 1;
      const losses = Number(fields['losses']['integerValue']);
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

module.exports = postWinners;
