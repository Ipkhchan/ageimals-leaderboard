const getTopOfLeaderboard = require("./getTopOfLeaderboard.js");
const getBottomOfLeaderboard = require("./getBottomOfLeaderboard.js");
const getTopWinStreaks = require("./getTopWinStreaks.js");
const getTopLoseStreaks = require("./getTopLoseStreaks.js");
const postWinners = require("./postWinners.js");
const postLosers = require("./postLosers.js");

const root = {
  mostWins: ({ numUsers }) => getTopOfLeaderboard(numUsers),
  mostLosses: ({ numUsers }) => getBottomOfLeaderboard(numUsers),
  highestWinStreaks: ({ numUsers }) => getTopWinStreaks(numUsers),
  highestLoseStreaks: ({ numUsers }) => getTopLoseStreaks(numUsers),
  winners: ({ userHandles }) => postWinners(userHandles),
  losers: ({ userHandles }) => postLosers(userHandles)
};

module.exports = root;
