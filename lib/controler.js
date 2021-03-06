var request = require('request');
var config = require('./config');

var locations = config.locations;
var positions = config.positions;

function parseBody(encodedBody){
	if(!encodedBody){
		return null;
	}
	try{
		return JSON.parse(encodedBody);
	}catch(err){
		return null;
	}
}

function httpPost(action, body, callback){
	request({
		method: 'post',
		url: config.control_url + '/' + action,
		json: body
	}, function(err, resp, body){
		if(err){
			callback(err);
		}else{
			callback(null, parseBody(body));
		}
	});
}

exports.move = function(user, locationId){
	console.log('user %s is at location %s', user, locationId);
	
	var positionName = locations[locationId] || 'IN_TRANSIT';
	console.log('moving %s to %s', user, positionName);
	
	var positionId = positions[positionName];
	if(typeof positionId === 'undefined'){
		console.error("Invalid position '"+positionName+"'");
		return;
	}
	
	httpPost('move', {
		user: user,
		position: positionId
	}, function(err){
		if(err){
			console.error(err);
		}else{
			console.log("user %s moved to %s successfuly", user, positionId);
		}
	});
};
