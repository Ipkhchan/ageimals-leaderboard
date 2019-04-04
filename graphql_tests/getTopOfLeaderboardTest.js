const getTopOfLeaderboard = require('../graphql/getTopOfLeaderboard.js');
const should = require('chai').should();

describe('getTopOfLeaderboard', function() {
  it('should return a user object with valid attributes', async function() {
    users = await getTopOfLeaderboard(1);
    users.should.be.a("array");
    user = users[0];
    user["displayName"].should.be.a("string");
    user["displayName"].should.not.equal("");
    user["wins"].should.be.a("number");
    user["losses"].should.be.a("number");
    user["winStreak"].should.be.a("number");
    user["lossStreak"].should.be.a("number");
  });
});
