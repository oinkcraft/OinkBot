const config = require('../../config.json');

module.exports.giveRole = async (reaction, user) => {
        if(reaction.message.id === config.bot.messages.worldroles){
            // Check which emote was added and assign the corresponding role
            let role;
            // Not sure why, but triple affirmation (===) results in these comparisons not working.
            if(reaction.emoji == '⛏️'){
                role = reaction.message.guild.roles.find(role => role.id === config.bot.roles.towny);
            }
            else if (reaction.emoji == '⚔️'){
                role = reaction.message.guild.roles.find(role => role.id === config.bot.roles.factions);
            }
            else if (reaction.emoji == '🎨'){
                role = reaction.message.guild.roles.find(role => role.id === config.bot.roles.creative);
            }
            else if (reaction.emoji == '🏃'){
                role = reaction.message.guild.roles.find(role => role.id === config.bot.roles.parkour);
            }
            else if (reaction.emoji == '🎮'){
                role = reaction.message.guild.roles.find(role => role.id === config.bot.roles.minigames);
            } else {
                return;
            }
            user.send('> You have opted in to **' + role.name + '** world notifications!\n_To opt-out, simply remove your reaction._');
            await reaction.message.guild.fetchMember(user).then(activeMember => activeMember.addRole(role));
        }
    }

    module.exports.removeRole = async (reaction, user) => {
        if(reaction.message.id === config.bot.messages.worldroles){
            // Check which emote was added and assign the corresponding role
            let role;
            if(reaction.emoji == '⛏️'){
                role = reaction.message.guild.roles.find(role => role.id === config.bot.roles.towny);
            }
            else if (reaction.emoji == '⚔️'){
                role = reaction.message.guild.roles.find(role => role.id === config.bot.roles.factions);
            }
            else if (reaction.emoji == '🎨'){
                role = reaction.message.guild.roles.find(role => role.id === config.bot.roles.creative);
            }
            else if (reaction.emoji == '🏃'){
                role = reaction.message.guild.roles.find(role => role.id === config.bot.roles.parkour);
            }
            else if (reaction.emoji == '🎮'){
                role = reaction.message.guild.roles.find(role => role.id === config.bot.roles.minigames);
            } else {
                return;
            }
            user.send('> You have opted out of **' + role.name + '** world notifications!\n_To opt-in, simply re-add your reaction._');
            await reaction.message.guild.fetchMember(user).then(activeMember => activeMember.removeRole(role));
        }
    }