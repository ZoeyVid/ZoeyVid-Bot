const { WebhookClient } = require('discord.js');
const dns               = require('node:dns');
const teamServerClient  = new WebhookClient({ id: '1162036161842258041', token: 'EXZ1MzE29tI7KiPt-dTXUNkO54TPWIw7BDYHsvyf5z1JKbSgu_POjKPoYt7RdNPL8BXl' });

module.exports = {
	name: 'messageCreate',
	async execute(message, client, config,) {
		if (message.channelId === config.gh_feed) {
			message.crosspost();
		}
		
		if (message.author.bot) return;
		
		var urls = message.content.toLowerCase().match(/(([^\s:/@]+\.)+[^\s:/@]+)/g);
		if (!urls) return;
		for (var i = 0; i < urls.length; i++) {
			const options = {
				family: 0,
				hints:  dns.ADDRCONFIG | dns.V4MAPPED,
			};
			if (urls[i].match(/(([a-z0-9-]+\.)+[a-z0-9-]+)/g) == null) {
				message.delete();
				teamServerClient.send({
					content: message.author.username + ' hat folgende Nachricht gesendet, welche automatisch gelöscht wurde "' + message.content + '"', 
				});
				message.author.send('In deiner letzen Nachricht wurde eine Punycode Domain automatisch endeckt. Folgedesen wurde deine Nachricht gelöscht und du für zehn Minuten getimeoutet. Das weitere vorgehen endscheidet das Team.');
				message.guild.members.cache.find((member) => member.id === message.author.id).timeout(10 * 60 * 1000, 'Automod - Timeout wegen Punycode - zehn Minuten');
			} else {
				await dns.lookup(urls[i], options, (err, address) => {
					if (address == '0.0.0.0') {
						message.delete();
						teamServerClient.send({
							content: message.author.username + ' hat folgende Nachricht gesendet, welche automatisch gelöscht wurde "' + message.content + '"', 
						});
						message.author.send('In deiner letzen Nachricht wurde eine im ZoeyVidNet gesperrte Domain automatisch endeckt. Folgedesen wurde deine Nachricht gelöscht und du für eine Stunde getimeoutet. Das weitere vorgehen endscheidet das Team.');
						message.guild.members.cache.find((member) => member.id === message.author.id).timeout(10 * 60 * 1000, 'Automod - Timeout wegen Punycode - eine Stunde');
					}
				});
			}
		}
	},
};
