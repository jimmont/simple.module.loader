var module = {
/* simple module loading
https://github.com/jimmont/simple.module.loader
*/
	request: function(item){
	// NOTE redefine as-desired to fit project security/requirements
		return http({
			url: item, method: 'script'
			// because the promise is async it misses exports, load/error events are more reliable/synchronous
			,onload: function thenSetup(res){ return module.setup(item); }
			,onerror: function thenTeardown(res){ return module.teardown(res, item); }
		});
	}
	,list: {}
	,_exports: []
	,purge: function(){
		var exports = this._exports, len = exports.length;
		this._exports = [];
		// try to make it look similar to what was assigned in the most common case of a single export
		return len === 1 ? exports[0]:exports;
	}
	,setup: function(url){
	/* for module.list.url reset the promise to everything in module.exports and return it:
		NOTE this assumes parsing of the script with all assignments to module.exports happens immediately before the promise is resolved
		any delayed assignments will confuse us */
		return this.list[url] = Promise.resolve( this.purge() );
	}
	,teardown: function(err, item){
		// TODO does this address all the scenarios adquately (eg both js errors and http errors)?
		var exports = this.purge();
		// TODO is this correct?
		Promise.reject(this.list[item]);
		this.list[item] = false;
		return err;
	}
	,register: function(item){
		// register item and return promise for it
		return this.list[item] || (this.list[item] = this.request(item));
	}
	,require: function(item){
		/* pass in single, array or object of urls
			require('./a')
			require(['./a', './b']);
			require({a: './a', b:'./b'});
		 */
		if(typeof item === 'object'){
			// map modules onto _original_ object then return that original object
			return Promise.all(Object.keys(item).map(function allRequired(key){
					// key like './path/to.js'
					var it = item[key];
					it = item[key] = module.require(it);
					return it;
			})).then(function allSetup(res){
				Object.keys(item).forEach(function(key, i){ item[key] = res[i]; });
				return Promise.resolve(item);
			}, function allFail(res){
				console.warn('--TODO-- allFail>',res, item);
				return res;
			});
		}else{
			return module.register(item).then(
				function thenOk(res){ return module.list[item]; }
				,function thenFail(res){ return module.list[item]; }
			);
		};
	}
};
Object.defineProperties(module, {
exports: {
	enumerable: true
	,configurable: false
	,set: function(feature){
		this._exports.push(feature);
	}
}});
