(function() {
    'use strict';

    angular
	.module('faceLogin', [])
	.service('urlService', urlService);

    function urlService () {
	this.getUrlParam = function(param) {
	    let vars = [];
	    let hash;
            let hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');

            for (var i=0; i<hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }

            if (vars[param]) {
                return vars[param];
            }
            return undefined;
	}
    }
})();
