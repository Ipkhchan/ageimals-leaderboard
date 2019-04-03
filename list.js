const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountCredentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ageimals-leaderboard.firebaseio.com"
});

const db = admin.firestore();

async function list(ctx) {
  const users = db.collection("users");
  const snapshot = await users.get();
  const allUsers = snapshot.docs.map(doc => doc.data());

  ctx.status = 200;
  ctx.body = allUsers;
}

module.exports = list;
