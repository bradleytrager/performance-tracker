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
    .config(function($provide, $httpProvider, $compileProvider) {
      $httpProvider.responseInterceptors.push(function($timeout, $q, $location) {
        return function(promise) {
          return promise.then(
            function(successResponse) {
              return successResponse;
            },
            function(errorResponse) {
              if (errorResponse.status == 403) {
                $location.path("/");
              }
              return $q.reject(errorResponse);
            });
        };
      });
    })
    .run(function($http) {
      $http.defaults.headers.common.Authorization = 'Basic ' + btoa('bradlteytrager@gmail.com:' + 'password');
    });
});