
var locationMap = {};

var Positions = {
	IN_TRANSIT: 0,
	HOME: 1,
	FRIEND: 2,
	FAMILY: 3,
	WORK: 4,
	SCHOOL: 5
};

function addLocation(locationId, positionId){
	locationMap[locationId] = positionId;
}

addLocation('1', Positions.FAMILY);
addLocation('2', Positions.HOME);
addLocation('3', Positions.WORK);

function getPositionLabel(position){
	for(var key in Positions){
		if(Positions[key] === position){
			return key;
		}
	}
	return "";
}

exports.move = function(user, location){
	console.log('move %s to %s', user, location);
	var position = locationMap[location] || Positions.IN_TRANSIT;
	console.log('user %s positioned to %s', user, getPositionLabel(position));
};