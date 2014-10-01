'use strict';

define([], function() {

	var loginController = function($scope, $http, $location, $timeout) {
		$scope.$on('loginError', function() {
			$timeout(function() {
				$scope.$apply(function() {
					showErrorMessage({
						msg: 'The email or password you entered is incorrect.',
						type: 'danger'
					});
				});
			});

		});

		$scope.login = function(username, password) {
			setSession(username, password);
			$http.defaults.headers.common.Authorization = 'Basic ' + btoa(username + ':' + password);
			$location.path('/clients');
		};

		function setSession(username, password) {
			sessionStorage.setItem("username", username);
			sessionStorage.setItem("password", password);
		}

		function showErrorMessage(message) {
			$scope.errorMessage = message;

			$timeout(function() {
				$scope.errorMessage = {};
			}, 5000);
		}

	};

	return ['$scope', '$http', '$location', '$timeout', loginController];

});