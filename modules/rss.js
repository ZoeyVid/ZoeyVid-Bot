const { extract } = require('@extractus/feed-extractor')

module.exports = async function () {
    console.log("RSS-Modul geladen")
        console.log("Weiter gehts")
        var rss = await extract('https://www.tagesschau.de/xml/rss2/')
        console.log("Hier?")
        console.log(rss)
        console.log(rss.link)
        console.log(rss.entries)
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries?retiredLocale=de
        rss.entries.forEach(element => {
            console.log(element)
            if(String(element.link).includes("eilmeldung")) {
                console.log("!!!Eilmeldung gefunden: " + element.link)
            }
        });
};