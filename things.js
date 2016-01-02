module.exports = {
	config: {
			zoom: 13
			,zoomControl: false
			,attributionControl: true
	}
	,setup: function(center, lat, lng){
		return center(this.config, lat, lng);
	}
};
