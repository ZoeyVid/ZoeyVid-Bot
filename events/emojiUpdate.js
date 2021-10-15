const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = {
	name: 'emojiUpdate',
	async execute(oldemoji, newemoji, client) {
        if(newemoji.guild.id !== "840285826020933662") return;
        const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/898502035564036096/SvHbQ7zVMOD3atglNH6bOH2zhX-V4PLq6rVTs3G3SV_Qfnb_w7IWwxisbCz4rgq-zE2E' });
        var embed = new MessageEmbed()
            .setColor("#ffff00")
            .setTitle("Neuer Emoji Name")
            .addField("Aniemiert", String(newemoji.animated), true)
            .addField("ID", newemoji.id, true)
            .addField("\u200B", "\u200B", false)
            .addField("Alter Name", oldemoji.name, true)
            .addField("Neuer Name", newemoji.name, true)
            .setTimestamp()
            .setFooter(newemoji.guild.name, newemoji.guild.iconURL());
        webhook.send({
            username: client.user.username,
            avatarURL: client.user.avatarURL(),
            embeds: [embed],
        });
	},
};