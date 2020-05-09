const config = require('../../config.json');
const Trello = require('trello-node-api');
const trello = new Trello(config.bot.integrations.trello.key, config.bot.integrations.trello.secret);

module.exports.delete = (client, message) => {
    if (message.channel.id == config.bot.channels.issues) {
        if (message.embeds.length > 0) {
            let cardID = message.embeds[0].footer.text;
            console.log(cardID)
            trello.card.del(cardID).catch((err) => {
                console.log(err)
                message.channel.send('❌ I was unable to delete that card on Trello. Please do it manually').then(msg => msg.delete({timeout: 5000}))
            })
        }
    }
}