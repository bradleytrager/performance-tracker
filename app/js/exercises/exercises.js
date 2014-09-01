'use strict';

define([
  'angular',
  'exercises/exercisesController',
], function(angular, exercisesController) {

  var moduleName = 'exercises';

  angular.module(moduleName, [])
    .controller("exercisesController", exercisesController);

  return moduleName;

});