const firebase = require("../firebase.js");
const db = firebase.db;

async function getTopOfLeaderboard(numUsers = 10) {
  const users = db
    .collection("users")
    .orderBy("wins", "desc")
    .limit(numUsers);
  const snapshot = await users.get();
  const topUsers = snapshot.docs.map(doc => doc.data());

  return topUsers;
}

module.exports = getTopOfLeaderboard;
