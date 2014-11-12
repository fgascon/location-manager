var controler = require('./controler');
var config = require('./config');

var db = {};

function addUser(id, user){
	db[user.name] = new Device(id, user);
}

Object.keys(config.users).forEach(function(userId){
	addUser(userId, config.users[userId]);
});

function Device(id, user){
	this.id = id;
	this.user = user;
	this.currentLocation = 0;
}

Device.prototype.auth = function(pass){
	return this.user.pass === pass;
};

Device.prototype.enter = function(locationId){
	console.log('enter', locationId);
	if(locationId !== this.currentLocation){
		this.currentLocation = locationId;
		controler.move(this.id, this.currentLocation);
	}
};

Device.prototype.leave = function(locationId){
	console.log('leave', locationId);
	this.currentLocation = 0;
	controler.move(this.id, this.currentLocation);
};

Device.prototype.ping = function(locationId){
	console.log('ping', locationId);
	if(locationId !== this.currentLocation){
		this.currentLocation = locationId;
		controler.move(this.id, this.currentLocation);
	}
};

exports.get = function(user){
	var device = db[user.name];
	if(!device || !device.auth(user.pass)){
		throw new Error("User not found");
	}
	return device;
};