const {MessageEmbed, WebhookClient} = require("discord.js");

module.exports = {
    name: "guildBanAdd",
    async execute(ban, client) {
        var webhook;
        let promise = database.getDocument('webhook', 'ban');

        promise.then(function (response) {
            webhook = response.url;
        }, function (error) {
            console.log(error);
        });

        if (ban.guild.id !== "840285826020933662") return;
        const webhook = new WebhookClient({url: webhook,});
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
