const firebase = require("../firebase.js");
const db = firebase.db;

async function getBottomOfLeaderboard(numUsers = 10) {
  const users = db
    .collection("users")
    .orderBy("wins")
    .limit(numUsers);
  const snapshot = await users.get();
  const bottomUsers = snapshot.docs.map(doc => doc.data());

  return bottomUsers;
}

module.exports = getBottomOfLeaderboard;
