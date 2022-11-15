const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('github')
		.setDescription('Open Source 4 the Win!'),
	async execute(interaction, client, config) {
		return interaction.reply({
            content:
              String(config.github),
            ephemeral: true,
          });
	},
};