const changeRoleAction = require('../actions/changeWorldRole');

module.exports = async (client, reaction, user) => {

    // Remove role from user
    changeRoleAction.removeRole(reaction, user);

};