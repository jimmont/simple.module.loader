# simple.module.loader
simple module loading

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
