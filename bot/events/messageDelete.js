const deleteCard = require('../actions/deleteTrelloCard')

module.exports = async (client, message) => {
    deleteCard.delete(client, message)
}