const axios = require('axios');
const {postWinners, postLosers} = require('./crud-functions/index.js');

async function handlePost(ctx) {
  const {user_id, text: correctAnswer} = ctx.request.body;

  const adminIds = process.env.ADMIN_IDS.split(',');
  if (!adminIds.includes(user_id)) {
    ctx.status = 200;
    ctx.body = 'You are not authorized to post results';
    return;
  }

  if (!correctAnswer) {
    ctx.status = 200;
    ctx.body = 'You must enter the correct response to the poll';
    return;
  }

  async function getMessages(latestMsgTimestamp, numMessages) {
    const response = await axios.get(
      'https://slack.com/api/channels.history?channel=CH3024YR4',
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
        params: {
          latest: latestMsgTimestamp,
          count: numMessages,
        },
      },
    );
    const messages = response.data.messages;

    return messages;
  }

  let latestMsgTimestamp = 0;
  const numMessages = 100;
  let foundPoll = false;

  while (!foundPoll) {
    var messages = await getMessages(latestMsgTimestamp, numMessages);
    var pollMessage = messages.find((message) => {
      return message.username === 'Polly';
    });

    if (pollMessage) {
      foundPoll = true;
    } else {
      latestMsgTimestamp = messages[messages.length - 1].ts;
    }
  }

  const pollResponses = pollMessage.attachments.find((attachment) => {
    return attachment.id === 2;
  }).fields;

  const responseTitles = pollResponses.map((response) => response.title);
  if (!responseTitles.includes(correctAnswer)) {
    ctx.status = 200;
    ctx.body = 'The answer you entered does not match any options in the poll.';
    return;
  }

  let winners = [];
  let losers = [];

  pollResponses.forEach((response) => {
    const {title, value} = response;
    const responderIds = value.match(/(?<=\@).*?(?=\>)/g) || [];

    if (title === correctAnswer) {
      winners = [...winners, ...responderIds];
    } else {
      losers = [...losers, ...responderIds];
    }
  });

  winners = await postWinners(winners);
  winners = winners.map((winner) => `<@${winner}> `);
  losers = await postLosers(losers);

  const hasWinnersMessage = `Congrats to ${winners.join(
    ' ',
  )}, the correct answer is *${correctAnswer}* old!`;
  const noWinnersMessage = `Ageimal? More like dismal. All of you were wrong! The correct answer is *${correctAnswer}* old!`;

  ctx.status = 200;
  ctx.body = winners.length ? hasWinnersMessage : noWinnersMessage;
}

module.exports = handlePost;
