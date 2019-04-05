const db = require("../../firebase.js");

async function getUser(userHandle) {
  const document = db.collection("users").doc(userHandle);
  const snapshot = await document.get();
  let user = snapshot.data();

  return user;
}

module.exports = getUser;
