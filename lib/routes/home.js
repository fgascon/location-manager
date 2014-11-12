var pkg = require('../../package.json');

module.exports = function(req, res){
	res.json({
		name: pkg.name,
		version: pkg.version
	});
};