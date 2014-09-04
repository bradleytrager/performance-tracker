'use strict';

define([
	'angular'
], function(angular, controller) {

	// Declare app level module which depends on filters, and services
	var exercisesController = function($scope, $http, $routeParams) {
		var BASE_URL = 'http://pt.trackformance.com/RESTfm/PT_Demo/script/';
		$http.get(BASE_URL + 'listUser/json-user/.json?RFMscriptParam=' + $routeParams.clientId)
			.then(function() {
				$http.get(BASE_URL + 'listExercisesForClient/json-exerciseList/.json?RFMscriptParam=' + $routeParams.clientId)
					.then(function(exercises) {
						$scope.exercises = exercises.data.data;
						console.log(exercises);
						$scope.exercises.forEach(function(exercise) {
							exercise.id = exercise['pk Exercise ID'];
							exercise.name = exercise['Exercise Name'];
						});
					});
			});


	};

	return ['$scope', '$http', '$routeParams', exercisesController];

});