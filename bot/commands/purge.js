const config = require('../../config.json');

module.exports.execute = async (client, message, args) => {
    console.log(args);

    if (message.member.roles.cache.get(config.bot.roles.owner)) {
        if (args == null) {
            await message.channel.send('❌ Please provide an amount of messages to purge.').then(msg => msg.delete({timeout: 5000}))
        } else if (args[0] == 'all') {
            let x = await message.channel.messages.fetch();
            await message.channel.bulkDelete(message.channel.messages.cache, false).then(messages => console.log(`Bulk deleted ${messages.size} messages`)).catch(() => x.forEach(message => message.delete()))
        } else if (Number(args[0])) {
            await message.channel.messages.fetch(Number(args[0]));
            await message.channel.bulkDelete(Number(args[0]), false).then(messages => console.log(`Bulk deleted ${messages.size} messages`))
        } else {
            await message.delete();
            await message.channel.send('❌ Please provide a number or specify all.').then(message => message.delete({ timeout: 5000 }));
        }
    }
}

module.exports.config = {
    name: 'purge',
    aliases: ['purge channel', 'remove messages', 'purge'],
    description: 'Purge x amount of messages in a channel',
}