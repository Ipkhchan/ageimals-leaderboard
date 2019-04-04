const db = require("../../../firebase.js");
const postWinners = require("../postWinners.js");
const getUser = require("../getUser.js");
const assert = require('chai').assert;
const should = require("chai").should();

describe("postWinners", function() {
  it("should return true for adding user to db", async function() {
    const response = await postWinners(["nash"]);
    response.should.equal(true);
    revertProdData(["nash"]);
  });
});

function revertProdData(userHandles) {
  const ref = db.collection("users");
  userHandles.map(async user => {
    const document = ref.doc(user);
    document
      .update({
        wins: admin.firestore.FieldValue.increment(-1),
        winStreak: admin.firestore.FieldValue.increment(-1),
        lossStreak: 0
      })
      .then(() => {
        console.log("successfully updated!");
      })
      .catch((error) => {
        console.error("Error writing user: ", error);
      });
  });
}
