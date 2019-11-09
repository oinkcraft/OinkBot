var express = require('express');
var router = express.Router();
var apiVer1 = require('./api/1')
const client = require('../bot/app').client;

let version = '1.0.0'
const endpointsList = [
  {
    name: 'Send message',
    type: 'post',
    endpoint: '/1/sendMessage?token{token}&channel={channelID}&msg={message}',
    required: [
      {
        id: 'token',
        description: 'The developer token, you have been given.'
      },
      {
        id: 'channelID',
        description: 'The ID of the channel you wish to send a message to'
      },
      {
        id: 'message',
        description: 'The message you wish to send'
      }],
    optional: [],
    explanation: `Allows you to send messages as the bot.`
  }
]
router.use('/1', apiVer1)
router.get('/', function (req, res, next) {
  res.render('api', {
    version: version
  });
});
router.get('/docs', function (req, res, next) {
  res.render('apidocs', {
    version: version,
    endpoints: endpointsList.sort((a, b) => a.name > b.name)
  });
});


module.exports = router;
