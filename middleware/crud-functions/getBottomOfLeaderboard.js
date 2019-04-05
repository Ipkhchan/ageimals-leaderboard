<<<<<<< HEAD:middleware/crud-functions/getBottomOfLeaderboard.js
const {db} = require('../../firebase.js');
=======
const db = require("../firebase.js");
>>>>>>> added score calculation:graphql/getBottomOfLeaderboard.js

async function getBottomOfLeaderboard(numUsers = 10) {
  const users = db
    .collection('users')
    .orderBy('losses', 'desc')
    .limit(numUsers);
  const snapshot = await users.get();
  const bottomUsers = snapshot.docs.map((doc) => doc.data());

  return bottomUsers;
}

module.exports = getBottomOfLeaderboard;
