const firebase = require("../firebase.js");
const db = firebase.db;
const admin = firebase.admin;

function postWinners(userHandles) {
  var ref = db.collection("users");
  userHandles.map(async user => {
    const document = ref.doc(user);
    var data = await document.get();
    if (data["_createTime"] === undefined) {
      document
        .set({
          wins: 1,
          losses: 0,
          winStreak: 1,
          lossStreak: 0
        })
        .then(function() {
          console.log(user, " successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing user: ", error);
        });
    } else {
      document
        .update({
          wins: admin.firestore.FieldValue.increment(1),
          winStreak: admin.firestore.FieldValue.increment(1),
          lossStreak: 0
        })
        .then(function() {
          console.log(user, " successfully updated!");
        })
        .catch(function(error) {
          console.error("Error writing user: ", error);
        });
    }
  });

  return true;
}

module.exports = postWinners;
