(function() {
    'use strict';

    angular
	.module('login')
	.constant('consumerSecret', {
	    twitter : "qgjn8Cu9VeSzCLEVEFGfr9oU5Hy1eqVj7Rn0crck4qVDRLu0IU",
	    google : "200556172120-5bd9laecrf87ctkdqvnge5jpbebslhc5.apps.googleusercontent.com"
	})
	.constant('tokenSecret', {
	    twitter : "w32YFszYs0IEXb32VR6BhosRIMxTPedRoPW9fMyfDN3xa",
	    google : "UUh93KcARnyOWKW0r_WqiV_J"
	})
	.constant('appUrl', {
	    twitter : "https://api.twitter.com/oauth/request_token"
	});    
})();
