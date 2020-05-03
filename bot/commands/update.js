const config = require('../../config.json');

function getUpdate() {
    require('child_process').execSync('git pull');
    process.exit();
}

module.exports.execute = async (client, message, args) => {
    if (message.member.roles.get(config.bot.roles.owner)) {
        await message.channel.send('🔁 Updating. Please wait...')
        getUpdate();
    } else {
        await message.channel.send('❌ Unfortunately you do not have the right role to perform that command');
    }
}

module.exports.config = {
    name: 'update',
    aliases: ['get update', 'will you update?', 'please update'],
    description: 'Update me!',
}