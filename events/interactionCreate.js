module.exports = {
  name: "interactionCreate",
  async execute(interaction, client, config) {
    console.log(
      `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
    );
    var regeln = await client.guilds.cache
      .get(config.guild)
      .channels.cache.get(BigInt(config.role_channel))
      .messages.fetch(BigInt(config.role_message));
    if (interaction.commandName === "ping")
      interaction.reply({
        content: "Pong! **" + client.ws.ping + "ms**",
        ephemeral: true,
      });
    if (interaction.commandName === "twitter")
      interaction.reply({
        content:
          String(config.twitter),
        ephemeral: true,
      });
    if (interaction.commandName === "modinstaller")
      interaction.reply({
        content:
          String(config.modinstaller),
        ephemeral: true,
      });
    if (interaction.commandName === "github")
      interaction.reply({
        content:
          String(config.github),
        ephemeral: true,
      });
    if (interaction.commandName === "regeln")
      interaction.reply({
        content: String(regeln),
        ephemeral: true,
      });
  },
};
