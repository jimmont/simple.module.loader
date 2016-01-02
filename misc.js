module.exports = function setCenter(options, lat, lng){
	options.center = {lat: lat, lng: lng};
	return options;
};
