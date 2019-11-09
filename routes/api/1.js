const crypto = require('crypto');
var express = require('express');
const config = require('../../config.json');
var router = express.Router();
const client = require('../../bot/app').client;

const hash = x => crypto.createHash('sha256').update(x, 'utf8').digest('hex');

router.get('/', (req,res) => res.status(200).send({
    code: 200,
    message: 'You successfully connected to the api'
}));

router.post('/sendMessage', (req, res) => {
    const token = hash(req.query.token)
    console.log(req.query);
    if (req.query.token && req.query.channel && req.query.msg) { // Channel
        if (config.web.secret[token] > 1) {
            try {
                client.channels.get(req.query.channel).send(req.query.msg).then(() => res.status(200).send({
                    code: 200,
                    message: 'Success.'
                }));

            } catch (error) {
                res.status(404).send({
                    code: 404,
                    message: `Channel with id '${req.query.channel}' could not be found.`
                });
                return;
            }
        } else {
            console.log(error);
            res.status(403).send({
                code: 403,
                message: 'Forbidden.'
            })
        }
    } else if (req.query.token && req.query.user && req.query.msg) { // User

        if (config.web.secret[token] > 1) {
            try {
                client.users.get(req.query.user).createDM().then(chan => chan.send(req.query.msg).then(() => res.status(200).send({
                    code: 200,
                    message: 'Success.'
                })));

            } catch (error) {
                console.log(error);
                res.status(404).send({
                    code: 404,
                    message: `User with id '${req.query.user}' could not be found.`
                });
                return;
            }
        } else {
            res.status(403).send({
                code: 403,
                message: 'Forbidden.'
            })
        }
    } else { // Malformed URL
        res.status(400).send({
            code: 400,
            message: 'Malformed request body.'
        })
    }
})

module.exports = router;