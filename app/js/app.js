'use strict';

define([
  'angular',
  'controllers',
  'loginController',
  'routes',
  'clients/clients',
  'angularRoute',
  'angularUI',
  'angularBootstrap',
  'angularBootstrapTpls',
  'linechart'
], function(angular, controllers, loginController, routes, clientsModule) {

  // Declare app level module which depends on filters, and services
  return angular.module('myApp', [
      clientsModule,
      'ngRoute',
      'mobile-angular-ui',
      'ui.bootstrap',
      'myApp.controllers',
      'n3-line-chart'
    ])
    .controller('loginController', loginController)
    .config(routes)
    .config(function($provide, $httpProvider, $compileProvider) {
      $httpProvider.responseInterceptors.push(function($timeout, $q, $location, $rootScope) {
        return function(promise) {
          return promise.then(
            function(successResponse) {
              return successResponse;
            },
            function(errorResponse) {
              if (errorResponse.status == 403) {
                $location.path("/login");
                $rootScope.$broadcast('loginError');
              }
              return $q.reject(errorResponse);
            });
        };
      });
    });
    //todo remove this
    // .run(function($http) {
    //   $http.defaults.headers.common.Authorization = 'Basic ' + btoa('bradleytrager@gmail.com:' + 'password');
    // });
});