(function() {
    'use strict';

    angular
	.module('login', [])
	.controller('loginController', loginController);

    loginController.$inject = ['$http', '$scope', '$ajax'];
    
    function loginController($http, $scope, $ajax) {
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
	    $http({
		method: 'POST',
		url: 'https://api.twitter.com/oauth/request_token',
		headers: {Authorization: 'OAuth oauth_consumer_key=\\"Bmpjf1OgUQO3D0ZHKjqyWcr7W\\",oauth_token=\\"779115434964611073-qYjIYJGEd7YTxeyp3YGf9SZNF668Qnk\\",oauth_signature_method=\\"HMAC-SHA1\\",oauth_timestamp=\\"1518617918\\",oauth_nonce=\\"lEQ3cCEkzy2\\",oauth_signature=\\"pSAaUCgJhvq723qPR3GLN%2BjMKS4%3D\\"' }
	    })
		.then(function(response){
		    console.log(response);
		})
		.catch(function(error) {
		    throw new Error(error);
		});
	}

	function tweet() {
	    var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://api.twitter.com/oauth/request_token",
		"method": "POST",
		"headers": {
		    "Authorization": "OAuth oauth_consumer_key=\\\"Bmpjf1OgUQO3D0ZHKjqyWcr7W\\\",oauth_token=\\\"779115434964611073-qYjIYJGEd7YTxeyp3YGf9SZNF668Qnk\\\",oauth_signature_method=\\\"HMAC-SHA1\\\",oauth_timestamp=\\\"1518617918\\\",oauth_nonce=\\\"lEQ3cCEkzy2\\\",oauth_signature=\\\"pSAaUCgJhvq723qPR3GLN%2BjMKS4%3D\\\"",
		    "Cache-Control": "no-cache"
		}
	    }

	    $.ajax(settings).done(function (response) {
		console.log(response);
	    });
	}
	
    }
})();

