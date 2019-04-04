const db = require("../firebase.js");

async function getTopLoseStreaks(numUsers = 10) {
  const users = db.collection("users").orderBy("lossStreak", "desc").limit(numUsers);
  const snapshot = await users.get();
  const topLoseStreakUsers = snapshot.docs.map(doc => doc.data());

  return topLoseStreakUsers;
}

module.exports = getTopLoseStreaks;
