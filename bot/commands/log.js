const config = require('../../config.json');

module.exports.execute = async (client, message, args) => {
    if (message.member.roles.cache.has(config.bot.roles.staff)) {
        if (args.length == 0) {
            await message.channel.send('STDOUT');
            await message.channel.send(require('child_process').execSync('cat ~/.pm2/logs/app-out.log | tail -n 50').toString(), { code: 'log' });
            await message.channel.send('STDERR');
            await message.channel.send(require('child_process').execSync('cat ~/.pm2/logs/app-error.log | tail -n 30').toString(), { code: 'log' });
        }
        else if (args.length == 1) {
            if (!isNaN(args[0])) {
                await message.channel.send('STDOUT');
                await message.channel.send(require('child_process').execSync('cat ~/.pm2/logs/app-out.log | tail  -n ' + args[0]).toString(), { code: 'log' });
                await message.channel.send('STDERR');
                await message.channel.send(require('child_process').execSync('cat ~/.pm2/logs/app-error.log | tail -n  -n ' + args[0]).toString(), { code: 'log' });
            } else {
                await message.channel.send(args[0] + 'was not a number. Please provide a number for this command.');
            }
        } else {
            await message.channel.send('This command only takes one argument. Try again.');
        }
    } else {
        await message.channel.send('You do not have permissions for that.');
    }

}

module.exports.config = {
    name: 'get log',
    aliases: ['fetch log', 'show log', 'get status', 'log please', 'get log'],
    description: 'Has something happened recently? Need me to show you the log?',
}
