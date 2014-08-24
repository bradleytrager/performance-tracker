'use strict';

require.config({
	paths: {
		angular: '../bower_components/angular/angular',
		angularRoute: '../bower_components/angular-route/angular-route',
		angularMocks: '../bower_components/angular-mocks/angular-mocks',
		text: '../bower_components/requirejs-text/text',
		angularUI: '../bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.min',
		linechart: '../bower_components/n3-line-chart/dist/line-chart'
	},
	shim: {
		'angular': {
			'exports': 'angular'
		},
		'angularRoute': ['angular'],
		'angularMocks': {
			deps: ['angular'],
			'exports': 'angular.mock'
		},
		'angularUI': ['angular'],
		'linechart': ['angular']
	},
	priority: [
		"angular"
	]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
// window.name = "NG_DEFER_BOOTSTRAP!";

require([
	'angular',
	'app',
	'angularMocks',
	'routes',
	'mockBackend'
], function(angular, app, routes) {

	$(function() {
		angular.bootstrap($('#myApp'), ['myApp', 'myAppDev']);
	});
});