const config = require('../../config.json');
const Trello = require('trello');
const Discord = require('discord.js');

const trello = new Trello(config.bot.integrations.trello.key, config.bot.integrations.trello.secret);

module.exports.checkEvent = async (client, message) => {
    if (message.channel.id === config.bot.channels.issues) {
        let content = message.cleanContent.replace(/\n/g, '');
        const expression = /Title of issue:\s+(.+)MC or Discord( related)?:\s+(.+)MC username:\s+(.+)World\/channel:\s+(.+)Description:\s(.+)/iu;
        let match;
        let response;
        if ((match = expression.exec(content)) === null) {
            response = new Discord.RichEmbed()
                .setAuthor('I did not understand that report!', null, null)
                .addField('Format was invalid', `You must use the following format when reporting issues:
                Title of Issue: 
                MC or Discord related: 
                MC Username: 
                World/Channel: 
                Description: `, true)
                .addField('Yours was', message.cleanContent, true)
                .setColor('#ff0000')
            message.member.createDM().then(channel => channel.send(response));
            await message.delete(500);
            return true;
        } else {
            trello.addCard(match[1], message.cleanContent, config.bot.integrations.trello.lists.issues).then(card => message.attachments.forEach(attachment => {
                trello.addAttachmentToCard(card.id, attachment.url);
            }));
            response = new Discord.RichEmbed()
                .setAuthor('Thank you!')
                .addField('Your issue was reported', `Thank you for reporting the issue. Please contact a staff member if this is an URGENT issue, such as players fighting or an extremely game-breaking bug.
                It is NOT URGENT if this is just something small being broken or a feature request. Thank you for your cooperation!`, true)
                .addField('Your suggestion was:', message.cleanContent, true)
                .setColor('#00ff00')
            message.member.createDM().then(channel => channel.send(response));
            return true;
        }
    }
    return false;
}