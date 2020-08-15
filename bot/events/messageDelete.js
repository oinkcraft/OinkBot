const deleteCard = require('../actions/deleteTrelloCard');
const logDelete = require('../actions/logDelete');

module.exports = async (client, message) => {
    deleteCard.delete(client, message);
    logDelete.delete(client, message);
    
}