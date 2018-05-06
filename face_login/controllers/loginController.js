(function() {
    'use strict';

    angular
	.module('login', [])
	.controller('loginController', loginController);

    loginController.$inject = ['$http', '$scope'];
    
    function loginController($http, $scope) {
	let vm = this;

	$scope.login = login;
	$scope.getData = getData;
	$scope.loginGoogle = loginGoogle;
	$scope.linkedIn = linkedIn;
//	$scope.loginTwitter = loginTwitter;
//	$scope.logOutGoogle = logOutGoogle;

	console.log("CONTROLLER");
	
	function login() {
	    let stateParam = {
		accessToken : "a0734646-2857-4eac-bec5-9b3e44cb4204",
		vlanIp : "1",
		mac : "00:00",
		hostIp : "becon.com.br:8383"
	    };
	    let aux = "" ;
	    stateParam = JSON.stringify(stateParam);
            for(let i = 0; i < stateParam.length; i++){
                if(stateParam[i] == ':'){
                    aux += '=';
		} else {
		    aux+= stateParam[i];
		}
            }
	    
	    let url = "https://www.facebook.com/v2.12/dialog/oauth?client_id=2115487848688367&redirect_uri=http://mopa.tk:8000/login.html&state="+ stateParam + "&response_type=token%20granted_scopes%20code&scope=user_birthday";
	    window.location = url;
	}

	function getData() {
	    let url = "https://www.facebook.com/v2.12/dialog/oauth?client_id=2115487848688367&redirect_uri=http://mopa.tk:8000/login.html&response_type=token%20granted_scopes%20code&scope=user_likes%20user_education_history%20user_posts%20user_tagged_places"
	    $http({
		method: "POST",
		url: url		
	    })
		.then(function(response){
		    console.log(response);
		})
		.catch(function(error){
		    throw new Error(error);
		});
	}

	function linkedIn(){
	    let stateParam = {
		accessToken : "a0734646-2857-4eac-bec5-9b3e44cb4204",
		vlanIp : "1",
		mac : "00:00",
		hostIp : "becon.com.br:8383"
	    };
	    stateParam = encodeURIComponent(JSON.stringify(stateParam));

	    let params = {
		//		1ewesR7FfM3juswI
		//cliete 78bw7xeu4m6gr1
		'response_type' : 'code',
		'client_id' : '78bw7xeu4m6gr1',
		'redirect_uri' : 'http%3A%2F%2Fmopa.tk:8000%2Flogin.html',
		'state' : stateParam,
		'scope' : 'r_basicprofile%20r_emailaddress'
	    }

	    let aux = '';
	    for(let p in params) {
		aux += p + '=' + params[p] + '&';
	    }
	    console.log(stateParam);
	    console.log(aux);
	    alert("CATO");
	    window.location = "https://www.linkedin.com/oauth/v2/authorization?" + aux;

	}

	function loginGoogle(){
	    let stateParam = {
		accessToken : "a0734646-2857-4eac-bec5-9b3e44cb4204",
		vlanIp : "1",
		mac : "00:00",
		hostIp : "becon.com.br:8383"
	    };
	    stateParam = JSON.stringify(stateParam);

	    let params = {
		'client_id' : '466858969115-jluabnitjaskbj9s9dkhr9rogd0isuvo.apps.googleusercontent.com',
		'redirect_uri' : 'http://mopa.tk:8000/login.html',
		'response_type' : 'token',
		'scope' : 'https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email',
		'include_granted_scopes' : 'true',
		'state' : stateParam
	    }	   
	    
	    let aux = '';
	    for(let p in params) {
		aux += p + '=' + params[p] + '&';
	    }
	    aux += 'prompt=consent';
	    console.log(aux);
	    window.location = "https://accounts.google.com/o/oauth2/v2/auth?" + aux;
	}
    }
})();
