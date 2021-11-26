const util = require('minecraft-server-util');

module.exports = (spieler, maxspieler, minutes) => {
    var interval = minutes * 60 * 1000;
    setInterval(function () {
        util.status('localhost') // port is default 25565
            .then((response) => {
                var channelplayer = client.channels.cache.get(spieler);
                channelplayer.setName("Spieler Online: " + response.onlinePlayers)
                var channelversion = client.channels.cache.get(maxspieler);
                channelversion.setName("Maximale Spieler: " + response.maxPlayers)
            })
            .catch((error) => {
                var channelplayer = client.channels.cache.get(spieler);
                channelplayer.setName("OFFLINE")
                var channelversion = client.channels.cache.get(maxspieler);
                channelversion.setName("OFFLINE")
                console.log(error)
            });
    }, interval);
}