(function(){
	var map, config;
	module.exports = module.require({
			L: '//cdn.leafletjs.com/leaflet-1.0.0-b1/leaflet.js'
			,options: './things.js'
			,setCenter: './misc.js'
	}).then(function(res){
		config = res.options.setup(res.setCenter, 37.75, -122.4);
		config.layers = [L.tileLayer('//{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="//openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			,reuseTiles: true
			,minZoom: 1
			,maxZoom: 18
		})];
		map = L.map(document.querySelector('section'), config);

		console.log('map setup');

		res.map = map;
		return res;
	});
})();
