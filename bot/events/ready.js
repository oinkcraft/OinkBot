module.exports = (client) => {
    console.log('Ready event has been fired.');    
	console.log(`Running on ${client.channels.cache.size} channel(s) on ${client.guilds.cache.size} server(s).`);
};