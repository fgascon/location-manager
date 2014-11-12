var http = require('http');
var app = require('./app');
var config = require('./config');

var server = module.exports = http.createServer(app);

server.listen(config.http_port, function(){
	var address = server.address();
	console.log("HTTP server listening on %s:%d", address.address, address.port);
});
