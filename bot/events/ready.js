const Notifier = require('../actions/VideoNotifier.js')

module.exports = (client) => {
    console.log('Ready event has been fired.');    
	console.log(`Running on ${client.channels.cache.size} channel(s) on ${client.guilds.cache.size} server(s).`);

     // Start up video notifier
     console.log('Starting up video notifier...');
     Notifier.start(client);
};