'use strict';

define([
], function() {

	var loginController = function($scope, $http, $location) {
		$scope.login = function(username, password) {
			$http.defaults.headers.common.Authorization = 'Basic ' + btoa(username + ':' + password);
			$location.path('/clients');
		}
	};

	return ['$scope', '$http', '$location', loginController];

});