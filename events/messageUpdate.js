const { checkMessageForDomains } = require('../modules/domainCheck.js');

module.exports = {
	name: 'messageUpdate',
	async execute(messageOld, messageNew) {
        checkMessageForDomains(messageOld);
        checkMessageForDomains(messageNew);
	},
};
