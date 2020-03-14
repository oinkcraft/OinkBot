

module.exports.execute = async (client, message, args) => {
    message.channel.send({
        embed: {
            color: 0x2ed32e,
            fields: [{
                name: "Ping, Pong!",
                value: "My Ping: " + Math.round(client.ping) + ' ms'
            }
            ],
        }
    });
}

module.exports.config = {
    name: 'ping',
    aliases: ['get ping', 'what is the latency?', 'are you here?'],
    description: 'Test your my connection!',
}