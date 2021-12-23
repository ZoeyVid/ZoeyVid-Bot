const {MessageEmbed, WebhookClient} = require('discord.js');
const {spieler_channel, spielermax_channel} = require('../../config.json');
module.exports = {
    name: 'channelUpdate',
    async execute(oldchannel, newchannel, client) {
        if (oldchannel.guild.id !== "840285826020933662") return;
        const webhook = new WebhookClient({url: 'https://discord.com/api/webhooks/897161883616944128/6ohO1FYFwS12Ztoxs0U-3hWULJWFWVLVx30Ip7pjyBIXDMftGd8wFURUNcK_-Cxi2lJD'});
        if (oldchannel.name !== newchannel.name) {
            if(newchannel.id === spieler_channel) return;
            if(newchannel.id === spielermax_channel) return;
            var embed = new MessageEmbed()
                .setColor("#ffff00")
                .setTitle("Neuer Channelname")
                .addField("Channel", "<#" + newchannel.id + ">", true)
                .addField("ID", newchannel.id, true)
                .addField("Type", newchannel.type, true)
                .addField("\u200B", "\u200B", false)
                .addField("Alter Name", oldchannel.name, true)
                .addField("Neuer Name", newchannel.name, true)
                .setTimestamp()
                .setFooter(oldchannel.guild.name, oldchannel.guild.iconURL());
            await webhook.send({
                username: client.user.username,
                avatarURL: client.user.avatarURL(),
                embeds: [embed],
            });
        }
        if (oldchannel.topic !== newchannel.topic) {
            var embed = new MessageEmbed()
                .setColor("#ffff00")
                .setTitle("Neues Channel Thema")
                .addField("Channel", "<#" + newchannel.id + ">", true)
                .addField("ID", newchannel.id, true)
                .addField("Type", newchannel.type, true)
                .addField("\u200B", "\u200B", false)
                .addField("Alter Name", String(oldchannel.topic), true)
                .addField("Neues Channelthema", String(newchannel.topic), true)
                .setTimestamp()
                .setFooter(oldchannel.guild.name, oldchannel.guild.iconURL());
            await webhook.send({
                username: client.user.username,
                avatarURL: client.user.avatarURL(),
                embeds: [embed],
            });
        }
        if (oldchannel.type !== newchannel.type) {
            var embed = new MessageEmbed()
                .setColor("#ffff00")
                .setTitle("Neuer Channel Type")
                .addField("Channel", "<#" + newchannel.id + ">", true)
                .addField("ID", newchannel.id, true)
                .addField("Name", newchannel.name, true)
                .addField("\u200B", "\u200B", false)
                .addField("Alter Type", oldchannel.type, true)
                .addField("Neuer Type", newchannel.type, true)
                .setTimestamp()
                .setFooter(oldchannel.guild.name, oldchannel.guild.iconURL());
            await webhook.send({
                username: client.user.username,
                avatarURL: client.user.avatarURL(),
                embeds: [embed],
            });
        }
        if (oldchannel.nsfw !== newchannel.nsfw) {
            var embed = new MessageEmbed()
                .setColor("#ffff00")
                .setTitle("Neuer Channel NSFW Status")
                .addField("Channel", "<#" + newchannel.id + ">", true)
                .addField("ID", newchannel.id, true)
                .addField("Tyoe", newchannel.type, true)
                .addField("\u200B", "\u200B", false)
                .addField("Alter Status", oldchannel.nsfw.toString(), true)
                .addField("Neuer Status", newchannel.nsfw.toString(), true)
                .setTimestamp()
                .setFooter(oldchannel.guild.name, oldchannel.guild.iconURL());
            await webhook.send({
                username: client.user.username,
                avatarURL: client.user.avatarURL(),
                embeds: [embed],
            });
        }
        if (oldchannel.bitrate !== newchannel.bitrate) {
            var embed = new MessageEmbed()
                .setColor("#ffff00")
                .setTitle("Neue Channel Bitrate")
                .addField("Channel", "<#" + newchannel.id + ">", true)
                .addField("ID", newchannel.id, true)
                .addField("Tyoe", newchannel.type, true)
                .addField("\u200B", "\u200B", false)
                .addField("Alte Bitrate", oldchannel.bitrate, true)
                .addField("Neue Bitrate", newchannel.bitrate, true)
                .setTimestamp()
                .setFooter(oldchannel.guild.name, oldchannel.guild.iconURL());
            await webhook.send({
                username: client.user.username,
                avatarURL: client.user.avatarURL(),
                embeds: [embed],
            });
        }
        if (oldchannel.rateLimitPerUser !== newchannel.rateLimitPerUser) {

            var embed = new MessageEmbed()
                .setColor("#ffff00")
                .setTitle("Neuer Channel Slowmode")
                .addField("Channel", "<#" + newchannel.id + ">", true)
                .addField("ID", newchannel.id, true)
                .addField("Tyoe", newchannel.type, true)
                .addField("\u200B", "\u200B", false)
                .addField("Alter Cooldown", String(oldchannel.rateLimitPerUser), true)
                .addField("Neuer Cooldown", String(newchannel.rateLimitPerUser), true)
                .setTimestamp()
                .setFooter(oldchannel.guild.name, oldchannel.guild.iconURL());
            await webhook.send({
                username: client.user.username,
                avatarURL: client.user.avatarURL(),
                embeds: [embed],
            });
        }
        if (oldchannel.rtcRegion !== newchannel.rtcRegion) {
            var embed = new MessageEmbed()
                .setColor("#ffff00")
                .setTitle("Neue Channel RTC Region")
                .addField("Channel", "<#" + newchannel.id + ">", true)
                .addField("ID", newchannel.id, true)
                .addField("Tyoe", newchannel.type, true)
                .addField("\u200B", "\u200B", false)
                .addField("Alte RTC Region", String(oldchannel.rtcRegion), true)
                .addField("Neue RTC Region", String(newchannel.rtcRegion), true)
                .setTimestamp()
                .setFooter(oldchannel.guild.name, oldchannel.guild.iconURL());
            await webhook.send({
                username: client.user.username,
                avatarURL: client.user.avatarURL(),
                embeds: [embed],
            });
        }
        if (oldchannel.userLimit !== newchannel.userLimit) {
            var embed = new MessageEmbed()
                .setColor("#ffff00")
                .setTitle("Neues Channel Userlimit")
                .addField("Channel", "<#" + newchannel.id + ">", true)
                .addField("ID", newchannel.id, true)
                .addField("Tyoe", newchannel.type, true)
                .addField("\u200B", "\u200B", false)
                .addField("Altes Userlimit", String(oldchannel.userLimit), true)
                .addField("Neues Userlimit", String(newchannel.userLimit), true)
                .setTimestamp()
                .setFooter(oldchannel.guild.name, oldchannel.guild.iconURL());
            await webhook.send({
                username: client.user.username,
                avatarURL: client.user.avatarURL(),
                embeds: [embed],
            });
        }
    },
};
