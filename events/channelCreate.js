const {MessageEmbed, WebhookClient} = require('discord.js');

module.exports = {
    name: 'channelCreate',
    async execute(channel, client, database) {
        var webhookURL;
        let promise = database.getDocument('webhook', 'channel');

        promise.then(function (response) {
            webhookURL = response.url;
            const webhook = new WebhookClient({url: webhookURL});
        }, function (error) {
            console.log(error);
        });

        if (channel.guild.id !== "840285826020933662") return;
        var embed = new MessageEmbed()
            .setColor("#00ff08")
            .setTitle("Neuer Channel")
            .addField("Channel", "<#" + channel.id + ">", true)
            .addField("Name", channel.name, true)
            .addField("\u200B", "\u200B", false)
            .addField("ID", channel.id, true)
            .addField("Type", channel.type, true)
            .setTimestamp()
            .setFooter(channel.guild.name, channel.guild.iconURL());
        await webhook.send({
            username: client.user.username,
            avatarURL: client.user.avatarURL(),
            embeds: [embed],
        });
    },
};
