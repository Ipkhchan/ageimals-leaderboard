const db = require("../firebase.js");
const cTable = require("console.table");

async function handleRequests(ctx) {
  const {
    channel_id,
    channel_name,
    user_id,
    user_name,
    command,
    text
  } = ctx.request.body;

  function orderObject(orderedKeys, object) {
    const orderedObject = {};

    orderedKeys.forEach(key => {
      const [originalKey, renamedKey] = key;

      if (object[originalKey] || object[originalKey] === 0) {
        orderedObject[renamedKey] = object[originalKey];
      }
    });

    return orderedObject;
  }

  const orderedColumns = [
    ["displayName", "Display Name"],
    ["wins", "Wins"],
    ["losses", "Losses"],
    ["winStreak", "Win Streak"],
    ["lossStreak", "Loss Streak"]
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
