const {MessageEmbed, WebhookClient} = require("discord.js");

module.exports = {
    name: "guildBanRemove",
    async execute(ban, client) {
        var webhookURL;
        let promise = database.getDocument('webhook', 'ban');

        promise.then(function (response) {
            webhookURL = response.url;
        }, function (error) {
            console.log(error);
        });

        if (ban.guild.id !== "840285826020933662") return;
        const webhook = new WebhookClient({url: webhookURL,});
        var embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("User entbannt")
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
