const Discord = require('discord.js');

module.exports.execute = async (client, message, args) => {
    let infoEmbed = new Discord.RichEmbed()
        .setTitle('I am open source!')
        .addField('Want to help developing me?', 'https://github.com/oinkcraft/OinkBot', true)
        .addField('I am currently in development', 'This means my functionality is limited, as of right now... But you can change that!',true);
    message.channel.send(infoEmbed);
}

module.exports.config = {
    name: 'GitHub',
    aliases: ['get github', 'are you opensource?', 'show me your code', 'what is your code?', 'how were you made?', 'where do you live?', 'can i help?', 'can i develop you?'],
    description: 'See my wiring!',
}