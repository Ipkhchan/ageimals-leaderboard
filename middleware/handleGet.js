const cTable = require('console.table');
const {
  getBottomOfLeaderboard,
  getTopLoseStreaks,
  getTopOfLeaderboard,
  getTopWinStreaks,
} = require('./crud-functions/index.js');
const {orderObjects} = require('../utilities/object-formatting.js');
const {orderedColumns, commands} = require('../constants');

async function handleGet(ctx) {
  const {text} = ctx.request.body;
  let [category, numUsers] = text.split(' ');
  numUsers = Number(numUsers);

  if (!commands.includes(category) && text.length) {
    ctx.status = 200;
    ctx.body =
      'The entered text does not match any available command. Check the options or your spelling.';
    return;
  }

  const responseType = text.includes('in_channel') || 'ephemeral';

  let users = [];
  let tableTitle = '';

  switch (category) {
    case 'self': {
      //get Single User
      break;
    }
    case 'wins': {
      users = await getTopOfLeaderboard(numUsers);
      tableTitle = 'Top Wins';
      break;
    }
    case 'losses': {
      users = await getBottomOfLeaderboard(numUsers);
      tableTitle = 'Top Losses';
      break;
    }
    case 'winstreak': {
      users = await getTopWinStreaks(numUsers);
      tableTitle = 'Top Win Streaks';
      break;
    }
    case 'lossstreak': {
      users = await getTopLoseStreaks(numUsers);
      tableTitle = 'Top Loss Streaks';
      break;
    }
    default: {
      users = await getTopOfLeaderboard();
      tableTitle = 'Top Wins';
    }
  }

  users = orderObjects(orderedColumns, users);

  const table = `\`\`\`${cTable.getTable(users)}\`\`\``;
  const body = {
    response_type: responseType,
    attachments: [{title: `Ageimals Leaderboard - ${tableTitle}`, text: table}],
  };

  ctx.status = 200;
  ctx.body = body;
}

module.exports = handleGet;
