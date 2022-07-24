const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_BANS,
  ],
});
require("http");
const fs = require("fs");
const { createClient } = require("redis");
const config = require("./config.json");
const db = createClient({
  url: config.redis_url
});
db.connect();

db.on('error', (err) => console.log('Redis Client Error', err));

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) =>
      event.execute(...args, client, db)
    );
  } else {
    client.on(event.name, (...args) =>
      event.execute(...args, client, db)
    );
  }
}

var port;
let promisePort = db.get("port");

promisePort.then(
  function (response) {
    port = response.attribute;
    var status_message;
    let promiseMessage = db.get("status_message");

    promiseMessage.then(
      function (response) {
        status_message = response.attribute;
        require("./modules/status")(port, status_message);
      },
      function (error) {
        console.log(error);
      }
    );
  },
  function (error) {
    console.log(error);
  }
);

var token;
let promiseToken = db.get("token");

promiseToken.then(
  function (response) {
    token = response.attribute;
    client.login(token);
  },
  function (error) {
    console.log(error);
  }
);
