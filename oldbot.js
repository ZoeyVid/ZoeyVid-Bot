const { Client, Intents } = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_MESSAGES]});
const util = require('minecraft-server-util');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    updateServerStats()
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
    console.log(oldMember)
    if(oldMember.pending && !newMember.pending) {
        var UserRole = newMember.guild.roles.cache.get("840659355186757632");
        newMember.roles.add(UserRole, "User hat die Regeln Akzeptiert!")
    }
})

var minutes = 1, the_interval = minutes * 60 * 1000;
setInterval(function() {
    updateServerStats()
}, the_interval);

client.on("messageCreate", message => {
    if(message.content.toLowerCase() == ">slash") {
        createSlash()
        message.reply("Update Slash!")
    } else if(message.content.toLowerCase() == ">role") {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('roles')
                    .setPlaceholder('Keine Rolle ausgewählt')
                    .setMinValues(0)
                    .setMaxValues(2)
                    .addOptions([
                        {
                            label: 'Select me',
                            description: 'This is a description',
                            value: 'first_option',
                        },
                        {
                            label: 'You can select me too',
                            description: 'This is also a description',
                            value: 'second_option',
                        },
                    ]),
            );
        message.reply({ content: 'Select!', components: [row] })

    } else if(message.content.toLowerCase() == ">wartungen off") {
        createSlash()
        var maintance = message.guild.roles.cache.get("864835117922123776");
        message.guild.members.cache.forEach(member => member.roles.remove(maintance))
    } else if(message.content.toLowerCase() == ">wartungen on") {
        client.guilds.cache.get('840285826020933662')?.commands.set([])
        var maintance = message.guild.roles.cache.get("864835117922123776");
        message.guild.members.cache.forEach(member => member.roles.add(maintance))
    }
})

function updateServerStats() {
    util.status('localhost') // port is default 25565
        .then((response) => {
            var channelplayer = client.channels.cache.get("864201226567286794");
            channelplayer.setName("Spieler Online: " + response.onlinePlayers)
            var channelversion = client.channels.cache.get("864201405391437844");
            channelversion.setName("Maximale Spieler: " + response.maxPlayers)
        })
        .catch((error) => {
            var channelplayer = client.channels.cache.get("864201226567286794");
            channelplayer.setName("OFFLINE")
            var channelversion = client.channels.cache.get("864201405391437844");
            channelversion.setName("OFFLINE")
            console.log(error)
        });
}

function createSlash() {
    client.guilds.cache.get('840285826020933662')?.commands.set([])
    client.application?.commands.set([])
    const dataping = {
        name: 'ping',
        description: "Ein Ping Command um den die Response Time zu bekommen!",
    };
    const datatwitter = {
        name: 'twitter',
        description: "Die haben doch ein Vogel!",
    };
    const datagithub = {
        name: 'github',
        description: "Open Source 4 the Win",
    };
    const datamodinstaller = {
        name: 'modinstaller',
        description: "Ein Link zum Besten Modinstaller hier auf dem Server!",
    };
    const dataregeln = {
        name: 'regeln',
        description: "Zeigt die Regeln",
    };
    client.guilds.cache.get('840285826020933662')?.commands.create(dataping);
    client.guilds.cache.get('840285826020933662')?.commands.create(datatwitter);
    client.guilds.cache.get('840285826020933662')?.commands.create(datagithub);
    client.guilds.cache.get('840285826020933662')?.commands.create(dataregeln);
}

client.on('interactionCreate', async interaction => {
    var regeln = await client.guilds.cache.get("840285826020933662").channels.cache.get("840286217320530003").messages.fetch("870395962097537084")
    console.log(regeln);
    if (interaction.commandName === 'ping') await interaction.reply({
        content: "Pong! **" + client.ws.ping + "ms**",
        ephemeral: true
    });
    if (interaction.commandName === 'twitter') await interaction.reply({
        content: "Sanoj: https://twitter.com/2020sanoj \n musik_handy: Nope \n DavidCraft: https://twitter.com/david__craft",
        ephemeral: true
    });
    if (interaction.commandName === 'modinstaller') await interaction.reply({
        content: "Zu Sanojs Mod-Installer: https://github.com/2020Sanoj/Mod-Installer",
        ephemeral: true
    });
    if (interaction.commandName === 'github') await interaction.reply({
        content: "Sanoj: https://github.com/2020sanoj \n musik_handy: Nope \n DavidCraft: https://github.com/davidcraftdev",
        ephemeral: true
    });
    if (interaction.commandName === 'regeln') await interaction.reply({
        content: String(regeln),
        ephemeral: true
    });
});

client.login('');

const http = require('http');
var port = 2021;

http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8'
    });
    response.write('Hört das Handy Musik oder die Musik Handy?\n');
    response.end();
}).listen(port);
