const config = require('../../config.json');
const IssueLog = require('../actions/issueSubmission');
const SwearFilter = require('../actions/swearFilter')

module.exports = async (client, message) => {
    if (!message.guild || message.author.bot) return;
    console.log('Message received.');
    console.log('Message was not caught in an event.');


    if (/oinkbot,?\s.+/iu.test(message.content) && message.content.toLowerCase().startsWith("oinkbot")) {
        console.log('Command detected: ' + message.content);

        let shortCommand = message.content.slice(8).trim().split(' ')[0];
        let command = message.content.slice(8).trim();
        let aliasLength;
        let args;
        if (command) {
            let commandFile;
            client.commands.get(client.aliases.keyArray().forEach(alias => {
                aliasLength = alias.length;
                if (command == alias || command.includes(alias)) {
                    args = command.substr(aliasLength, command.length).trim().split(/\s+/g);
                    console.log(alias + '  ' + aliasLength);
                    commandFile = client.commands.get(shortCommand) || client.commands.get(client.aliases.get(alias))
                }
            }));
            if (commandFile) {
                args = args.filter(elm => elm !== "");
                await commandFile.execute(client, message, args);
                return;
            }
        }
    }

    if (await SwearFilter.checkEvent(client, message)) { return; }
    if (await IssueLog.checkEvent(client, message)) { return; }
}