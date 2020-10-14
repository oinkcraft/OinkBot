const config = require('../../config.json');
const Discord = require('discord.js');

module.exports.execute = async (client, message, args) => {
    let role = message.guild.roles.cache.get(config.bot.roles.event);

    if (message.member.roles.cache.has(config.bot.roles.event)) {
        await message.member.removeRole(role);
        await message.channel.send('> You have opted out of event notifications!\n_To opt-in, run the `get event role` command._');
    } else {
        await message.channel.send('You do not have the event role.')
    }
}

module.exports.config = {
    name: 'remove event role',
    aliases: ['remove event role', 'remove the event role from me',],
    description: 'Remove the Event role from yourself!',
}
