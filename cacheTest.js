const {TestCache} = require("./cache.js");
const assert = require("chai").assert;
const should = require("chai").should();

describe("Cache", function() {
  it("should set and get the last winners", function() {
    let cache = new TestCache();
    cache.getLastWinners().should.be.empty;
    userHandles = ["nash", "joey", "kostia", "brian", "ivan"];
    cache.newWinners(userHandles);
    cachedWinners = cache.getLastWinners();
    assert.equal(cachedWinners.length, userHandles.length);
    for (userHandle of userHandles) {
      assert(true, cachedWinners.includes(userHandle));
    }
  });

  it("should set and get the last losers", function() {
    let cache = new TestCache();
    cache.getLastLosers().should.be.empty;
    userHandles = ["nash", "joey", "kostia", "brian", "ivan"];
    cache.newLosers(userHandles);
    cachedLosers = cache.getLastLosers();
    assert.equal(cachedLosers.length, userHandles.length);
    for (userHandle of userHandles) {
      assert(true, cachedLosers.includes(userHandle));
    }
  });
});
