const config = require('../../config.json');
const Discord = require('discord.js');

module.exports.execute = async (client, message, args) => {
    let role = message.guild.roles.cache.get(config.bot.roles.event);

    if (!message.member.roles.cache.has(config.bot.roles.event)) {
        await message.member.addRole(role);
        await message.channel.send('> You have opted into event notifications!\n_To opt-out, run the `remove event role` command._');
    } else {
        await message.channel.send('You already have the event role.');
    }
}

module.exports.config = {
    name: 'get event role',
    aliases: ['get event role', 'assign me the event role',],
    description: 'Add the Event role to yourself!',
}
