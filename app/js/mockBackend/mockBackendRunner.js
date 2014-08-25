define([
	'angular',
	'app',
	'mockBackend/clientList',
	'angularMocks'
], function(angular, app, clients) {

	var mockBackendRunner = function($httpBackend) {

		// returns the fixture data
		$httpBackend.whenGET('/clients').respond(clients);
		$httpBackend.whenGET(/partials\//).passThrough();
	};

	return ['$httpBackend', mockBackendRunner];
});