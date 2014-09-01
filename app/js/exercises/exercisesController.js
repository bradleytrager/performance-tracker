'use strict';

define([
	'angular'
], function(angular, controller) {

	// Declare app level module which depends on filters, and services
	var exercisesController = function($scope, $http) {
		$http.get('http://pt.trackformance.com/RESTfm/PT_Demo/script/listExercisesForClient/json-exerciseList/.json').then(function(exercises) {
			$scope.exercises = exercises.data.data;
			console.log(exercises);
			$scope.exercises.forEach(function(exercise) {
				exercise.id = exercise['pk Exercise ID'];
				exercise.name = exercise['Exercise Name'];
			})
		});
	};

	return ['$scope', '$http', exercisesController];

});