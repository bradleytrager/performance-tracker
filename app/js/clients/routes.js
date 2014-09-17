'use strict';

define([], function() {

  var routes = function($routeProvider) {

    $routeProvider.when('/clients', {
      templateUrl: 'js/clients/partials/clients.html',
      controller: 'clientsController',
      resolve: {
        clientList: ['clientsService', function(clientsService) {
          return clientsService.get();
        }]
      }
    });

    $routeProvider.when('/exercises/:clientId', {
      templateUrl: 'js/clients/partials/exercises.html',
      controller: 'exercisesController'
    });

  };

  return ['$routeProvider', routes];

});