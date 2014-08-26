'use strict';

define([
  'angular',
  'controllers',
  'routes',
  'clients/clients',
  'angularRoute',
  'angularUI',
  'linechart'
], function(angular, controllers, routes, clientsModule) {

  // Declare app level module which depends on filters, and services
  return angular.module('myApp', [
      clientsModule,
      'ngRoute',
      'mobile-angular-ui',
      'myApp.controllers',
      'n3-line-chart'
    ])
    .config(routes)
    .run(function($http) {
      $http.defaults.headers.common.Authorization = 'Basic YnJhZGxleXRyYWdlckBnbWFpbC5jb206cGFzc3dvcmQ='
    });
});