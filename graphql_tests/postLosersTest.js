const firebase = require("../firebase.js");
const db = firebase.db;
const admin = firebase.admin;
const postLosers = require("../graphql/postLosers.js");
const should = require("chai").should();

describe("postLosers", function() {
  it("should return true for adding user to db", async function() {
    response = await postLosers(["nash"]);
    revertProdData(["nash"]);
    response.should.equal(true);
  });
});

async function revertProdData(userHandles) {
  var ref = db.collection("users");
  const document = ref.doc(userHandles[0]);
  document
    .update({
      losses: admin.firestore.FieldValue.increment(-1),
      lossStreak: admin.firestore.FieldValue.increment(-1),
      winStreak: 0
    })
    .then(function() {
      console.log("successfully updated!");
    })
    .catch(function(error) {
      console.error("Error writing user: ", error);
    });
}