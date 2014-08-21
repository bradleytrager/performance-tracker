'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'mobile-angular-ui',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'n3-line-chart'
]).
config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'partials/partial1.html',
      controller: 'MyCtrl1'
    });
    $routeProvider.when('/view2', {
      templateUrl: 'partials/partial2.html',
      controller: 'MyCtrl2'
    });
    $routeProvider.when('/clients', {
      templateUrl: 'partials/clients.html',
      controller: 'clients'
    });
    $routeProvider.otherwise({
      redirectTo: '/view1'
    });
  }
]);

var myAppDev = angular.module('myAppDev', ['myApp', 'ngMockE2E']);

myAppDev.run(function($httpBackend) {
  var clients = {
    "data": [{
      "Client Name": "Joanne cleins",
      "Email": "",
      "fk Studio ID": "studio4",
      "pkClientID": "client1"
    }, {
      "Client Name": "Brenda Jones",
      "Email": "",
      "fk Studio ID": "studio4",
      "pkClientID": "client2"
    }, {
      "Client Name": "Susan Elms",
      "Email": "",
      "fk Studio ID": "studio4",
      "pkClientID": "client3"
    }, {
      "Client Name": "Roger Bills",
      "Email": "",
      "fk Studio ID": "studio4",
      "pkClientID": "client4"
    }, {
      "Client Name": "Cindy Cole",
      "Email": "",
      "fk Studio ID": "studio4",
      "pkClientID": "client5"
    }, {
      "Client Name": "Susan Jones",
      "Email": "",
      "fk Studio ID": "studio4",
      "pkClientID": "client6"
    }, {
      "Client Name": "Abby Stanciki",
      "Email": "",
      "fk Studio ID": "studio4",
      "pkClientID": "client7"
    }, {
      "Client Name": "Nicholas Roberts",
      "Email": "",
      "fk Studio ID": "studio4",
      "pkClientID": "client8"
    }, {
      "Client Name": "Trent Telman",
      "Email": "",
      "fk Studio ID": "studio4",
      "pkClientID": "client9"
    }, {
      "Client Name": "Stephanie Rowe",
      "Email": "",
      "fk Studio ID": "studio4",
      "pkClientID": "client11"
    }, {
      "Client Name": "Bill McGillis",
      "Email": "",
      "fk Studio ID": "studio4",
      "pkClientID": "client12"
    }, {
      "Client Name": "Clive Custer",
      "Email": "",
      "fk Studio ID": "studio4",
      "pkClientID": "client13"
    }, {
      "Client Name": "Roy Hibbs",
      "Email": "",
      "fk Studio ID": "studio4",
      "pkClientID": "client15"
    }, {
      "Client Name": "Gene Simons",
      "Email": "",
      "fk Studio ID": "studio4",
      "pkClientID": "client18"
    }, {
      "Client Name": "Geoff Slater",
      "Email": "",
      "fk Studio ID": "studio4",
      "pkClientID": "client19"
    }, {
      "Client Name": "Brenda Jones",
      "Email": "",
      "fk Studio ID": "studio4",
      "pkClientID": "client21"
    }, {
      "Client Name": "Jeff Smith",
      "Email": "",
      "fk Studio ID": "studio4",
      "pkClientID": "client32"
    }, {
      "Client Name": "Jill Reys",
      "Email": "",
      "fk Studio ID": "studio4",
      "pkClientID": "client38"
    }, {
      "Client Name": "Jill Malloy",
      "Email": "",
      "fk Studio ID": "studio4",
      "pkClientID": "client39"
    }, {
      "Client Name": "Stu Shafeer",
      "Email": "",
      "fk Studio ID": "studio4",
      "pkClientID": "client40"
    }, {
      "Client Name": "Carol Mcguffy",
      "Email": "",
      "fk Studio ID": "studio4",
      "pkClientID": "client41"
    }, {
      "Client Name": "Mickey Coke",
      "Email": "mickey@thecokes.net",
      "fk Studio ID": "studio4",
      "pkClientID": "client42"
    }, {
      "Client Name": "Bradley Trager",
      "Email": "bradleytrager@gmail.com",
      "fk Studio ID": "studio4",
      "pkClientID": "client1195"
    }]
  };

  // returns the fixture data
  $httpBackend.whenGET('/clients').respond(clients);
  $httpBackend.whenGET(/^partials\//).passThrough();
});

$(function() {
  angular.bootstrap($('#myApp'), ['myApp', 'myAppDev']);
});