var fs = require('fs');
var path = require('path');

if(!process.argv[2]){
	console.error("Config path missing");
	process.exit(1);
}

var configPath = path.resolve(process.argv[2]);

function readConfigSync(){
	var configData = fs.readFileSync(configPath, 'utf8');
	var config = JSON.parse(configData);
	if(!config){
		throw new Error("Invalid config file");
	}
	return config;
}

module.exports = readConfigSync();
