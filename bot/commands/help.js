const Discord = require('discord.js');
const fs = require('fs');

module.exports.execute = async (client, message, args) => {
    await message.delete();
    let embed = new Discord.MessageEmbed();
    embed.setTitle('Help message!').setDescription('These are the available commands:');
    client.commands.forEach(command => {
        let count = command.config.aliases.length;
        embed.addField(command.config.name, `\`${client.prefix}${command.config.aliases[Math.floor(Math.random() * count)]}\`\n${command.config.description}`)

    });
    await message.author.send(embed);
    await message.channel.send('I have sent you a list of my commands in a DM!').then(msg => msg.delete({timeout: 5000}))

}

module.exports.config = {
    name: 'help',
    aliases: ['get help', 'tell me about your commands', 'tell me about commands', 'what are your commands?',],
    description: 'I will show you this message!',
}