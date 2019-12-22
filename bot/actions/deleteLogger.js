const config = require('../../config.json');
const Discord = require('discord.js');

client.on("messageDelete", async msg => {
    let logs = await msg.guild.fetchAuditLogs({type: 72});
    let entry = logs.entries.first();
  
    let embed = new Discord.RichEmbed()
      .setTitle("**REMOVED MESSAGE**")
      .setColor("#0398fc")
      .addField("Sent By", msg.author.tag, true)
      .addField("Sent In Channel", msg.channel, true)
      .addField("Deleted Message", msg.content)
      .addField("Deleted By", entry.executor)
      .setFooter(`Message ID: ${msg.id} | Sender ID: ${msg.author.id}`);
  
    let channel = msg.guild.channels.find(x => x.name === 'log-channel');
    channel.send({embed});
  });
