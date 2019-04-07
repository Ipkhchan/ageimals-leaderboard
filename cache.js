class Cache {
  constructor() {
    this.lastWinners = [];
    this.lastLosers = [];
  }

  newWinners(winners) {
    this.lastWinners = winners;
  }

  newLosers(losers) {
    this.lastLosers = losers;
  }

  getLastWinners() {
    return this.lastWinners;
  }

  getLastLosers() {
    return this.lastLosers;
  }
}

const prodCache = new Cache();

module.exports = {
  cache: prodCache,
  TestCache: Cache
};
