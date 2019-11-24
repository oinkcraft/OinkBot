const crypto = require('crypto');
var express = require('express');
const config = require('../../config.json');
var router = express.Router();
const client = require('../../bot/app').client;

function getCommitHash() {
    return require('child_process').execSync('git rev-parse HEAD').toString();
}

function getCommitMessage() {
    return require('child_process').execSync('git log -1 --pretty=%B').toString();
}

const hash = x => crypto.createHash('sha256').update(x, 'utf8').digest('hex');

router.get('/', (req, res) => res.status(200).send({
    code: 200,
    message: 'You successfully connected to the api'
}));

router.post('/sendMessage', (req, res) => {
    const token = hash(req.query.token)
    console.log(req.query);
    if (req.query.token && req.query.channel && req.query.msg) { // Channel
        let msg = req.query.msg
        if (config.web.secret[token] < 3) msg = msg.replace(/@everyone/gi, 'Everyone');
        if (config.web.secret[token] > 1) {
            try {
                client.channels.get(req.query.channel).send(msg).then(() => res.status(200).send({
                    code: 200,
                    reponse: 'Success.'
                }));

            } catch (error) {
                res.status(404).send({
                    code: 404,
                    reponse: `Channel with id '${req.query.channel}' could not be found.`
                });
                return;
            }
        } else {
            res.status(401).send({
                code: 401,
                reponse: 'Unauthorised.'
            })
        }
    } else if (req.query.token && req.query.user && req.query.msg) { // User
        let msg = req.query.msg
        if (config.web.secret[token] < 3) msg = msg.replace(/@everyone/gi, 'Everyone');
        if (config.web.secret[token] > 1) {
            try {
                client.users.get(req.query.user).createDM().then(chan => chan.send(msg).then(() => res.status(200).send({
                    code: 200,
                    reponse: 'Success.'
                })));

            } catch (error) {
                console.log(error);
                res.status(404).send({
                    code: 404,
                    reponse: `User with id '${req.query.user}' could not be found.`
                });
                return;
            }
        } else {
            res.status(401).send({
                code: 401,
                reponse: 'Unauthorised.'
            })
        }
    } else { // Malformed URL
        res.status(400).send({
            code: 400,
            reponse: 'Malformed request body.'
        })
    }
});

router.get('/history', (req, res) => {
    const token = hash(req.query.token);
    if (req.query.token && req.query.channel) {
        if (config.web.secret[token] > 2) {
            try {
                let channel = client.guilds.get(config.bot.guild).channels.get(req.query.channel)

                if (channel.type === 'text') {
                    channel.fetchMessages({ limit: req.query.amount ? req.query.amount : 10 }).then(messages => {
                        let history = messages.map(message => new Object({
                            message: message.cleanContent,
                            author: message.author.id,
                            author_name: message.author.username,
                            created_at: message.createdAt,
                            edited: message.editedAt == null ? false : true,
                            url: message.url
                        }))
                        res.status(200).send({
                            code: 200,
                            response: history
                        })
                    });
                } else {
                    res.status(405).send({
                        code: 405,
                        reponse: 'Not a text channel.'
                    })
                }


            } catch (error) {
                res.status(400).send({
                    code: 400,
                    reponse: 'Malformed requrest body.'
                })
            }
        } else {
            res.status(401).send({
                code: 401,
                reponse: 'Unauthorised.'
            })
        }
    }
})

router.get('/version', (req, res) => {
    res.status(200).send({
        code: 200,
        reponse: {
            short_commit: getCommitHash().substring(0, 7),
            commit: getCommitHash(),
            commit_message: getCommitMessage(),
            api_version: "1"
        }
    })
});

module.exports = router;