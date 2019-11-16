var express = require('express');
var router = express.Router();
var apiVer1 = require('./api/1');

const version = {
  ver_1: '1'
}
const endpointsListVersion1 = [
  {
    name: 'Send message to channel',
    type: 'post',
    level: 1,
    endpoint: '/1/sendMessage?token={token}&channel={channelID}&msg={message}',
    required: [
      {
        id: 'token',
        description: 'The developer token, you have been given.'
      },
      {
        id: 'channel',
        description: 'The ID of the channel you wish to send a message to.'
      },
      {
        id: 'message',
        description: 'The message you wish to send.'
      }],
    optional: [],
    explanation: `Allows you to send messages to a given channel, as the bot. Useful for minigame plugins, that need to announce a winner or lack of players.`
  }, {
    name: 'Send message to user',
    type: 'post',
    level: 1,
    endpoint: '/1/sendMessage?token={token}&user={userID}&msg={message}',
    required: [
      {
        id: 'token',
        description: 'The developer token, you have been given.'
      },
      {
        id: 'user',
        description: 'The ID of the user you wish to send a message to.'
      },
      {
        id: 'message',
        description: 'The message you wish to send.'
      }],
    optional: [],
    explanation: `Allows you to send messages to a given user, as the bot. Useful for giving out debug information from plugins.`
  }, {
    name: 'API and bot version',
    type: 'get',
    level: 0,
    endpoint: '/1/version',
    required: [

    ],
    optional: [

    ],
    explanation: `Gets the current commit and API version of the API and OinkBot.`
  }, {
    name: 'Get message history',
    type: 'get',
    level: 2,
    endpoint: '/1/history?token={token}&channel={channelID}',
    required: [
      {
        id: 'token',
        description: 'The developer token, you have been given.',
      },
      {
        id: 'channel',
        description: 'Rhe ID of the channel you wish to get the history of.',
      }
    ],
    optional: [],
    explanation: `Allows you to get the message history of a given channel. `
  },{
    name: 'Get message history',
    type: 'get',
    level: 2,
    endpoint: '/1/history?token={token}&channel={channelID}&amount={amount}',
    required: [
      {
        id: 'token',
        description: 'The developer token, you have been given.',
      },
      {
        id: 'channel',
        description: 'Rhe ID of the channel you wish to get the history of.',
      }
    ],
    optional: [
      {
        id: 'amount',
        description: 'The amount of messages to get.',
      }
    ],
    explanation: `Allows you to get the message history of a given channel. `
  },
]
router.use('/1', apiVer1)
router.get('/', function (req, res) {
  res.render('api', {
    version: version.ver_1
  });
});
router.get('/docs', function (req, res) {
  res.render('apidocs', {
    version: version.ver_1,
    endpoints: endpointsListVersion1.sort()
  });
});


module.exports = router;
