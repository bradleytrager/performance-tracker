'use strict';

define([
  'angular',
  'controllers',
  'routes',
  'clients/clients',
  'angularRoute',
  'angularUI',
  'angularBootstrap',
  'linechart'
], function(angular, controllers, routes, clientsModule) {

  // Declare app level module which depends on filters, and services
  return angular.module('myApp', [
      clientsModule,
      'ngRoute',
      'mobile-angular-ui',
      'ui.bootstrap',
      'myApp.controllers',
      'n3-line-chart'
    ])
    .config(routes)
    .run(function($http) {
      $http.defaults.headers.common.Authorization = 'Basic YnJhZGxleXRyYWdlckBnbWFpbC5jb206cGFzc3dvcmQ='
    });
});