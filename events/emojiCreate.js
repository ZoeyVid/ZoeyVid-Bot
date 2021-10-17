const {MessageEmbed, WebhookClient} = require("discord.js");

module.exports = {
    name: "emojiCreate",
    async execute(emoji, client) {
        if (emoji.guild.id !== "840285826020933662") return;
        const webhook = new WebhookClient({url: "https://discord.com/api/webhooks/898502035564036096/SvHbQ7zVMOD3atglNH6bOH2zhX-V4PLq6rVTs3G3SV_Qfnb_w7IWwxisbCz4rgq-zE2E",});
        var embed = new MessageEmbed()
            .setColor("#00ff08")
            .setTitle("Neuer Emoji")
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
