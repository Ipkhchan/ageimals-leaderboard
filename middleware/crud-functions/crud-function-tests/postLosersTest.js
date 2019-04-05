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

  it("should increment losses, winStreak and set lossStreak to 0", async function() {
    const beforeUser = await getUser("nash");
    await postWinners(["nash"]);
    const afterUser = await getUser("nash");

    assert.equal(afterUser["losses"], beforeUser["losses"]+1);
    assert.equal(afterUser["lossStreak"], beforeUser["lossStreak"]+1);
    assert.equal(afterUser["lossStreak"], 0);
    revertWinData(["nash"]);

    const revertedUser = await getUser("nash");

    assert.equal(revertedUser["losses"], beforeUser["losses"]);
    assert.equal(revertedUser["lossStreak"], beforeUser["lossStreak"]);
  });

  it("should increment losses, winStreak and set lossStreak to 0", async function() {
    const beforeUser = await getUser("nash");
    await postWinners(["nash"]);
    const afterUser = await getUser("nash");

    assert.equal(afterUser["losses"], beforeUser["losses"]+1);
    assert.equal(afterUser["lossStreak"], beforeUser["lossStreak"]+1);
    assert.equal(afterUser["lossStreak"], 0);
    revertWinData(["nash"]);

    const revertedUser = await getUser("nash");

    assert.equal(revertedUser["losses"], beforeUser["losses"]);
    assert.equal(revertedUser["lossStreak"], beforeUser["lossStreak"]);
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
