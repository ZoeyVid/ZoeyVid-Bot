const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('twitter')
		.setDescription('Die haben doch ein Vogel!'),
	async execute(interaction, client, config) {
		return interaction.reply({
            content:
              String(config.twitter),
            ephemeral: true,
          });
	},
};