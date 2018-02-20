(function() {
    'use strict';

    angular
	.module('login', [])
	.service('oauthService', oauthService);
    
    function oauthService (consumerSecret, tokenSecret, appUrl, $http) {
	let service = {
	    timeStamp : timeStamp,
	    nonce : nonce,
	    percentEncode : percentEncode,
	    getParamString : getParamString,
	    sigBaseString : sigBaseString,
	    sigKey : sigKey,
	    oauthSignature : oauthSignature,
	    requestToken : requestToken
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
	function sigKey() {
	    return percentEncode(consumerSecret.twitter) + "&" + percentEncode(tokenSecret.twitter);
	}

	// Returns the oauth signature key
	function oauthSignature(params) {
	    let key = sigKey();	    
	    let msg = sigBaseString("post", appUrl.twitter, params);
	    let mopa = CryptoJS.HmacSHA1(msg, key);
	    let oauthSigKey = mopa.toString(CryptoJS.enc.Base64);
	    return oauthSigKey;
	}

	function requestToken() {
	    let params = {
	//	'Postman-Token':  '4101b20e-ec85-09ca-f6ed-9492ddc36562',
	//	'Cache-Control': 'no-cache',
		'oauth_consumer_key' : "Bmpjf1OgUQO3D0ZHKjqyWcr7W",
		'oauth_nonce' : nonce(11),
		'oauth_signature_method' : "HMAC-SHA1",
		'oauth_timestamp' : timeStamp(), 
		'oauth_token' : "779115434964611073-qYjIYJGEd7YTxeyp3YGf9SZNF668Qnk",
		//'oauth_version' : "1.0"
	    };
	    let oauth_signature = oauthSignature(params);

	    let auth = 'Oauth ';
	    let temp = {
		oauth_consumer_key : "Bmpjf1OgUQO3D0ZHKjqyWcr7W",
		oauth_nonce : params.oauth_nonce,
		oauth_signature_method : "HMAC-SHA1",
		oauth_timestamp :params.oauth_timestamp,
		oauth_token : "779115434964611073-qYjIYJGEd7YTxeyp3YGf9SZNF668Qnk",
		oauth_signature : oauth_signature.substring(0, oauth_signature.length - 1) + '%3D'
	    };

	    for(let x in temp) {
		auth += x + '=' + '"' + temp[x] + '"'; 
	    }
	    console.log(temp);
	    console.log(auth);
	    $http({
		method : "POST",
		url : appUrl.twitter,
		headers: {'Authorization': auth}
	    })
		.then(function(response) {
		    console.log(response);
		})
		.catch(function(error) {
		    console.log(error);
		    throw new Error(error);    
		});
	}
    }
})();
