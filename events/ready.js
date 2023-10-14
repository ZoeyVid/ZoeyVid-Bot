module.exports = {
	name: 'ready',
	once: true,
	execute(client, config) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
