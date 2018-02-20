(function() {
    'use strict';

    angular
	.module('login')
	.controller('googleController', googleController);

    googleController.$inject = ['$http', '$scope', 'mopaService'];
    
    function googleController($http, $scope, mopaService) {
	let vm = this;

	console.log("CONTROLLER");
	$scope.loginGoogle = loginGoogle;
//	$scope.logOutGoogle = logOutGoogle;
	

	function loginGoogle() {
	    console.log("Google in");
	    mopaService.onSignIn();
	}

/*	function logOutGoogle() {
	    console.log("Google out");
	    mopaService.signOut();
	}*/
    }
})();
