const { checkMessageForDomains } = require('../modules/domainCheck.js');

module.exports = {
	name: 'messageUpdate',
	async execute(message) {
        console.log("Message Update")
        checkMessageForDomains(message);
	},
};
