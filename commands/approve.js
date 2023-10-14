const { SlashCommandBuilder } = require('discord.js');
const approvedUser = new Set();
const { approvUser } = require('../commands/approve.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('approve')
		.setDescription('Erlaubt einen User für 10min gespeerte Links zu posten.')
        .setDefaultMemberPermissions(0)
	    .setDMPermission(false)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Der User der Freigeschaltet werden soll.')
                .setRequired(true)),
	async execute(interaction, client) {
        approvUser(interaction.options.getUser("user").id);
		await interaction.reply({
			content: 'Erlaube ' + interaction.options.getUser("user").username + ' für 10min gespeerte Links zu posten.',
			ephemeral: true,
		});
	},
    async approvUser(user) {
        approvedUser.add(user)
        setTimeout(() => {
            approvedUser.delete(user)
        }, 10 * 60 * 1000);
    },
    async ifUserApproved(user) {
        return approvedUser.has(user)
    }
};