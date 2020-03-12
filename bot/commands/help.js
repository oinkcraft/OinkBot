const Discord = require('discord.js');
const fs = require('fs');

module.exports.execute = async (client, message, args) => {

    let embed = new Discord.RichEmbed();
    embed.setTitle('Help message!').setDescription('These are the available commands:');
    client.commands.forEach(command => {
        let count = command.config.aliases.length;
        embed.addField(command.config.name, `\`${client.prefix}${command.config.aliases[Math.floor(Math.random() * count)]}\`\n${command.config.description}`)

    });
    return await message.author.send(embed);

}

module.exports.config = {
    name: 'help',
    aliases: ['get help', 'tell me about your commands', 'tell me about commands', 'what are your commands?',],
    description: 'I will show you this message!',
}