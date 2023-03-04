const { extract } = require('@extractus/feed-extractor')

module.exports = async function (client) {
    (async () => {

        var rss = await extract('https://www.tagesschau.de/xml/rss2/')
        console.log(rss)
        console.log(rss.link)
        console.log(rss.entries)
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries?retiredLocale=de
        Array.from(rss.entries).forEach(element => {
            console.log(element)
            console.log(rss.entries[element] + "element")
            //if(String(rss.entries[element].link).includes("eilmeldung")) {
                //console.log("!!!Eilmeldung gefunden: " + rss.entries[element].link)
            //}
        });
    
    })();
};