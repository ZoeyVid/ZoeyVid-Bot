const { checkMessageForDomains } = require('../modules/domainCheck.js');

module.exports = {
	name: 'messageUpdate',
	async execute(message) {
        console.log("Message Update")
        console.log(message)
        checkMessageForDomains(message);
	},
};
