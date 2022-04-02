const {Client, Intents} = require("discord.js");
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_BANS,],});
require("http");
const fs = require("fs");
const sdk = require('node-appwrite');
const config = require("./config.json");
const dbclient = new sdk.Client();
let database = new sdk.Database(dbclient);
dbclient
    .setEndpoint(config.endpoint) // Your API Endpoint
    .setProject(config.projekt) // Your project ID
    .setKey(config.api_key) // Your secret API key
;

const eventFiles = fs.readdirSync("./events").filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client, database));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client, database));
    }
}

var port;
        let promisePort = database.getDocument('config', 'port');

        promisePort.then(function (response) {
            port = response.attribute;
        }, function (error) {
            console.log(error);
        });

var status_message;
    let promiseMessage = database.getDocument('config', 'status_message');

    promiseMessage.then(function (response) {
        status_message = response.attribute;
    }, function (error) {
        console.log(error);
    });

require("./modules/status")(port, status_message);

var token;
    let promiseToken = database.getDocument('config', 'port');

    promiseToken.then(function (response) {
        token = response.attribute;
        client.login(token);
    }, function (error) {
        console.log(error);
    });
