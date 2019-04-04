const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountCredentials.json");
const cTable = require("console.table");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ageimals-leaderboard.firebaseio.com"
});

const db = admin.firestore();

async function handleRequests(ctx) {
  const {
    channel_id,
    channel_name,
    user_id,
    user_name,
    command,
    text
  } = ctx.request.body;

  function orderObject(keyOrder, object) {
    const orderedObject = {};

    keyOrder.forEach(key => {
      if (object[key] || object[key] === 0) {
        orderedObject[key] = object[key];
      }
    });

    return orderedObject;
  }

  const orderedColumns = [
    "displayName",
    "wins",
    "losses",
    "winStreak",
    "lossStreak"
  ];

  const users = db.collection("users");
  const snapshot = await users.get();
  const allUsers = snapshot.docs.map(doc =>
    orderObject(orderedColumns, doc.data())
  );

  const table = `\`\`\`${cTable.getTable(allUsers)}\`\`\``;
  const body = {
    attachments: [{ title: "Ageimals Leaderboard", text: table }]
  };

  ctx.status = 200;
  ctx.body = body;
}

module.exports = handleRequests;
