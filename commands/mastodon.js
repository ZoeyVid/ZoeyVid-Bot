const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mastodon')
		.setDescription('Die haben doch einen Elephanten!'),
	async execute(interaction, client, config) {
		return interaction.reply({
            content:
              String(config.mastodon),
            ephemeral: true,
          });
	},
};
