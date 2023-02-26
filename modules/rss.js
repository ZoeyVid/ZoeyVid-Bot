const { parse } = require('rss-to-json');

module.exports = async function () {
    (async () => {

        var rss = await parse('https://www.tagesschau.de/xml/rss2/');
    
        console.log(JSON.stringify(rss, null, 3));
    
    })();
};