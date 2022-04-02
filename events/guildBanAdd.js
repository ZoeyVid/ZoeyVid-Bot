const {MessageEmbed, WebhookClient} = require("discord.js");

module.exports = {
    name: "guildBanAdd",
    async execute(ban, client) {
        var webhookURL;
        let promise = database.getDocument('webhook', 'ban');

        promise.then(function (response) {
            webhookURL = response.url;
            const webhook = new WebhookClient({url: webhookURL,});
        }, function (error) {
            console.log(error);
        });

        if (ban.guild.id !== "840285826020933662") return;
        var embed = new MessageEmbed()
            .setColor("#00ff08")
            .setTitle("User gebannt")
            .addField("User", "<@" + ban.user.id + ">", true)
            .addField("ID", ban.user.id, true)
            .setTimestamp()
            .setFooter(ban.guild.name, ban.guild.iconURL());
        await webhook.send({
            username: client.user.username,
            avatarURL: client.user.avatarURL(),
            embeds: [embed],
        });
    },
};
