var basicAuth = require('basic-auth');
var devices = require('../devices');

module.exports = function(req, res){
	var user = basicAuth(req);
	if(!user){
		res.status(401, "Authentification required");
	}
	var body = req.body;
	['device', 'id', 'latitude', 'longitude', 'timestamp', 'trigger']
		.forEach(function(param){
			if(typeof body[param] === 'undefined'){
				throw new Error("Parameter '"+param+"' missing");
			}
		});
	
	var device = devices.get(user);
	
	switch(body.trigger){
	case 'test':
		device.ping(body.id);
		break;
		
	case 'enter':
		device.enter(body.id);
		break;
		
	case 'exit':
		device.leave(body.id);
		break;
	}
	res.end('OK');
};