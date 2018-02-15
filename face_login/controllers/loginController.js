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
	
	function login() {
	    let url = "https://www.facebook.com/v2.12/dialog/oauth?client_id=2115487848688367&redirect_uri=http://mopa.tk:8000/login.html&response_type=token%20granted_scopes%20code&scope=user_likes%20user_education_history%20user_posts%20user_tagged_places";
	    window.location = url;
	}
	
	function loginTwitter() {
	    console.log("Twiter");
	    console.log(oauthService.timeStamp());
	    console.log(oauthService.nonce(11));

	    let params = {status : "Hello Ladies + Gentlemen, a signed OAuth request!",
			  include_entities : true,
			  oauth_consumer_key : "xvz1evFS4wEEPTGEFPHBog",
			  oauth_nonce : "kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg",
			  oauth_signature_method : "HMAC-SHA1",
			  oauth_timestamp : 1318622958,
			  oauth_token : "370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb",
			  oauth_version : "1.0"};

	    let url = "https://api.twitter.com/1.1/statuses/update.json";
	    console.log(oauthService.sigBaseString("post", url, params));
	    
	}	
    }
})();
