const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMessages
  ],
});
require("http");
const fs = require("fs");
const config = require("./config.json");

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) =>
      event.execute(...args, client, config)
    );
  } else {
    client.on(event.name, (...args) =>
      event.execute(...args, client, config)
    );
  }
}

require("./modules/status")(config.status_port, config.status_message);

client.login(config.token);