define([
	'angular',
	'app',
	'mockBackend/clientList',
	'angularMocks'
], function(angular, app, clients) {

	var mockBackendRunner = function($httpBackend) {

		// returns the fixture data
		$httpBackend.whenGET('http://pt.trackformance.com/RESTfm/PT_Demo/script/listClientsForLoggedInUser/json-user/.json').respond(clients);
		$httpBackend.whenGET(/partials\//).passThrough();
	};

	return ['$httpBackend', mockBackendRunner];
});