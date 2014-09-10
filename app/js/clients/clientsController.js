'use strict';

define([
], function() {

	var clientsController = function($scope, clientsService) {
		clientsService.get().then(function(clients) {
			$scope.clients = clients.data.data;
			$scope.clients.forEach(function(client) {
				client.id = client['pkClientID'];
				client.name = client['Client Name'];
				client.email = client['Email'];
				client.studio = client['fk Studio ID'];
			})
		});

		$scope.client = {};

		$scope.displayClient = function(clientId) {
			$scope.clients.forEach(function(client) {
				if (client.id == clientId) {
					$scope.selectedClient = client;
				}
			});
		};

		$scope.clearSelectedClient = function() {
			$scope.selectedClient = null;
		}
	};

	return ['$scope', 'clientsService', clientsController];

});