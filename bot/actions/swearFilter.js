const Discord = require('discord.js');
const swears = require('../util/swears.json');

module.exports.checkEvent = async (client, message) => {
    await message.cleanContent.toLowerCase().split(/\s+/).forEach(word => {
        if (word.toLowerCase() == 'constructor')
            return;
        if (swears['simple'][word]) {
            console.log(word);
            message.delete({timeout: 0});
            message.reply('Swearing is not allowed 👀').then(msg => msg.delete({timeout: 5000}));
            const response = new Discord.MessageEmbed().setAuthor('Please refrain from swearing')
                .addField('Your message was:', message.cleanContent, true)
                .addField('You were caught on:', word)
                .addField('It was categorised as:', swears['simple'][word].join(' and '))
                .setColor('#ff0000')
                .setFooter('Your message was also logged to the staff team.')
            message.member.createDM().then(channel => channel.send(response));
            return true;
        } else {
            for (var key in swears['regex']) {
                if (word.match(new RegExp(key))) {
                    console.log(word);
                    message.delete({timeout: 0});
                    message.reply('Swearing is not allowed 👀').then(msg => msg.delete({timeout: 5000}));
                    const response = new Discord.MessageEmbed().setAuthor('Please refrain from swearing')
                        .addField('Your message was:', message.cleanContent, true)
                        .addField('You were caught on:', word)
                        .addField('It was categorised as:', swears['regex'][key].join(' and '))
                        .setColor('#ff0000')
                        .setFooter('Your message was also logged to the staff team.')
                    message.member.createDM().then(channel => channel.send(response));
                    return true;
                }
            }
        }
    });
    return false;
}
