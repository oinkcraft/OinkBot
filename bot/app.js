const fs = require('fs');
const Discord = require('discord.js');
const config = require('../config.json');
const MySQL = require('mysql');
const Trello = require('trello');

// Construct the required clients etc.
const client = new Discord.Client();
const sqlAccess = MySQL.createConnection(config.bot.integrations.mysql);
const trello = new Trello(config.bot.integrations.trello.key, config.bot.integrations.trello.secret);


module.exports.sqlAccess = sqlAccess;
module.exports.client = client;
module.exports.startup = () => {

    // Register commands and events.
    fs.readdir('./bot/events/', (err, files) => {
        if (err) return console.error(err);
        const fileList = files.filter((f) => f.split('.').pop() === 'js');
        if (fileList.length <= 0) {
            return console.log('No errors have been loaded!');
        }
        fileList.forEach((file) => {
            const event = require(`./events/${file}`);
            const eventName = file.split('.')[0];
            client.on(eventName, event.bind(null, client));
        });
    });

    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();
    client.prefix = config.bot.prefix;

    fs.readdir('./bot/commands/', (err, files) => {
        if (err) console.error(err);
        const fileList = files
            .filter((type) => !type.includes('.test.'))
            .filter((fileName) => fileName.split('.').pop() === 'js');
        if (fileList.length <= 0) {
            return console.log('No commands have been loaded!');
        }
        fileList.forEach((file) => {
            const command = require(`./commands/${file}`);
            client.commands.set(command.config.name, command);
            command.config.aliases.forEach((alias) => {
                client.aliases.set(alias, command.config.name);
            });
            console.log(`Registered ${command.config.name} as a command.`);

        });
    });

    // Check connections and log in.
    sqlAccess.connect(err => {
        if (err) {
            console.log('Failed to connect to database.');
            console.log(err.code);
            console.log(err.errno);
            console.log(err.sqlMessage);

        } else {
            console.log('Connected to database.');
            sqlAccess.end();
        }
    });
    trello.addCard("Test", "Test", config.bot.integrations.trello.lists.issues).then(card => trello.deleteCard(card.id)).then(console.log("Connected to Trello.")).catch(rzn => console.log(rzn));
    client.login(config.bot.token)
        .then(() => console.log("Logged in!"))
        .catch(() => console.log("Failed to log in."));
}