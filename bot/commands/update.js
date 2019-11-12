const config = require('../../config.json');

function getUpdate() {
    require('child_process').execSync('git pull');
    process.exit();
}

module.exports.execute = async (client, message, args) => {
    if (message.member.roles.get(config.bot.roles.owner)) {
        await message.channel.send('🔁 Updating. Please wait...')
        getUpdate();
    }
}

module.exports.config = {
    name: 'update',
    aliases: ['get update', 'will you update?', 'please update'],
    description: 'Update me!',
}