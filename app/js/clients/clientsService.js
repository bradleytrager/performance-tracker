'use strict';

define([], function() {

	var clientsService = function($http, $q) {
		var service = this;
		var STAGE_URL = 'PT_Demo';
		var PROD_URL = 'PerfTrackerRESTfm';
		var BASE_URL = 'http://pt.trackformance.com/RESTfm/' + PROD_URL + '/script/';

		this.get = function() {
			return $http.get(BASE_URL + 'listClientsForLoggedInUser/json-user/.json');
		};

		this.getClient = function(clientId) {
			return service.get().then(function() {
				return $http.get(BASE_URL + 'listUser/json-user/.json?RFMscriptParam=' + clientId);
			});
		};

		this.getExercises = function(clientId, period) {
			return service.getClient(clientId).then(function() {
				return $http.get(BASE_URL + 'listExercisesForClient/json-exerciseList/.json?RFMscriptParam=' + period);
			});
		};

		this.getReportingPeriods = function() {
			return $http.get(BASE_URL + 'listReportPeriodOptions/ReportingPeriods/.json');
		};

		this.getReport = function(exerciseId, clientId, period) {
			var url = BASE_URL + "listHistoryForClientForExercise/json-history/.json?RFMscriptParam=" + exerciseId;
			return service.getExercises(clientId, period).then(function() {
				return $http.get(url);
			});
		}

	};

	return ['$http', '$q', clientsService];
});