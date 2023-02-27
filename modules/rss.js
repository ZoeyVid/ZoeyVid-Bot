const { parse } = require('rss-to-json');

module.exports = async function (client) {
    (async () => {

        var rss = await parse('https://www.tagesschau.de/xml/rss2/');
    
        console.log(JSON.stringify(rss, null, 3));

        Object.keys(rss).forEach(element => {
            console.log(element)
            if(String(rss[element].link).includes("eilmeldung")) {
                console.log("!!!Eilmeldung gefunden: " + rss[element].link)
            }
        });
    
    })();
};