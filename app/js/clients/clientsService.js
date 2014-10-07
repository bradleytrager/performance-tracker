'use strict';

define([], function() {

	var clientsService = function($http, $q) {
		var service = this;

		var BASE_URL = 'http://pt.trackformance.com/RESTfm/PT_Demo/script/';

		this.get = function() {
			return $http.get(BASE_URL + 'listClientsForLoggedInUser/json-user/.json');
		};

		this.getClient = function(clientId) {
			return $http.get(BASE_URL + 'listUser/json-user/.json?RFMscriptParam=' + clientId);
		};

		this.getExercises = function(clientId, period) {
			var whenExercises = $q.defer();

			service.getClient(clientId).then(function() {
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

		this.getReport = function(exerciseId) {
			var url = BASE_URL + "listHistoryForClientForExercise/json-history/.json?RFMscriptParam=" + exerciseId;
			return $http.get(url);
		}

	};

	return ['$http','$q', clientsService];
});