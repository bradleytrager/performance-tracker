define([
	'angular',
	'app',
	'mockBackend/mockBackendRunner',
	'angularMocks'
], function(angular, app, mockBackendRunner) {

	var moduleName = 'myAppDev';

	angular.module(moduleName, ['myApp', 'ngMockE2E'])
		.run(mockBackendRunner);


	return moduleName;
});