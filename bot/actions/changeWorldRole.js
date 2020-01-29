const config = require('../../config.json');

module.exports.giveRole = async (reaction, user) => {
        if(reaction.message.id === config.bot.messages.worldroles){
            // Check which emote was added and assign the corresponding role
            let role;
            console.log('1');
            if(reaction.name === 'pick'){
                role = reaction.message.guild.roles.find(role => role.id === config.bot.roles.towny);
            }
            else if (reaction.name === 'crossed_swords'){
                role = reaction.message.guild.roles.find(role => role.id === config.bot.roles.factions);
            }
            else if (reaction.name === 'art'){
                role = reaction.message.guild.roles.find(role => role.id === config.bot.roles.creative);
            }
            else if (reaction.name === 'person_running'){
                role = reaction.message.guild.roles.find(role => role.id === config.bot.roles.parkour);
            }
            else if (reaction.name === 'video_game'){
                role = reaction.message.guild.roles.find(role => role.id === config.bot.roles.minigames);
                console.log('2');
            } else {
                console.log('3 - ' + reaction.name);
                return;
            }
            user.send('You have opted in to world notifications and given the ' + role + 'rank!');
            await reaction.message.guild.fetchMember(user).then(activeMember => activeMember.addRole(role));
        }
    }

    module.exports.removeRole = async (reaction, user) => {
        if(reaction.message.id === config.bot.messages.worldroles){
            // Check which emote was added and assign the corresponding role
            let role;
            if(reaction.name === 'pick'){
                role = reaction.message.guild.roles.find(role => role.id === config.bot.roles.towny);
            }
            else if (reaction.name === 'crossed_swords'){
                role = reaction.message.guild.roles.find(role => role.id === config.bot.roles.factions);
            }
            else if (reaction.name === 'art'){
                role = reaction.message.guild.roles.find(role => role.id === config.bot.roles.creative);
            }
            else if (reaction.name === 'person_running'){
                role = reaction.message.guild.roles.find(role => role.id === config.bot.roles.parkour);
            }
            else if (reaction.name === 'video_game'){
                role = reaction.message.guild.roles.find(role => role.id === config.bot.roles.minigames);
            } else {
                return;
            }
            user.send('You have opted out of world notifications and the ' + role + 'rank has been removed!');
            await reaction.message.guild.fetchMember(user).then(activeMember => activeMember.removeRole(role));
        }
    }