const http = require('http');

module.exports = (port) => {
    http.createServer((request, response) => {
        response.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8'
        });
        response.write('Hört das Handy Musik oder die Musik Handy?\n');
        response.end();
    }).listen(port);
}