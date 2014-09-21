'use strict';

define([], function() {

  var routes = function($routeProvider) {

    $routeProvider.when('/view1', {
      templateUrl: 'partials/partial1.html',
      controller: 'MyCtrl1'
    });
   
    $routeProvider.when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController'
    });

    $routeProvider.otherwise({
      redirectTo: '/login'
    });

  };

  return ['$routeProvider', routes];

});