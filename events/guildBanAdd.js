const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = {
	name: 'guildBanAdd',
	async execute(ban, client) {
        if(ban.guild.id !== "840285826020933662") return;
        const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/898523083571359794/PDpm8_xwtaXeufc99BfIpxqbS_B_rQGLsPY1JQHZmC49nd6gYB2AA8BnpgzbqHy7yamA' });
        var embed = new MessageEmbed()
            .setColor("#00ff08")
            .setTitle("User gebannt")
            .addField("User", "<@" + ban.user.id + ">", true)
            .addField("ID", ban.user.id, true)
            .setTimestamp()
            .setFooter(ban.guild.name, ban.guild.iconURL());
        webhook.send({
            username: client.user.username,
            avatarURL: client.user.avatarURL(),
            embeds: [embed],
        });
	},
};