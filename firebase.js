const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountCredentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ageimals-leaderboard.firebaseio.com"
});

const db = admin.firestore();

module.exports = db;
