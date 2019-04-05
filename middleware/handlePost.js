const {postWinners, postLosers} = require('./crud-functions/index.js');

async function handlePost(ctx) {
  const {channel_id, text} = ctx.request.body;
  postWinners(text);
}

module.exports = handlePost;
