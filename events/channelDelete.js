const {MessageEmbed, WebhookClient} = require('discord.js');

module.exports = {
    name: 'channelDelete',
    async execute(channel, client) {
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
            .setColor("#ff0000")
            .setTitle("Channel gelöscht")
            .addField("Name", channel.name, true)
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
