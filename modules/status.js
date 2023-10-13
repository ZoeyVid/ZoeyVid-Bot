const http = require('http');

module.exports = (port, status_message) => {
	http
		.createServer((request, response) => {
			response.writeHead(200, {
				'Content-Type': 'text/plain; charset=utf-8',
			});
			response.write(status_message);
			response.end();
		})
		.listen(port);
};
