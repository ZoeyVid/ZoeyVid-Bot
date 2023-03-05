const { extract } = require('@extractus/feed-extractor')

module.exports = async function (client) {
        console.log("RSS-Modul geladen")
        console.log(client.channels.cache)
        var rss = await extract('https://www.tagesschau.de/xml/rss2/')
        rss.entries.forEach(element => {
            if(String(element.link).includes("eilmeldung")) {
                console.log("!!!Eilmeldung gefunden: " + element.link)
            }
        });
};