(function() {
    'use strict';

    angular
	.module('login')
	.service('googleService', googleService);

    function googleService() {

	let service = {
	    onSignIn : onSignIn,
	    signOut : signOut
	}
	
	return service;

	function onSignIn(googleUser) {
	    // Useful data for your client-side scripts:
	    let profile = googleUser.getBasicProfile();
	    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
	    console.log('Full Name: ' + profile.getName());
	    console.log('Given Name: ' + profile.getGivenName());
	    console.log('Family Name: ' + profile.getFamilyName());
	    console.log("Image URL: " + profile.getImageUrl());
	    console.log("Email: " + profile.getEmail());

	    // The ID token you need to pass to your backend:
	    let id_token = googleUser.getAuthResponse().id_token;
	    console.log("ID Token: " + id_token);
	}

	function signOut() {
	    let auth2 = gapi.auth2.getAuthInstance();
	    auth2.signOut().then(function () {
		console.log('User signed out.');
	    });
	}
    }

})();
