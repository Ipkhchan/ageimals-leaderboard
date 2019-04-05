const getTopOfLeaderboard = require('./getTopOfLeaderboard');
const getBottomOfLeaderboard = require('./getBottomOfLeaderboard');
const getTopWinStreaks = require('./getTopWinStreaks');
const getTopLoseStreaks = require('./getTopLoseStreaks');

const postWinners = require('./postWinners');
const postLosers = require('./postLosers');

module.exports = {
  getTopOfLeaderboard: getTopOfLeaderboard,
  getBottomOfLeaderboard: getBottomOfLeaderboard,
  getTopWinStreaks: getTopWinStreaks,
  getTopLoseStreaks: getTopLoseStreaks,
  postWinners: postWinners,
  postLosers: postLosers,
};
