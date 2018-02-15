(function() {
    'use strict';

    angular
	.module('login', [])
	.service('oauthService', oauthService);

    function oauthService () {
	let service = {
	    timeStamp : timeStamp,
	    nonce : nonce,
	    percentEncode : percentEncode,
	    getParamString : getParamString,
	    sigBaseString : sigBaseString,
	    sigKey : sigKey,
	    oauthSignature : oauthSignature
	}

	return service;

	//Based on https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
	function timeStamp() {
	    console.log("TIME STAMP");
	    if (!Date.now) {
		Date.now = function() {return new Date().getTime();}
	    }
	    return Math.floor(Date.now()/1000);
	}

	//Based on https://www.thepolyglotdeveloper.com/2015/03/create-a-random-nonce-string-using-javascript/
	function nonce(length) {
	    let text = "";
	    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	    for(let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	    }
	    return text;
	}

	//Added %21 to substitute '!' on the encodeURIComponent function
	function percentEncode(string) {
	    let temp = encodeURIComponent(string);
	    let aux = temp.split('!');
	    let text = "";
	    for(let i = 0; i < aux.length - 1; i++) {
		text += aux[i] + '%21';
	    }
	    text += aux[aux.length - 1];
	    return text;
	}

	//Returns de parameter string, the params argument should follow the pattern bellow:
	/*
	  params = {status : "Hello Ladies + Gentlemen, a signed OAuth request!",
	  include_entities : true,
	  oauth_consumer_key : "xvz1evFS4wEEPTGEFPHBog",
	  oauth_nonce : "kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg",
	  oauth_signature_method : "HMAC-SHA1",
	  oauth_timestamp : 1318622958,
	  oauth_token : "370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb",
	  oauth_version : "1.0"};
	*/
	function getParamString(params) {
	    let aux = [];
	    let text = "";
	    for(let x in params)
		aux.push(x);
	    aux.sort();
	    for(let i = 0; i < aux.length - 1; i++){
		text += aux[i] + "=" + percentEncode(params[aux[i]]) + "&";
	    }
	    text += aux[aux.length - 1] + "=" + percentEncode(params[aux[aux.length - 1]]);
	    return text;
	}

	//Returns the signature base string
	// method: 'get' or 'post'
	// params: same as describe in getParamString
	function sigBaseString(method, url, params) {
	    let text = method.toUpperCase() + "&" + percentEncode(url) + "&";
	    let aux = getParamString(params);
	    text += percentEncode(aux);	  
	    return text;
	}

	//Returns the signing key
	function sigKey(consumerSecret, tokenSecret) {
	    return percentEncode(consumerSecret) + "&" + percentEncode(tokenSecret);
	}

	function oauthSignature() {

	}
    }
})();
