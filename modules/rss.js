const { extract } = require('@extractus/feed-extractor')

module.exports = async function (client) {
    (async () => {

        var rss = await extract('https://www.tagesschau.de/xml/rss2/')
        console.log(rss)
        console.log(rss.link)
        Object.keys(rss.entries).forEach(element => {
            console.log(element + "element")
            if(String(element.link).includes("eilmeldung")) {
                console.log("!!!Eilmeldung gefunden: " + element.link)
            }
        });
    
    })();
};