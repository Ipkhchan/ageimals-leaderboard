const db = require("../../../firebase.js");
const postWinners = require("../postWinners.js");
const getUser = require("../getUser.js");
const assert = require('chai').assert;

describe("postWinners", function() {
  it("should return true for adding user to db", async function() {
    const response = await postWinners(["nash"]);
    response.should.equal(true);
    revertWinData(["nash"]);
  });

  it("should increment wins, winStreak and set lossStreak to 0", async function() {
    const beforeUser = await getUser("nash");
    await postWinners(["nash"]);
    const afterUser = await getUser("nash");

    assert.equal(afterUser["wins"], beforeUser["wins"]+1);
    assert.equal(afterUser["winStreak"], beforeUser["winStreak"]+1);
    assert.equal(afterUser["lossStreak"], 0);
    revertWinData(["nash"]);
  });
});

function revertWinData(userHandles) {
  const ref = db.collection("users");
  const promises = userHandles.map(async user => {
    const document = ref.doc(user);
    return document.update({
      wins: admin.firestore.FieldValue.increment(-1),
      winStreak: admin.firestore.FieldValue.increment(-1),
      lossStreak: 0,
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
