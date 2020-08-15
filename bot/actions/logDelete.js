const Discord = require('discord.js');
const config = require('../../config.json');

module.exports.delete = async (client, message) => {

    let response = new Discord.MessageEmbed()
        .setAuthor("Deleted Message")
        .addField("Author", `${message.author} \`${message.author.tag}\``)
        .addField("Channel", message.channel.toString())
        .addField("ID", message.id.toString())
        .addField("Content", message.content ? message.content : "*None*")
        .setThumbnail(message.author.avatarURL())
        .setColor("#ff0000")
        .setTimestamp()

    if (message.embeds.length > 0) {
        response.addField("Embeds", `${message.embeds.length}; see below`);
    }

    let channel = client.channels.cache.get(config.bot.channels.auditlogchannel)
    await channel.send(response);
    for (let i = 0; i < message.embeds.length; i++) {
        await channel.send(`Embed #${i + 1} from message ${message.id}:`, { embed: message.embeds[i] });
    }
}