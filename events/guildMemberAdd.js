const {MessageEmbed, WebhookClient} = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    async execute(member, client) {
        if (member.guild.id !== "840285826020933662") return;
        const webhook = new WebhookClient({url: "https://discord.com/api/webhooks/898537905465741332/WZzO_4eL1oT3sr-xA9fi7Oq5w17c5OTIGem710PhZm6F19idMP0g7toA1euFJrfUWVxM",});
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
