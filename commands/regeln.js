const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('regeln')
		.setDescription('Die Pflicht Lektüre dieses Servers!'),
	async execute(interaction, client, config) {
        var regeln = await client.guilds.cache
      .get(config.guild)
      .channels.cache.get(BigInt(config.role_channel))
      .messages.fetch(BigInt(config.role_message));
		return interaction.reply({
            content: String(regeln),
            ephemeral: true,
          });
	},
};