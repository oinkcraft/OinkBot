module.exports = (client) => {
    console.log('Ready event has been fired.');    
	console.log(`Running on ${client.channels.size} channels on ${client.guilds.size} servers.`);
};