const { checkMessageForDomains } = require('../modules/domainCheck.js');

module.exports = {
	name: 'messageUpdate',
	async execute(message) {
        checkMessageForDomains(message);
	},
};
