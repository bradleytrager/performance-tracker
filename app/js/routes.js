'use strict';

define(['angular', 'app'], function(angular, app) {

  var routes = function($routeProvider) {

    $routeProvider.when('/view1', {
      templateUrl: 'partials/partial1.html',
      controller: 'MyCtrl1'
    });
    $routeProvider.when('/view2', {
      templateUrl: 'partials/partial2.html',
      controller: 'MyCtrl2'
    });
    $routeProvider.when('/clients', {
      templateUrl: 'js/clients/partials/clients.html',
      controller: 'clientsController'
    });
    $routeProvider.when('/exercises/:clientId', {
      templateUrl: 'js/clients/partials/exercises.html',
      controller: 'exercisesController'
    });
    $routeProvider.otherwise({
      redirectTo: '/view1'
    });

  };

  return ['$routeProvider', routes];

});