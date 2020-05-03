const config = require('../../config.json');
const Trello = require('trello');
const Discord = require('discord.js');
const http = require('http').createServer(trelloWebhookHandler);
const sock = require('socket.io')(http);
const callbackURL = `${config.web.callbackurl}:4556/trello`
http.listen(4556);

console.log(http.address())

function trelloWebhookHandler(req, res) {
    if (req.url === '/trello') {
        let body = [];
        req.on('data', chunk => body.push(chunk)).on('end', () => body = Buffer.concat(body).toJSON())
        res.send("Hello world")
        console.log(body);
    }
}

const trello = new Trello(config.bot.integrations.trello.key, config.bot.integrations.trello.secret);

// trello.addWebhook('Callback for removing cards', callbackURL)

module.exports.checkEvent = async (client, message) => {
    if (message.channel.id === config.bot.channels.issues) {
        let content = message.cleanContent.replace(/\n/g, '');
        const expression = /Submission Type:\s+(.+)Title of Submission:\s+(.+)Username:\s+(.+)MC or Discord:\s+(.+)Description:\s(.+)/iu;
        let match;
        let response;
        if ((match = expression.exec(content)) === null) {
            response = new Discord.MessageEmbed()
                .setAuthor('I did not understand that suggestion!', null, null)
                .addField('Format was invalid', `_Please use the following (but no bold)_
                **Submission Type:** ['Issue' or 'Suggestion']
                **Title of Submission:** [Something Broke!]
                **Username:** [Mobkinz78]
                **MC or Discord:** [Minecraft/Discord]
                **Description:** `, true)
                .addField('Yours was', message.cleanContent, true)
                .setColor('#ff0000')
            message.member.createDM().then(channel => channel.send(response));
            await message.delete({ timeout: 500 });
            return true;
        } else {
            // Format the message to fit properly on the card
            const fullMessage = String(message);

            // Get information required for label
            let labelId = "0000";
            const cardType = fullMessage.substring(fullMessage.indexOf("Submission Type:") + 16, fullMessage.indexOf("Submission Type:") + 20);
            if (cardType.toLowerCase().includes("iss")) {
                labelId = config.bot.integrations.trello.labels.issue;
            }
            else if (cardType.toLowerCase().includes("sug")) {
                labelId = config.bot.integrations.trello.labels.suggestion;
            } else {
                message.member.createDM().then(channel => channel.send(new Discord.MessageEmbed()
                    .setAuthor('Please make sure you ONLY "Issue" or "Suggestion" when submitting your report.', null, null)
                    .addField('Here\'s your message to try again:\n ', message.cleanContent)
                    .setColor('#ff0000')));
                await message.delete({ timeout: 500 });
                return true;
            }

            // Set the title of the card
            const cardTitle = match[2];

            // Add the card to the trello board
            const cardDescription = fullMessage.substring(fullMessage.indexOf('Username:'))
                .replace('Username:', '**Submitted by:**').replace('MC or Discord', '**Relevant Platform:**').replace('Description:', '\n**Description of Issue:**\n');
            trello.addCard(cardTitle, cardDescription, config.bot.integrations.trello.lists.issues).then(card => {
                trello.addLabelToCard(card.id, labelId);
            });
            response = new Discord.MessageEmbed()
                .setAuthor('Thank you!')
                .addField('Your issue was reported', 'Thank you for your submission! Please contact a staff member if this is an URGENT issue, such as players fighting or an extremely game-breaking bug.\nIt is NOT URGENT if this is just something small being broken or a feature request. Thank you for your cooperation!', false)
                .addField('Your suggestion was:', message.cleanContent)
                .setColor('#00ff00')
            message.member.createDM().then(channel => channel.send(response));
            return true;
        }
    }
    return false;
}