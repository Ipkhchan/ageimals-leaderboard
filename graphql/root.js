const getTopOfLeaderboard = require('./getTopOfLeaderboard.js');
const getBottomOfLeaderboard = require('./getBottomOfLeaderboard.js');
const getTopWinStreaks = require('./getTopWinStreaks.js');
const getTopLoseStreaks = require('./getTopLoseStreaks.js');

const root = { 
  mostWins: ({numUsers}) => getTopOfLeaderboard(numUsers),
  mostLosses: ({numUsers}) => getBottomOfLeaderboard(numUsers),
  highestWinStreaks: ({numUsers}) => getTopWinStreaks(numUsers),
  highestLoseStreaks: ({numUsers}) => getTopLoseStreaks(numUsers),
  winners: ({userHandles}) => postWinners(userHandles)
};

function postWinners(userHandles) {
  return true;
}

module.exports = root;
