const { WebhookClient } = require('discord.js');
const dns               = require('node:dns');
const { ifUserApproved } = require('./approvUser.js');

module.exports = {
    async checkMessageForDomains(message, config) {
        const teamServerClient  = new WebhookClient({ id: config.log_webhook_id, token: config.log_webhook_token });
        var urls = message.content.toLowerCase().replace(/[.,]+/g,'.').match(/(([^\s:/@]+\.)+[^\s:/@]+)/g);
		if (!urls) return;
		if(await ifUserApproved(message.author.id)) {
			message.react('✅')
			return;
		}
		for (var i = 0; i < urls.length; i++) {
			const options = {
				family: 0,
				hints:  dns.ADDRCONFIG | dns.V4MAPPED,
			};
			console.log("Check URL " + urls[i] + " from " + message.author.username);
			if (urls[i].match(/(discord\.gg\/\S+|discord(?:app)?\.com\/invite\/\S+)/gi) != null) {
				if(message.member.permissions.has('ADMINISTRATOR')) return
				message.delete();
				teamServerClient.send({
					content: message.author.username + ' hat folgende Nachricht gesendet, welche automatisch gelöscht wurde "' + message.content + '"', 
				});
				message.author.send('In deiner letzen Nachricht wurde ein Discord Invite automatisch endeckt. Folgedesen wurde deine Nachricht gelöscht und du für eine Stunde getimeoutet. Das weitere vorgehen endscheidet das Team.');
				if (!message.member.permissions.has('ADMINISTRATOR')) message.member.timeout(60 * 60 * 1000, 'Automod - Timeout wegen Discord Invite - eine Stunde');
			}
			if (urls[i].match(/^([a-z0-9-]+\.)+[a-z0-9-]+$/g) == null) {
				message.delete();
				teamServerClient.send({
					content: message.author.username + ' hat folgende Nachricht gesendet, welche automatisch gelöscht wurde "' + message.content + '"', 
				});
				message.author.send('In deiner letzen Nachricht wurde eine Punycode Domain automatisch endeckt. Folgedesen wurde deine Nachricht gelöscht und du für zehn Minuten getimeoutet. Das weitere vorgehen endscheidet das Team.');
				if (!message.member.permissions.has('ADMINISTRATOR')) message.member.timeout(10 * 60 * 1000, 'Automod - Timeout wegen Punycode - zehn Minuten');
			} else {
				await dns.lookup(urls[i], options, (err, address) => {
					if (address == '0.0.0.0') {
						message.delete();
						teamServerClient.send({
							content: message.author.username + ' hat folgende Nachricht gesendet, welche automatisch gelöscht wurde "' + message.content + '"', 
						});
						message.author.send('In deiner letzen Nachricht wurde eine im ZoeyVidNet gesperrte Domain automatisch endeckt. Folgedesen wurde deine Nachricht gelöscht und du für eine Stunde getimeoutet. Das weitere vorgehen endscheidet das Team.');
						if (!message.member.permissions.has('ADMINISTRATOR')) message.member.timeout(60 * 60 * 1000, 'Automod - Timeout wegen gespeerte Domain - eine Stunde');
					}
				});
			}
		}
    }
}
