const config = require('../../config.json');
const deleteCard = require('../actions/deleteTrelloCard')

module.exports = async (client, message) => {
    deleteCard.delete(client, message);
    
    let response=new Discord.MessageEmbed()
    .setAuthor("Deleted Message")
    .addField("Author",`${message.author} \`${message.author.tag}\``)
    .addField("Channel",message.channel.toString())
    .addField("ID",message.id.toString())
    .addField("Content",message.content?message.content:"*None*")
    .setThumbnail(message.author.avatarURL())
    .setColor("#ff0000")
    .setTimestamp()

    if(message.embeds.length>0){
      response.addField("Embeds",`${message.embeds.length}; see below`);
    }

    client.channels.fetch(config.bot.auditlogchannel)
    .then(async(logChannel)=>{
      await logChannel.send(response);
      for(let i=0;i<message.embeds.length;i++){
        await logChannel.send(`Embed #${i+1} from message ${message.id}:`,{embed:message.embeds[i]});
      }
    });
}