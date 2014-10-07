define([
	'angular',
	'app',
	'mockBackend/clientList',
	'mockBackend/clientExercises',
	'mockBackend/reportingPeriods',
	'mockBackend/exerciseReport',
	'angularMocks'
], function(angular, app, clients, clientExercises, reportingPeriods, exerciseReport) {

	var mockBackendRunner = function($httpBackend) {

		var clientListURL = /listClientsForLoggedInUser\/json-user/;
		var clientURL = /listUser\/json-user/;
		var clientExercisesURL = /listExercisesForClient\/json-exerciseList/; 
		var reportingPeriodsURL = /listReportPeriodOptions\/ReportingPeriods/;
		var exerciseReportURL = /listHistoryForClientForExercise\/json-history/;
		var templateUrl = /partials\//;
		
		$httpBackend.whenGET(clientExercisesURL).respond(clientExercises);
		$httpBackend.whenGET(clientURL).respond(clients);
		$httpBackend.whenGET(clientListURL).respond(clients);
		$httpBackend.whenGET(reportingPeriodsURL).respond(reportingPeriods);
		$httpBackend.whenGET(exerciseReportURL).respond(exerciseReport);
		
		$httpBackend.whenGET(templateUrl).passThrough();
	};

	return ['$httpBackend', mockBackendRunner];

});