'use strict';

define([
  'angular',
  'controllers',
  'routes',
  'angularRoute',
  'angularUI',
  'linechart'
], function(angular, controllers, routes) {

  // Declare app level module which depends on filters, and services
  return angular.module('myApp', [
    'ngRoute',
    'mobile-angular-ui',
    'myApp.controllers',
    'n3-line-chart'
  ])
  .config(routes);
});