const {MessageEmbed, WebhookClient} = require('discord.js');

module.exports = {
    name: 'channelDelete',
    async execute(channel, client) {
        var webhook;
        let promise = database.getDocument('webhook', 'channel');

        promise.then(function (response) {
            webhook = response.url;
        }, function (error) {
            console.log(error);
        });

        if (channel.guild.id !== "840285826020933662") return;
        const webhook = new WebhookClient({url: webhook});
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
