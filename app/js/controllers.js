'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
	.controller('MyCtrl1', ['$scope',
		function($scope) {
			var linearData = function(rowCount, seriesCount) {
				var data = [];

				for (var i = 0; i < seriesCount; i++) {
					for (var j = 0; j < rowCount; j++) {
						var row = data[j] || {
							x: j
						};
						row['val_' + i] = Math.round(Math.sin((i + 1) * j / 5) * (5 * (i + 1)) * 1000) / 1000;
						data[j] = row;
					}
				}

				return data;
			};
			console.log(linearData(30,4));
			$scope.data = linearData(30,4);
			$scope.options = {
				series: [{
					y: "val_0",
					label: "A line sinusoid",
					color: "#1f77b4",
					axis: "y",
					type: "line",
					thickness: "1px",
					id: "series_0"
				}, {
					y: "val_0",
					label: "A column sinusoid",
					color: "#ff7f0e",
					type: "column",
					axis: "y",
					id: "series_1"
				}, {
					y: "val_0",
					label: "An area sinusoid",
					color: "#2ca02c",
					type: "area",
					axis: "y",
					thickness: "1px",
					id: "series_2"
				}],
				stacks: [],
				axes: {
					x: {
						type: "linear",
						key: "x"
					},
					y: {
						type: "linear"
					}
				},
				lineMode: "linear",
				tension: 0.7,
				tooltip: {
					mode: "scrubber"
				},
				drawLegend: true,
				drawDots: true,
				columnsHGap: 5
			};

		}
	])
	.controller('clients', ['$scope','$http',
		function($scope, $http) {
			$http.get('/clients').then(function(clients) {
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
				$scope.client = findClient(clientId);
			}

			function findClient(clientId) {
				return $scope.clients[0];
			}
		}
	]);