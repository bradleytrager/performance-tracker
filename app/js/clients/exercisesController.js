'use strict';

define([], function() {

	// Declare app level module which depends on filters, and services
	var exercisesController = function($scope, $routeParams, clientsService) {
		var BASE_URL = 'http://pt.trackformance.com/RESTfm/PT_Demo/script/';

		clientsService.getReportingPeriods().then(function(periods) {
			$scope.periods = periods.data.data;
			$scope.period = $scope.periods[0];
			console.log($scope.period);
			clientsService.getExercises($routeParams.clientId, $scope.period.PeriodValueDays).then(

				function(exercises) {
					$scope.exercises = exercises.data.data;
					$scope.exercises.forEach(function(exercise) {
						exercise.id = exercise['pk Exercise ID'];
						exercise.name = exercise['Exercise Name'];
					});
				},

				function(error) {
					$scope.exercisesError = error.data.info["X-RESTfm-FM-Reason"];
				}
			);
		});

		clientsService.getClient($routeParams.clientId).then(function(client) {
			$scope.client = client.data.data[0];
			$scope.client.name = $scope.client['Client Name'];
			$scope.client.email = $scope.client['Email'];
			$scope.client.studio = $scope.client['fk Studio ID'];
			$scope.client.id = $scope.client['pkClientID'];
		});



		$scope.setPeriod = function(period) {
			$scope.period = period;
			console.log($scope.period);
		};

		$scope.getReport = function(exerciseId) {
			clientsService.getReport(exerciseId).then(function(report) {
				var _report = report.data.data;

				_report.forEach(function(data) {
					data["Date"] = new Date(data["Date"]).getTime();
					var timeParts = data["Total Time"].split(":");
					var time = 60 * parseInt(timeParts[1]) + parseInt(timeParts[2]);
					data["Total Time"] = time;
					data["Current Weight"] = parseInt(data["Current Weight"]);
				});

				$scope.data = _report;
				console.log($scope.data);

			});
		};

		$scope.options = {
			series: [{
				y: "Current Weight",
				label: "Current Weight",
				color: "#1871A4",
				axis: "y2",
				type: "line",
				thickness: "3px",
				id: "series_0"
			}, {
				y: "Total Time",
				label: "Time Under Load",
				color: "#BFBFBF",
				type: "column",
				axis: "y",
				id: "series_1"
			}],
			stacks: [],
			axes: {
				x: {
					type: "linear",
					key: "Date",
					labelFunction: function(msTime) {
						var date = new Date(msTime);

						var dateParts = date.toString().split(" ");
						var formattedDate = dateParts[1] + dateParts[2];
						return formattedDate;
					}
				},
				y: {
					type: "linear",
					labelFunction: function(seconds) {
						var seconds = parseInt(seconds);
						var minutes = Math.floor(seconds / 60);
						var remainingSeconds = seconds - 60 * minutes;
						return minutes.toString() + ":" + remainingSeconds.toString();
					}
				},
				y2: {
					type: "linear",
					labelFunction: function(weight) {
						return weight + " lbs"
					}
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
	};

	return ['$scope', '$routeParams', 'clientsService', exercisesController];

});