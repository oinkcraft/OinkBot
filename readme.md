# DEPRECATED OinkBot

## Requirements

In order to run the bot, you must do the following:

- Install NodeJS.
- Run `npm i` inside the repository.
- Change the configuration to match your needs.
- Run `node app` inside the repository

## Configuration of the bot

An example of the configuration can be found [here](./config.json.example).

```json
{
    "bot": {
        "token": "TOKEN",
        "prefix": "oinkbot ",
        "channels": {
            "rules": "0000",
            "issues": "0000",
            "suggestions": "0000",
            "botchat": "0000",
            "logchannel": "0000",
            "auditlogchannel": "0000",
            "announcementchannel": "0000"
        },
        "roles": {
            "staff": "0000",
            "admin": "0000",
            "owner": "0000",
            "donator": "0000",
            "event": "0000"
        },
        "integrations": {
            "enable": {
                "mysql": true,
                "trello": true
            },
            "mysql": {
                "host": "localhost",
                "user": "username",
                "password": "shhh",
                "database": "ob_database"
            },
            "trello": {
                "key": "0000",
                "secret": "shhh",
                "boards": {
                    "issues": "0000",
                    "suggestions": "0000"
                }
            }
        }
    },
    "web": {
        "secret": { // These are all the tokens that are given out to developers etc
            "placeHolderToken": level, // A permission level going from 1 - 4
        }
    }
}
```

The level is a number in the range 1 to 4, and gives the following permissions:

1. Basic read permissions for the API.
2. Sending and delting messages.
3. Kick, mute and nickname.
4. Administrator permission.

## Contributing

We are open to contributions.
Make sure to create a feature request before forking.
That way we can make sure you are not wasting your time, working on something we're already making.
