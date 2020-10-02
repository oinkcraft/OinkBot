const config = require('../../config.json');
const Discord = require('discord.js');
const request = require('request');

module.exports.execute = async (client, message, args) => {
    request('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCNmheQMf9sK1Axv3NCEhbSA&maxResults=1&q=%5BOinkcraft%5D&type=video&key=[REPLACE WITH YOUTUBE API KEY]', function (error, response, data) {
        response.setEncoding('utf8')
        if (!error && response.statusCode == 200) {
            let obj = JSON.parse(data)
            await message.channel.send("Here is the latest video related to Oinkcraft: https://www.youtube.com/watch?v=" + obj.items[0].id.videoId)
        }
    });
}

module.exports.config = {
    name: 'latest video',
    aliases: ['latest', 'latest vid', 'latest video', 'recent', 'recent video', 'recent vid'],
    description: 'Get the latest video relating to Oinkcraft from Marks channel',
}
