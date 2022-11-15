const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('Modinstaller')
		.setDescription('Der betse Modinstaller auf diesen Planeten!'),
	async execute(interaction, client, config) {
		return interaction.reply({
          content:
            String(config.modinstaller),
          ephemeral: true,
        });
	},
};