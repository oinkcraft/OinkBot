const config = require('../../config.json');

module.exports = async (client, before, after) => {

  if(before.content==after.content)return;

  let response=new Discord.MessageEmbed()
  .setAuthor("Edited Message")
  .addField("Author",`${after.author} \`${after.author.tag}\``)
  .addField("Channel",after.channel.toString())
  .addField("ID",after.id.toString())
  .addField("Before",before.content?before.content:"*None*")
  .addField("After",after.content?after.content:"*None*")
  .setThumbnail(after.author.avatarURL())
  .setColor("#ff0000")
  .setTimestamp()

  client.channels.fetch(config.bot.auditlogchannel)
  .then(async(logChannel)=>{
    await logChannel.send(response);
  });
 
}