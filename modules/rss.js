const { extract } = require('@extractus/feed-extractor')

module.exports = async function (client) {
    (async () => {

        var rss = await extract('https://www.tagesschau.de/xml/rss2/')
        console.log(rss)
        console.log(rss.link)
        Object.keys(rss.entries).forEach(element => {
            console.log(rss.entries[element] + "element")
            if(String(rss.entries[element].link).includes("eilmeldung")) {
                console.log("!!!Eilmeldung gefunden: " + rss.entries[element].link)
            }
        });
    
    })();
};