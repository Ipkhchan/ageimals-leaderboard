const db = require('../../../firebase.js');
const postLosers = require('../postLosers.js');
const assert = require('chai').assert;

describe('postLosers', function() {
  it('should return true for adding user to db', async function() {
    const winners = ["nash"];
    const response = await postLosers(winners);
    assert.equal(response, winners);
    revertLossData(winners);
  });
});

function revertLossData(userHandles) {
  const ref = db.collection("users");
  const promises = userHandles.map(async user => {
    const document = ref.doc(user);
    return document.update({
      losses: admin.firestore.FieldValue.increment(-1),
      lossStreak: admin.firestore.FieldValue.increment(-1),
      winStreak: 0,
    });
  });

  Promise.all(promises)
    .then((_result) => {
      console.log("User data successfully reverted!");
    })
    .catch((error) => {
      console.log("Error reverting user data: " + error.message + ".");
    });
  return;
}
