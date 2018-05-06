(function() {
    'use strict';

    angular
	.module('faceLogin')
	.controller('facebookController', facebookController);

    facebookController.$inject = ['$http', '$scope', 'urlService'];
    
    function facebookController($http, $scope, urlService) {
	let vm = this;

	$scope.loadData = loadData;
	$scope.getPicture = getPicture;
	$scope.oopsILoadedItAgain = oopsILoadedItAgain;
	$scope.listener = listener;
	$scope.validate = validate;
	$scope.getData = getData;
	$scope.fuckYeah = fuckYeah;
	$scope.checkLinkedin = checkLinkedin;
	$scope.getLinkedInData = getLinkedInData;

	let socialData = {
            'id' : '',
            'first_name' : '',
            'last_name' : '',
            'gender' : '',
            'profileUrl' : '',
            'date_last_update' : '',
            'utcOffset' : '',
            'displayName' : '',
            'pictureUrl' : '',
            'birthday' : '',
            'provider' : '',
            'emails' : '',
            'date_creation' : ''
	};

	function getURLParameters(param, ch){
            let vars = [];
            let hash;
            let hashes = window.location.href.slice(window.location.href.indexOf(ch) + 1).split('&');

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
	
	function getData(){
	    console.log("GET MOPA!");
            let access_token=getURLParameters('access_token', '#');
            let temp = "http://graph.facebook.com/me?fields=id,first_name,last_name,picture,gender,email,timezone,birthday&access_token="+access_token;
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let aux = this.responseText;
                    let response = JSON.parse(aux);
                    try{
			socialData['id'] = response['id'];
                    } catch (e) {
			console.log(e);
                    }

                    try{
			socialData['first_name'] = response['first_name'];
                    } catch (e) {
			console.log(e);
                    }

                    try{
			socialData['last_name'] = response['last_name'];
                    } catch (e) {
			console.log(e);
                    }

                    try{
			socialData['gender'] = response['gender'];
                    } catch (e) {
			console.log(e);
                    }

                    try{
			socialData['profileUrl'] = "https://www.facebook.com/app_scoped_user_id/" + response['id'];
                    } catch (e) {
			console.log(e);
                    }

                    try{
			socialData['utcOffset'] = response['timezone'];
                    } catch (e) {
			console.log(e);
                    }
                    

                    try{
			socialData['displayName'] = response['first_name'] + ' ' + response['last_name'];  
                    } catch (e) {
			console.log(e);
                    }
                    

                    try{
			socialData['pictureUrl'] = "http://graph.facebook.com/" + response['id'] + "/picture?type=large";  
                    } catch (e) {
			console.log(e);
                    }


                    try{
			console.log(socialData['birthday']);
			if(response['birthday']){
			    console.log(socialData['birthday']);socialData['birthday'] = response['birthday'];
			}
			
			console.log(socialData['birthday']);
                    } catch (e) {
			console.log(e);
                    }
                    
                    
                    try{
			socialData['provider'] = 'facebook';  
                    }  catch (e) {
			console.log(e);
                    }
                    
                    
                    try{
			socialData['emails'] = response['email'];  
                    } catch (e) {
			console.log(e);
                    }
                    
                    try{
			let state=getURLParameters('state', '#');
			state = decodeURIComponent(state);
			socialData['state'] = state;   
                    } catch (e) {
			console.log(e);
                    }
                    
                    //let host = getHost();
                    //let fullLink = host + '/sendData?data=' + encodeURIComponent(JSON.stringify(socialData));
                    console.log(socialData);
                    alert("MOPA");
                    //console.log(fullLink); 
                    //window.location = fullLink;
                    
                }else if(this.readyState == 4 && this.status != 200){
                    console.log("error, could not retrieve socialData");
                }
            };
	    xhttp.open("GET",temp, true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send();        
	}
	    	
	vm.accessToken = urlService.getUrlParam('access_token');
	vm.expiresIn = urlService.getUrlParam('expires_in');
	vm.code = urlService.getUrlParam('code');
	vm.grantedScopes = urlService.getUrlParam('granted_scopes');
	vm.provider = "facebook";
	vm.profileUrl = "https://www.facebook.com/app_scoped_user_id";
	vm.picture = "";
	vm.state = urlService.getUrlParam('state');
	vm.linkedinToken = "";

	function getPicture(id){
	    return "http://graph.facebook.com/"+ id +"/picture?type=large"
	}
	function loadData() {	    
	    let temp = "http://graph.facebook.com/me?fields=id,first_name,last_name,picture,gender,email,timezone&access_token="+vm.accessToken;
	    let today = new Date();
	    console.log(vm.state);
	    console.log(today);
	    $http.get(temp)
		.then(function(response){
		    console.log(response.data);
		    vm.picture = getPicture(response.data['id']);
		    console.log(vm.picture);
		})
		.catch(function(error) {
		    throw new Error(error);
		});
	}

	function listener(){
	    console.log(this.responseText);
	}
	
	function oopsILoadedItAgain(){
	    
	    let temp = "http://graph.facebook.com/me?fields=id,first_name,last_name,picture,gender,email,timezone&access_token="+vm.accessToken;
	    let xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log("log render response is " +this.responseText);
		    
		    let aux = this.responseText;
		    let js = JSON.parse(aux);
		    console.log(js);
		    console.log(js["id"]);
                }else if(this.readyState == 4 && this.status != 200){
                    console.log("error");
                }
  	    };

	    xhttp.open("GET",temp, true);
  	    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	    xhttp.send();
	}

	function validate(){
	    let queryString = location.hash.substring(1);
	    console.log(queryString);

	    let params = {};
	    let regex = /([^&=]+)=([^&]*)/g, m;
	    while(m = regex.exec(queryString)) {
		params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
		exchangeOAuth2Token(params);
	    }
	}

	function exchangeOAuth2Token(params) {
	    let myId = "200556172120-5bd9laecrf87ctkdqvnge5jpbebslhc5.apps.googleusercontent.com";
	    let oauth2Endpoint = 'https://www.googleapis.com/oauth2/v3/tokeninfo';
	    if(params['access_token']) {
		let xhr = new XMLHttpRequest();
		xhr.open('POST', oauth2Endpoint + "?access_token=" + params["access_token"]);
		xhr.onreadystatechange = function(e){
		    let aux = xhr.response;
		    console.log(aux);
		    let response = JSON.parse(aux);
		    if (xhr.readyState == 4 &&
			xhr.status == 200 &&
			response['aud'] &&
			response['aud'] == myId) {
			localStorage.setItem('oauth2-test-params', JSON.stringify(params));
			console.log(response['aud']);
			console.log("SUUUUCESSO");
			fuckYeah(params);
			alert("CAPIROTO");
		    } else if (xhr.readyState == 4) {
			console.log("ERROR MOTHEEEER FUUUCKA");
		    }
		};
		xhr.send(null);
	    }
	}

	function fuckYeah(){
	    let queryString = location.hash.substring(1);
	    console.log(queryString);

	    let params = {};
	    let regex = /([^&=]+)=([^&]*)/g, m;
	    while(m = regex.exec(queryString)) {
		params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	    }
	    console.log(params.state);
	    let aux = JSON.parse(params.state);
	    console.log(aux);
	    let xhr = new XMLHttpRequest();
	    xhr.open('GET', 'https://www.googleapis.com/plus/v1/people/me?access_token=' + params['access_token']);
	    xhr.onreadystatechange = function (e) {
		//console.log(xhr.response);
		let temp = JSON.parse(xhr.response);
		console.log(temp);
	    };
	    xhr.send(null);
	}

	function checkLinkedin(){
	    let code = getURLParameters('code', '?');
	    console.log(code);
	    alert('CATIORRO');
	    let params = {
		'grant_type' : 'authorization_code',
		'code' : code,
		'redirect_uri' : 'http%3A%2F%2Fmopa.tk%3A8000%2Flogin.html',
		'client_id' : '78bw7xeu4m6gr1',
		'client_secret' : '1ewesR7FfM3juswI'
	    }

	    let aux = '';
	    for(let p in params) {
		aux += p + '=' + params[p] + '&';
	    }
	    aux = aux.substring(0, aux.length - 1);
	    console.log(aux);
	    let xhttp = new XMLHttpRequest();
	    let url = 'https://www.linkedin.com/oauth/v2/accessToken';
	    xhttp.open("POST", url, true);
	    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	    xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
		    let response = JSON.parse(this.responseText);
		    console.log(response);
		    vm.linkedinToken = response.access_token;
		    console.log(vm.linkedinToken);
		    getLinkedInData();
		    alert('CAPRICORNIO');
		}
	    }
	    xhttp.send(aux);	    
	}

	function getLinkedInData(){
	    let xhttp = new XMLHttpRequest();	    
	    let listData = ['id','first-name', 'last-name', 'picture-url', 'public-profile-url', 'email-address'];
	    let str = '(';
	    for(let i = 0; i < listData.length; i++){
		if (i < listData.length - 1)
		    str+=listData[i] + ',';
		else
		    str+=listData[i] + ')';
	    }

	    let url = "https://api.linkedin.com/v1/people/~:" + str +"?format=json&oauth2_access_token=" + vm.linkedinToken;

	    console.log(str);
	    xhttp.open("GET", url, true);
	    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	    xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
		    console.log(this.responseText);
		    let response = JSON.parse(this.responseText);
		    console.log(response);
		    alert('CAPIROTO');
		}else {
		    if(this.readyState == 2){
			console.log('Status available');
		    } else if(this.readyState == 3){
			console.log("getting data");
		    } else{
			console.log("Erro :( " + this.status + " : " + this.readyState);
		    }		   
		}
	    }	   
	    xhttp.send();
	}
    }
})();
