const { checkMessageForDomains } = require('../modules/domainCheck.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(client, config) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.guilds.fetch(config.guild).channels.fetch().then(channels => {
			channels.cache.forEach(channel => {
			channel.messages.fetch().then(messages => {
			  messages.forEach(message => cjheckMessageForDomains(message));
			});
		  });
		});
	},
};
