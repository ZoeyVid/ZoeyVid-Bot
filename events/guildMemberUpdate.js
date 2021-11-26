const {MessageEmbed, WebhookClient} = require("discord.js");
const {member_role} = require("../../config.json");

module.exports = {
    name: "guildMemberUpdate",
    async execute(oldmember, newmember, client) {
        if (newmember.guild.id !== "840285826020933662") return;
        const webhook = new WebhookClient({url: "https://discord.com/api/webhooks/898537905465741332/WZzO_4eL1oT3sr-xA9fi7Oq5w17c5OTIGem710PhZm6F19idMP0g7toA1euFJrfUWVxM",});
        if (oldmember.nickname !== newmember.nickname) {
            var embed = new MessageEmbed()
                .setColor("#ffff00")
                .setTitle("User hat ein neuen Nickname")
                .setThumbnail(newmember.user.avatarURL())
                .addField("User", "<@" + newmember.user.id + ">", true)
                .addField("Name", newmember.user.username + "#" + newmember.user.discriminator, true)
                .addField("ID", newmember.user.id, true)
                .addField("\u200B", "\u200B", false)
                .addField("Alter Nickname", String(oldmember.nickname), true)
                .addField("Neuer Nickname", String(newmember.nickname), true)
                .setTimestamp()
                .setFooter(newmember.guild.name, newmember.guild.iconURL());
            await webhook.send({
                username: client.user.username,
                avatarURL: client.user.avatarURL(),
                embeds: [embed],
            });
        }
        if (oldmember.deleted !== newmember.deleted) {
            var embed = new MessageEmbed()
                .setColor("#ff0000")
                .setTitle("User wurde gelöscht")
                .setThumbnail(newmember.user.avatarURL())
                .addField("User", "<@" + newmember.user.id + ">", true)
                .addField("Name", newmember.user.username + "#" + newmember.user.discriminator, true)
                .addField("ID", newmember.user.id, true)
                .setTimestamp()
                .setFooter(newmember.guild.name, newmember.guild.iconURL());
            await webhook.send({
                username: client.user.username,
                avatarURL: client.user.avatarURL(),
                embeds: [embed],
            });
        }
        if (oldmember.pending !== newmember.pending) {
            if(member_role) {
                const userRole = newmember.guild.roles.cache.get(member_role);
                newmember.roles.add(userRole, "User hat die Regeln Akzeptiert!")
            } else {console.log("Error: Member Rollen ID fehlt!"), process.exit()};
            var embed = new MessageEmbed()
                .setColor("#ffff00")
                .setTitle("User hat die Regeln akzeptiert")
                .setThumbnail(newmember.user.avatarURL())
                .addField("User", "<@" + newmember.user.id + ">", true)
                .addField("Name", newmember.user.username + "#" + newmember.user.discriminator, true)
                .addField("ID", newmember.user.id, true)
                .setTimestamp()
                .setFooter(newmember.guild.name, newmember.guild.iconURL());
            await webhook.send({
                username: client.user.username,
                avatarURL: client.user.avatarURL(),
                embeds: [embed],
            });
        }
        if (oldmember.avatar !== newmember.nickname) {
            if (!newmember.avatar) {
                var embed = new MessageEmbed()
                    .setColor("#ffff00")
                    .setTitle("User hat sein Server Avatar gelöscht")
                    .setThumbnail(newmember.user.avatarURL())
                    .addField("User", "<@" + newmember.user.id + ">", true)
                    .addField("Name", newmember.user.username + "#" + newmember.user.discriminator, true)
                    .addField("ID", newmember.user.id, true)
                    .setTimestamp()
                    .setFooter(newmember.guild.name, newmember.guild.iconURL());
            } else {
                var embed = new MessageEmbed()
                    .setColor("#ffff00")
                    .setTitle("User hat ein Server Avatar")
                    .setThumbnail(newmember.avatar)
                    .addField("User", "<@" + newmember.user.id + ">", true)
                    .addField("Name", newmember.user.username + "#" + newmember.user.discriminator, true)
                    .addField("ID", newmember.user.id, true)
                    .setTimestamp()
                    .setFooter(newmember.guild.name, newmember.guild.iconURL());
            }
            await webhook.send({
                username: client.user.username,
                avatarURL: client.user.avatarURL(),
                embeds: [embed],
            });
        }
    },
};
