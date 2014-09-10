'use strict';

define([
  'angular',
  'clients/clientsController',
  'clients/exercisesController',
  'clients/clientsService'
], function(angular, clientsController, exercisesController, clientsService) {

  var moduleName = 'clients';

  angular.module(moduleName, [])
    .controller("clientsController", clientsController)
    .controller("exercisesController", exercisesController)
    .service('clientsService', clientsService);

  return moduleName;

});