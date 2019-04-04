const postWinners = require("../graphql/postWinners.js");
const should = require("chai").should();

describe("postWinners", function() {
  it("should return true for adding user to db", async function() {
    response = await postWinners(["nash"]);
    response.should.equal(true);
  });
});
