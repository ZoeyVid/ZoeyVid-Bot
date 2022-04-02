const {MessageEmbed, WebhookClient} = require("discord.js");

module.exports = {
    name: "guildMemberRemove",
    async execute(member, client) {
        var webhook;
        let promise = database.getDocument('webhook', 'member');

        promise.then(function (response) {
            webhook = response.url;
        }, function (error) {
            console.log(error);
        });

        if (member.guild.id !== "840285826020933662") return;
        const webhook = new WebhookClient({url: webhook,});
        var embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("User hat uns verlassen")
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
