const changeRoleAction = require('../actions/changeWorldRole');

module.exports = async(client, reaction, user) => {

    console.log('Reaction event caught!');
    // Give user the role
    changeRoleAction.giveRole(reaction, user);

};