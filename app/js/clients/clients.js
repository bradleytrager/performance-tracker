'use strict';

define([
  'angular',
  'clients/clientsController',
], function(angular, clientsController) {

  var moduleName = 'clients';

  angular.module(moduleName, [])
    .controller("clientsController", clientsController);

  return moduleName;

});