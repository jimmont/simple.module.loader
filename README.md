<h1>simple.module.loader</h1>
<p>
Async, simple, flexible module loading that targets modern mobile browsers (Chrome/mobile Safari/Android latest?/crosswalk).
<br><a href="http://jimmont.github.io/simple.module.loader/"><b>See the demo</b></a> <a href="https://github.com/jimmont/simple.module.loader/tree/gh-pages">or view the demo branch</a>.
</p>

<p>use it like this:</p>
<pre>index.html:
module.require('./feature.js').then(function(message){
	console.log(message);

	return message;
});

./feature.js:
module.exports = module.require({
		lib: './things.js'
		,util: './misc.js'
}).then(function(res){
	res.lib.setup();

	return 'all done';
});
</pre>
