const Discord = require('discord.js');
const fs = require('fs')

function getCommitHash() {
    return require('child_process').execSync('git rev-parse HEAD').toString().substring(0,7);
}

const hash = getCommitHash();




module.exports.execute = async (client, message, args) => {
    let infoEmbed = new Discord.RichEmbed()
        .setTitle('Information about me')
        .setFooter('Want to help developing me? https://github.com/oinkcraft/OinkBot')
        .addField('My current version', hash, true)
        .addField('I am currently in development', 'This means my functionality is limited, as of right now.')
    await message.channel.send(infoEmbed);
}

module.exports.config = {
    name: 'info',
    aliases: ['get info', 'tell me about you', 'tell me about yourself', 'who are you?',],
    description: 'Get to know me!',
}