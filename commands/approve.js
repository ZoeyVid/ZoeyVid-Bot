const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('approve')
		.setDescription('Erlaubt einen User für 10min gespeerte Links zu posten.')
        .setDefaultMemberPermissions(0)
	    .setDMPermission(false)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Der User der Freigeschaltet werden soll.'))
                .setRequired(true),
	async execute(interaction, client) {
		await interaction.reply({
			content:   'Pong! **' + client.ws.ping + 'ms**',
			ephemeral: true,
		});
	},
};