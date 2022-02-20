module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
        var regeln = await client.guilds.cache.get("840285826020933662").channels.cache.get("840286217320530003").messages.fetch("870395962097537084");
        if (interaction.commandName === "ping")
            interaction.reply({
                content: "Pong! **" + client.ws.ping + "ms**",
                ephemeral: true,
            });
        if (interaction.commandName === "twitter")
            interaction.reply({
                content: "Sanoj: https://twitter.com/2020sanoj \n musik_handy: Nope \n DavidCraft: https://twitter.com/DavidCraftDev \n SanCraftDev (David + Sanoj): https://twitter.com/SanCraftDev",
                ephemeral: true,
            });
        if (interaction.commandName === "modinstaller")
            interaction.reply({
                content: "Zu Sanojs Mod-Installer: https://github.com/2020Sanoj/Mod-Installer",
                ephemeral: true,
            });
        if (interaction.commandName === "github")
            interaction.reply({
                content: "Sanoj: https://github.com/2020sanoj \n musik_handy: Nope \n DavidCraft: https://github.com/davidcraftdev \n SanCraftDev (David + Sanoj): https://github.com/SanCraftDev",
                ephemeral: true,
            });
        if (interaction.commandName === "regeln")
            interaction.reply({
                content: String(regeln),
                ephemeral: true,
            });
    },
};
