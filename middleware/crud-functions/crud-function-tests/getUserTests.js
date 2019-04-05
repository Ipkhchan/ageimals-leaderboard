const getUser = require('../getUser.js');
const assert = require('chai').assert;
const should = require('chai').should();

describe('getUser', function() {
  it('should return a user object with valid attributes', async function() {
    let user = await getUser("nash");
    assert.equal(user["displayName"], "nash");
    user["wins"].should.be.a("number");
    user["losses"].should.be.a("number");
    user["winStreak"].should.be.a("number");
    user["lossStreak"].should.be.a("number");
    user["rankScore"].should.be.a("number");
  });
});
