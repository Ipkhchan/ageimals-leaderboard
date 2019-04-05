const db = require("../../../firebase.js");
const postWinners = require("../postWinners.js");
const getUser = require("../getUser.js");
const assert = require('chai').assert;

describe("postWinners", function() {
  it("should return updated users", async function() {
    const winners = ["nash"];
    const response = await postWinners(winners);
    assert.equal(response, winners);
    revertWinData(winners);
  });

  it("should increment wins, winStreak and set lossStreak to 0", async function() {
    const winnerHandle = "nash";
    const winners = [winnerHandle];
    const beforeUser = await getUser(winnerHandle);
    await postWinners(winners);
    const afterUser = await getUser(winnerHandle);

    assert.equal(afterUser["wins"], beforeUser["wins"]+1);
    assert.equal(afterUser["winStreak"], beforeUser["winStreak"]+1);
    assert.equal(afterUser["lossStreak"], 0);
    revertWinData(winners);
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
