const db = require('../../firebase.js');

async function getTopOfLeaderboard(numUsers = 10) {
  const users = db
    .collection('users')
    .orderBy('rankScore', 'desc')
    .limit(numUsers);
  const snapshot = await users.get();
  const topUsers = snapshot.docs.map((doc) => doc.data());

  return topUsers;
}

module.exports = getTopOfLeaderboard;
