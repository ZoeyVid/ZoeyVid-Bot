const {MessageEmbed, WebhookClient} = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    async execute(member, client, database) {
        var webhookURL;
        let promise = database.getDocument('webhook', 'member');

        await promise.then(function (response) {
            webhookURL = response.url;
            const webhook = new WebhookClient({url: webhookURL,});
        }, function (error) {
            console.log(error);
        });

        if (member.guild.id !== "840285826020933662") return;
        var embed = new MessageEmbed()
            .setColor("#00ff08")
            .setTitle("User gejoint")
            .setThumbnail(member.user.avatarURL())
            .addField("User", "<@" + member.user.id + ">", true)
            .addField("Name", member.user.username + "#" + member.user.discriminator, true)
            .addField("ID", member.user.id, true)
            .setTimestamp()
            .setFooter(member.guild.name, member.guild.iconURL());
        await webhook.send({
            username: client.user.username,
            avatarURL: client.user.avatarURL(),
            embeds: [embed],
        });
    },
};
