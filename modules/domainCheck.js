const { WebhookClient } = require('discord.js');
const dns = require('node:dns');
const { ifUserApproved } = require('./approvUser.js');

module.exports = {
	async checkMessageForDomains(message, config) {
		if (!message.guild || !message.member || message.member.permissions.has('ADMINISTRATOR')) {
			return;
		}

		const teamServerClient = new WebhookClient({ id: config.log_webhook_id, token: config.log_webhook_token });
		if (message.content.toLowerCase().match(/discord[^\s]*gg|discord[^\s]*invite/g) != null) {
			message.delete();
			teamServerClient.send({
				content: message.author.username + ' hat folgende Nachricht gesendet, welche automatisch gelöscht wurde "' + message.content + '"',
			});
			message.author.send('In deiner letzen Nachricht wurde ein Discord Invite automatisch endeckt. Folgedesen wurde deine Nachricht gelöscht und du für eine Stunde getimeoutet. Das weitere vorgehen endscheidet das Team.');
			message.member.timeout(60 * 60 * 1000, 'Automod - Timeout wegen Discord Invite - eine Stunde');
			return;
		}

		var urls = message.content
			.toLowerCase()
			.replace(/[.,]+/g, '.')
			.match(/([^\s:/@]+\.)+[^\s:/@]+/g);
		if (!urls) return;
		if (await ifUserApproved(message.author.id)) {
			message.react('✅');
			return;
		}

		for (var i = 0; i < urls.length; i++) {
			const options = {
				family: 0,
				hints: dns.ADDRCONFIG | dns.V4MAPPED,
			};
			console.log('Check URL ' + urls[i] + ' from ' + message.author.username);
			await dns.lookup(urls[i], options, (err, address) => {
				if (address == '0.0.0.0') {
					message.delete();
					teamServerClient.send({
						content: message.author.username + ' hat folgende Nachricht gesendet, welche automatisch gelöscht wurde `' + message.content + '`',
					});
					message.author.send('In deiner letzen Nachricht wurde eine im ZoeyVidNet gesperrte Domain automatisch endeckt. Folgedesen wurde deine Nachricht gelöscht und du für eine Stunde getimeoutet. Das weitere vorgehen endscheidet das Team. Deine abgesendete Nachricht: `' + message.content + '`');
					message.member.timeout(60 * 60 * 1000, 'Automod - Timeout wegen gespeerte Domain - eine Stunde');
				}
			});
		}
	},
};
