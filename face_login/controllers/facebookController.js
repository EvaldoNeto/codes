(function() {
    'use strict';

    angular
	.module('faceLogin')
	.controller('facebookController', facebookController);

    facebookController.$inject = ['$http', '$scope', 'urlService'];
    
    function facebookController($http, $scope, urlService) {
	let vm = this;

	$scope.loadData = loadData;

	vm.accessToken = urlService.getUrlParam('access_token');
	vm.expiresIn = urlService.getUrlParam('expires_in');
	vm.code = urlService.getUrlParam('code');
	vm.grantedScopes = urlService.getUrlParam('granted_scopes');
	function loadData() {
	    let temp = "http://graph.facebook.com/me?fields=id,name,devices,education,likes,posts,tagged_places&access_token="+vm.accessToken;
	    $http.get(temp)
		.then(function(response){
		    console.log(response.data);
		})
		.catch(function(error) {
		    throw new Error(error);
		});
	}
    }
})();
