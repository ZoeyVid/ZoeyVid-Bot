const { extract } = require('@extractus/feed-extractor')

module.exports = async function () {
    console.log("RSS-Modul geladen")
        var rss = await extract('https://www.tagesschau.de/xml/rss2/')
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries?retiredLocale=de
        rss.entries.forEach(element => {
            console.log(element.link)
            if(String(element.link).includes("eilmeldung")) {
                console.log("!!!Eilmeldung gefunden: " + element.link)
            }
        });
};