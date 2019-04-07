const db = require('../../firebase.js');

async function getTopWinners(numUsers = 10) {
  const users = db
    .collection('users')
    .orderBy('wins', 'desc')
    .limit(numUsers);
  const snapshot = await users.get();
  const topWinners = snapshot.docs.map((doc) => doc.data());

  return topWinners;
}

module.exports = getTopWinners;
