const changeRoleAction = require('../actions/changeWorldRole');

module.exports = async(client, reaction, user) => {

    // Give user the role
    changeRoleAction.giveRole(reaction, user);

};