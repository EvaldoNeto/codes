(function() {
    'use strict';

    angular
	.module('login')
	.controller('loginController', loginController);

    loginController.$inject = ['$http', '$scope', 'oauthService'];
    
    function loginController($http, $scope, oauthService) {
	let vm = this;

	console.log("CONTROLLER");
	$scope.login = login;
	$scope.loginTwitter = loginTwitter;
//	$scope.loginGoogle = loginGoogle;
//	$scope.logOutGoogle = logOutGoogle;
	
	function login() {
	    let url = "https://www.facebook.com/v2.12/dialog/oauth?client_id=2115487848688367&redirect_uri=http://mopa.tk:8000/login.html&response_type=token%20granted_scopes%20code&scope=user_likes%20user_education_history%20user_posts%20user_tagged_places";
	    window.location = url;
	}
	
	function loginTwitter() {
	    console.log("Twiter");
	    oauthService.requestToken();	    	    
	}

/*	function loginGoogle() {
	    console.log("Google in");
	    mopaService.onSignIn();
	}

	function logOutGoogle() {
	    console.log("Google out");
	    mopaService.signOut();
	}*/
    }
})();
