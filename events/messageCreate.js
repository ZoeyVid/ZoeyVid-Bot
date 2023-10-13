const scam = require("../scam.json")
const { WebhookClient } = require("discord.js");
const dns = require('node:dns');
const punycode = require('punycode/');
const teamServerClient = new WebhookClient({ id: "1162036161842258041", token: "EXZ1MzE29tI7KiPt-dTXUNkO54TPWIw7BDYHsvyf5z1JKbSgu_POjKPoYt7RdNPL8BXl" });

module.exports = {
  name: "messageCreate",
  async execute(message, client, config,) {
    if (message.author.bot) return
    if (message.channelId === config.gh_feed) {
      message.crosspost();
    }
    for(var i = 0; i < scam.length; i++) {
      if(message.content.toLowerCase().includes(scam[i].toLowerCase())) {
        message.delete();
        teamServerClient.send({
          content: message.author.username + ' hat folgende Nachricht gesendet die Automatisch gelöscht wurde "' + message.content + '"', 
        });
        message.author.send("In deiner letzen Nachricht wurde ein Scam Link automatisch endeckt. Folgedesen wurde deine Nachricht gelöscht und du für eine Stunde getimeoutet. Das weitere vorgehen endscheidet das Team.")
        message.guild.members.cache.find(member => member.id === message.author.id).timeout(60 * 60 * 1000, 'Automod - Timeout wegen Scam - 1. Stunde')
      }
    }
    var pcm = punycode.toASCII(message.content.toLowerCase())
    var urls = pcm.match(/(([a-z0-9-]+\.)+[a-z0-9-]+)/g)
    if(!urls) return;
    for(var i = 0; i < urls.length; i++) {
      const options = {
        family: 0,
        hints: dns.ADDRCONFIG | dns.V4MAPPED,
      };
      console.log(urls[i])
      await dns.lookup(urls[i], options, (err, addresses) => {
        message.reply("Die IP von " + urls[i] + " ist " + addresses)
        console.log(addresses)
      });
    }
  },
};
