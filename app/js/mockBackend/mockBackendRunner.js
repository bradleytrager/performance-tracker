define([
	'angular',
	'app',
	'mockBackend/clientList',
	'mockBackend/clientExercises',
	'angularMocks'
], function(angular, app, clients, clientExercises) {

	var mockBackendRunner = function($httpBackend) {

		$httpBackend.whenGET('http://pt.trackformance.com/RESTfm/PT_Demo/script/listExercisesForClient/json-exerciseList/.json').respond(clientExercises);
		$httpBackend.whenGET('http://pt.trackformance.com/RESTfm/PT_Demo/script/listClientsForLoggedInUser/json-user/.json').respond(clients);
		$httpBackend.whenGET(/partials\//).passThrough();
	
	};

	return ['$httpBackend', mockBackendRunner];

});