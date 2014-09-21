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
    .config(['$httpProvider',
      function($httpProvider) {
        $httpProvider.interceptors.push(['$q', '$location', '$rootScope', '$timeout',
          function($q, $location, $rootScope, $timeout) {
            return {
              'request': function(config) {
                return config;
              },

              'requestError': function(rejection) {
                if (canRecover(rejection)) {
                  return responseOrNewPromise
                }
                return $q.reject(rejection);
              },

              'response': function(response) {
                $rootScope.isLoggedIn = true;
                return response;
              },

              'responseError': function(rejection) {
                if (rejection.status == 403) {
                  $location.path("/login");
                  $timeout(function() {
                    $rootScope.$broadcast('loginError');
                  });
                }
                return $q.reject(rejection);
              }
            };
          }
        ]);
      }
    ]);
});