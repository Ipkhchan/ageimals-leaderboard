const getTopWinners = require("../getTopWinners.js");
const assert = require("chai").assert;
const should = require("chai").should();

describe("getTopWinners", function() {
  it("should return a user object with valid attributes", async function() {
    users = await getTopWinners(1);
    users.should.be.a("array");
    users.should.have.length(1);
    user = users[0];
    user["displayName"].should.be.a("string");
    user["displayName"].should.not.equal("");
    user["wins"].should.be.a("number");
    user["losses"].should.be.a("number");
    user["winStreak"].should.be.a("number");
    user["lossStreak"].should.be.a("number");
  });

  it("should return 10 user objects by default", async function() {
    users = await getTopWinners();
    users.should.be.a("array");
    users.should.have.length(10);
  });

  it("should return users sorted by most wins", async function() {
    users = await getTopWinners();
    for (let i = 0; i < users.length - 1; i++) {
      assert.isAtLeast(
        users[i]["wins"],
        users[i + 1]["wins"],
        users[i] + " has greater or equal wins than " + users[i + 1]
      );
    }
  });
});
