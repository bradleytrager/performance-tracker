'use strict';

define([
  'angular',
  'clients/clientsController',
  'clients/exercisesController',
  'clients/clientsService',
  'clients/routes',
  'angularRoute',
], function(angular, clientsController, exercisesController, clientsService, routes) {

  var moduleName = 'clients';

  angular.module(moduleName, ['ngRoute'])
    .controller("clientsController", clientsController)
    .controller("exercisesController", exercisesController)
    .service('clientsService', clientsService)
    .config(routes);

  return moduleName;

});