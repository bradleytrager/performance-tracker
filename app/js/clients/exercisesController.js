'use strict';

define([], function() {

	// Declare app level module which depends on filters, and services
	var exercisesController = function($scope, $routeParams, clientsService) {
		var BASE_URL = 'http://pt.trackformance.com/RESTfm/PT_Demo/script/';

		clientsService.getReportingPeriods().then(function(periods) {
			$scope.periods = periods.data.data;
			$scope.period = $scope.periods[0];
		})
		
		clientsService.getClient($routeParams.clientId).then(function(client) {
			$scope.client = client.data.data[0];
			$scope.client.name = $scope.client['Client Name'];
			$scope.client.email = $scope.client['Email'];
			$scope.client.studio = $scope.client['fk Studio ID'];
			$scope.client.id = $scope.client['pkClientID'];
		});

		clientsService.getExercises($routeParams.clientId, $scope.period).then(

			function(exercises) {
				$scope.exercises = exercises.data.data;
				$scope.exercises.forEach(function(exercise) {
					exercise.id = exercise['pk Exercise ID'];
					exercise.name = exercise['Exercise Name'];
				});
			},

			function(error) {
				$scope.exercisesError = error.data.info["X-RESTfm-FM-Reason"];
			}
		);

		$scope.setPeriod = function(period) {
			$scope.period = period;
			console.log($scope.period);
		}
	};

	return ['$scope', '$routeParams', 'clientsService', exercisesController];

});