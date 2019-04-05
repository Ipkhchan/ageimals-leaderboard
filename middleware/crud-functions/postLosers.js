const {db} = require('../../firebase.js');
const admin = firebase.admin;

function postLosers(userHandles) {
  var ref = db.collection('users');
  userHandles.map(async (user) => {
    const document = ref.doc(user);
    const data = await document.get();
    if (data['_createTime'] === undefined) {
      document
        .set({
          wins: 0,
          losses: 1,
          winStreak: 0,
          lossStreak: 1,
        })
        .then(() => {
          console.log(user, ' successfully written!');
        })
        .catch((error) => {
          console.error('Error writing user: ', error);
        });
    } else {
      document
        .update({
          losses: admin.firestore.FieldValue.increment(1),
          lossStreak: admin.firestore.FieldValue.increment(1),
          winStreak: 0,
        })
        .then(() => {
          console.log(user, ' successfully updated!');
        })
        .catch((error) => {
          console.error('Error writing user: ', error);
        });
    }
  });

  return true;
}

module.exports = postLosers;
