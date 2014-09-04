define([
	'angular',
	'app',
	'mockBackend/clientList',
	'mockBackend/clientExercises',
	'angularMocks'
], function(angular, app, clients, clientExercises) {

	var mockBackendRunner = function($httpBackend) {
		var BASE_URL = 'http://pt.trackformance.com/RESTfm/PT_Demo/script/';
		var clientListURL = BASE_URL + 'listClientsForLoggedInUser/json-user/.json';
		var clientExercisesURL = BASE_URL + 'listExercisesForClient/json-exerciseList/.json?' 
											+ 'RFMscriptParam=client39';
		$httpBackend.whenGET(clientExercisesURL).respond(clientExercises);
		$httpBackend.whenGET(clientListURL).respond(clients);
		$httpBackend.whenGET(/partials\//).passThrough();
	
	};

	return ['$httpBackend', mockBackendRunner];

});