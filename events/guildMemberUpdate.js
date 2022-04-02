const {MessageEmbed, WebhookClient} = require("discord.js");

module.exports = {
    name: "guildMemberUpdate",
    async execute(oldmember, newmember, client, database) {
        var webhookURL;
        let promise = database.getDocument('webhook', 'member');

        promise.then(function (response) {
            webhookURL = response.url;
            const webhook = new WebhookClient({url: webhookURL,});
        }, function (error) {
            console.log(error);
        });

        if (newmember.guild.id !== "840285826020933662") return;
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
            var member_role;
                let promise = database.getDocument('config', 'member_role');

                promise.then(function (response) {
                    member_role = response.attribute;
                    const userRole = newmember.guild.roles.cache.get(member_role);
            newmember.roles.add(userRole, "User hat die Regeln Akzeptiert!")
                }, function (error) {
                     console.log(error);
                });
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
        if (oldmember.avatar !== newmember.avatar) {
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
