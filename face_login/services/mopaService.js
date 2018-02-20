(function() {
    'use strict';

    angular
	.module('login', [])
	.service('mopaService', mopaService);

    function mopaService() {

	let service = {
	    onSignIn : onSignIn,
	    signOut : signOut
	}
	
	return service;

	function onSignIn() {
	    console.log("CAPETA!");
	}

	function signOut() {
	    console.log("BELZEBU!");
	}
    }

})();
