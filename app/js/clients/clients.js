'use strict';

define([
  'angular',
  'clients/clientsController',
  'clients/exercisesController',
  'clients/clientsService',
  'clients/d3BarsDirective',
  'clients/routes',
  'angularRoute',
], function(angular, clientsController, exercisesController, clientsService, d3BarsDirective, routes) {

  var moduleName = 'clients';

  angular.module(moduleName, ['ngRoute'])
    .controller("clientsController", clientsController)
    .controller("exercisesController", exercisesController)
    .service('clientsService', clientsService)
    .directive('d3Bars', d3BarsDirective)
    .config(routes);

  return moduleName;

});