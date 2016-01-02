# simple.module.loader
simple module loading

<p><a href="http://jimmont.github.io/simple.module.loader/">see the demo</a> <a href="https://github.com/jimmont/simple.module.loader/tree/gh-pages">or view the demo branch</a></p>

<p>use it like this:</p>
<pre>index.html:
module.require('./feature.js').then(function(res){
	console.log(res.message);

	return res;
});

./feature.js:
module.exports = module.require({
		lib: './things.js'
		,util: './misc.js'
}).then(function(res){
	res.lib.setup();

	res.message = 'all done';
	return res;
});
</pre>

<p>targets modern browsers chrome latest, mobile safari latest/recent, android latest?, crosswalk</p>
