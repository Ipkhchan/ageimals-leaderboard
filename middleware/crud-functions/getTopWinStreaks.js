const db = require('../../firebase.js');

async function getTopWinStreaks(numUsers = 10) {
  const users = db
    .collection('users')
    .orderBy('winStreak', 'desc')
    .limit(numUsers);
  const snapshot = await users.get();
  const topWinStreakUsers = snapshot.docs.map((doc) => doc.data());

  return topWinStreakUsers;
}

module.exports = getTopWinStreaks;
