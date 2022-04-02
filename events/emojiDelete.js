const {MessageEmbed, WebhookClient} = require("discord.js");

module.exports = {
    name: "emojiDelete",
    async execute(emoji, client) {
        var webhookURL;
        let promise = database.getDocument('webhook', 'emoji');

        promise.then(function (response) {
            webhookURL = response.url;
        }, function (error) {
            console.log(error);
        });

        if (emoji.guild.id !== "840285826020933662") return;
        const webhook = new WebhookClient({url: webhookURL,});
        var embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Emoji Gelöscht")
            .addField("Name", emoji.name, true)
            .addField("Aniemiert", String(emoji.animated), true)
            .addField("ID", emoji.id, true)
            .setTimestamp()
            .setFooter(emoji.guild.name, emoji.guild.iconURL());
        await webhook.send({
            username: client.user.username,
            avatarURL: client.user.avatarURL(),
            embeds: [embed],
        });
    },
};
