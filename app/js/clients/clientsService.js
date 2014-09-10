'use strict';

define([], function() {

	var clientsService = function($http, $q) {
		var service = this;

		var BASE_URL = 'http://pt.trackformance.com/RESTfm/PT_Demo/script/';

		this.get = function() {
			return $http.get(BASE_URL + 'listClientsForLoggedInUser/json-user/.json');
		};

		this.getClient = function(id) {
			return $http.get(BASE_URL + 'listUser/json-user/.json?RFMscriptParam=' + id);
		};

		this.getExercises = function(id, period) {
			var whenExercises = $q.defer();

			service.getClient(id).then(function() {
				$http.get(BASE_URL + 'listExercisesForClient/json-exerciseList/.json?RFMscriptParam=' + period).then(function(exercises) {
					whenExercises.resolve(exercises);
				},
				function(error){
					whenExercises.reject(error);
				});
			});

			return whenExercises.promise;
		};

		this.getReportingPeriods = function() {
			return $http.get(BASE_URL + 'listReportPeriodOptions/ReportingPeriods/.json');
		};

	};

	return ['$http','$q', clientsService];
});