(function() {
    'use strict';

    angular
	.module('login')
	.constant('consumerSecret', {
	    twitter : "qgjn8Cu9VeSzCLEVEFGfr9oU5Hy1eqVj7Rn0crck4qVDRLu0IU"
	})
	.constant('tokenSecret', {
	    twitter : "w32YFszYs0IEXb32VR6BhosRIMxTPedRoPW9fMyfDN3xa"
	})
	.constant('appUrl', {
	    twitter : "https://api.twitter.com/oauth/request_token"
	});    
})();
