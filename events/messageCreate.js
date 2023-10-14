const { checkMessageForDomains } = require('../modules/domainCheck.js');

module.exports = {
	name: 'messageCreate',
	async execute(message, client, config) {
		if (message.channelId === config.gh_feed) {
			message.crosspost();
		}
    checkMessageForDomains(message, config);
	},
};
