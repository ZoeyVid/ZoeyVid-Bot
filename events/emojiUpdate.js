const {MessageEmbed, WebhookClient} = require("discord.js");

module.exports = {
    name: "emojiUpdate",
    async execute(oldemoji, newemoji, client) {
        var webhookURL;
        let promise = database.getDocument('webhook', 'emoji');

        promise.then(function (response) {
            webhookURL = response.url;
        }, function (error) {
            console.log(error);
        });

        if (newemoji.guild.id !== "840285826020933662") return;
        const webhook = new WebhookClient({url: webhookURL,});
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
        await webhook.send({
            username: client.user.username,
            avatarURL: client.user.avatarURL(),
            embeds: [embed],
        });
    },
};
