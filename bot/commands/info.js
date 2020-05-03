const Discord = require('discord.js');
const fs = require('fs')

function getCommitHash() {
    return require('child_process').execSync('git rev-parse HEAD').toString().substring(0,7);
}

function getCommitMessage() {
    return require('child_process').execSync('git log -1 --pretty=%B').toString();
}

const hash = getCommitHash();
let msg = getCommitMessage();




module.exports.execute = async (client, message, args) => {
    if (msg.length > 300) {
        msg = msg.substring(0, 300) + '...';
    }

    let infoEmbed = new Discord.MessageEmbed()
        .setTitle('Information about me')
        .setFooter('Want to help developing me? https://github.com/oinkcraft/OinkBot')
        .addField('My current version', hash, true)
        .addField('Latest commit message is', msg, true)
        .addField('I am currently in development', 'This means my functionality is limited, as of right now.')
    await message.channel.send(infoEmbed);
}

module.exports.config = {
    name: 'info',
    aliases: ['get info', 'tell me about you', 'tell me about yourself', 'who are you?',],
    description: 'Get to know me!',
}