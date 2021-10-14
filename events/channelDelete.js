const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = {
	name: 'channelDelete',
	async execute(channel, client) {
        if(channel.guild.id !== "840285826020933662") return;
        const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/897161883616944128/6ohO1FYFwS12Ztoxs0U-3hWULJWFWVLVx30Ip7pjyBIXDMftGd8wFURUNcK_-Cxi2lJD' });
        var embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Channel gelöscht")
            .addField("Name", channel.name, true)
            .addField("ID", channel.id, true)
            .addField("Type", channel.type, true)
            .setTimestamp()
            .setFooter(channel.guild.name, channel.guild.iconURL());
        webhook.send({
            username: client.user.username,
            avatarURL: client.user.avatarURL(),
            embeds: [embed],
        });
	},
};