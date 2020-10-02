const config = require('../../config.json');
const Discord = require('discord.js');

module.exports.execute = async (client, message, args) => {
    if (message.member.roles.cache.has(config.bot.roles.staff)) {
        if (args.length == 0 || !message.mentions.first) { await message.channel.send('Sorry but you need to mention someone to unmute them!') } else {
            let role = message.guild.roles.cache.get(config.bot.roles.muted)
            let user = message.mentions.members.first()
            user.roles.add(role)
            await message.channel.send(`Muted user: ${user}`)
        }
    } else {
        await message.channel.send('You do not have permissions for that.')
    }
}

module.exports.config = {
    name: 'unmute user',
    aliases: ['unmute', 'unmute user', 'user unmute'],
    description: 'When someone has finished their mute sentence you can unmute them with this command!',
}
