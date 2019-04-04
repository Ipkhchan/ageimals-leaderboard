const getTopOfLeaderboard = require('./getTopOfLeaderboard.js');

const root = { 
  mostWins: ({numUsers}) => getTopOfLeaderboard(numUsers),
  mostLosses: ({numUsers}) => getBottomOfLeaderboard(numUsers),
  highestWinStreaks: ({numUsers}) => getTopWinStreaks(numUsers),
  highestLoseStreaks: ({numUsers}) => getTopLoseStreaks(numUsers),
  winners: ({userHandles}) => postWinners(userHandles)
};

function getBottomOfLeaderboard(numUsers) {
  return ["@dummy", "@data"];
}

function getTopWinStreaks(numUsers) {
  return ["@rabbit"];
}

function getTopLoseStreaks(numUsers) {
  return ["@koala"];
}

function postWinners(userHandles) {
  return true;
}

module.exports = root;
