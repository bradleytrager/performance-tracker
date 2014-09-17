'use strict';

define([], function() {

	var loginController = function($scope, $http, $location, $timeout) {
		$scope.$on('loginError', function() {
			alert("The email or password you entered is incorrect.");
			// TODO: make this work
			// showErrorMessage("The email or password you entered is incorrect.")
		});

		$scope.login = function(username, password) {
			$http.defaults.headers.common.Authorization = 'Basic ' + btoa(username + ':' + password);
			$location.path('/clients');
		};

		function showErrorMessage(message) {
			$scope.errorMessage = message;

			$timeout(function() {
				$scope.errorMessage = null;
			}, 5000);
		}

	};

	return ['$scope', '$http', '$location', '$timeout', loginController];

});