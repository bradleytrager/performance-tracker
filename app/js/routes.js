'use strict';

define([], function() {

  var routes = function($routeProvider) {

    $routeProvider.when('/view1', {
      templateUrl: 'partials/partial1.html',
      controller: 'MyCtrl1'
    });
   
    $routeProvider.when('/view2', {
      templateUrl: 'partials/partial2.html',
      controller: 'MyCtrl2'
    });

    $routeProvider.otherwise({
      redirectTo: '/view1'
    });

  };

  return ['$routeProvider', routes];

});