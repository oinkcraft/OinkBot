const config = require('../../config.json');
const Trello = require('trello');
const Discord = require('discord.js');

const trello = new Trello(config.bot.integrations.trello.key, config.bot.integrations.trello.secret);

module.exports.checkEvent = async (client, message) => {
    if (message.channel.id === config.bot.channels.suggestions) {
        let content = message.cleanContent.replace(/\n/g, '');
        const expression = /suggestion name:\s+(.+)MC username:\s+(.+)mc or discord:\s+(.+)Description:\s(.+)/iu;
        let match;
        let response
        if ((match = expression.exec(content)) === null) {
            response = new Discord.RichEmbed()
                .setAuthor('I did not understand that suggestion!', null, null)
                .addField('Format was invalid', `You must use the following format when reporting issues:
                Suggestion name: 
                MC Username: 
                MC or Discord: 
                Description: `, true)
                .addField('Yours was', message.cleanContent, true)
                .setColor('#ff0000')
            await message.member.createDM().then(channel => channel.send(response));
            await message.delete(500);
            return true;
        } else {
            trello.addCard(match[1], message.cleanContent, config.bot.integrations.trello.lists.suggestions).then(card => message.attachments.forEach(attachment => {
                trello.addAttachmentToCard(card.id, attachment.url);
            }));
            response = new Discord.RichEmbed()
                .setAuthor('Thank you!')
                .addField('Your suggestion was received', `Thank you for suggesting new features. Your suggestions are what keep us going as a community, and they are therefore greatly appreciated.
                Please note that we are not doing this full time, so your suggestion might take a while to be reviewed.`, true)
                .addField('Your suggestion was:', message.cleanContent, true)
                .setColor('#00ff00')
            await message.member.createDM().then(channel => channel.send(response));
            return true;
        }
    }
    return false;
}