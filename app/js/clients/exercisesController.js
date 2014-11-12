'use strict';

define([], function() {

	var exercisesController = function($scope, $routeParams, clientsService) {
		var BASE_URL = 'http://pt.trackformance.com/RESTfm/PT_Demo/script/';
		$scope.lineData = [];
		$scope.barData = [];
		var loadData = function() {
			return clientsService.getReportingPeriods().then(function(periods) {
				$scope.periods = periods.data.data;

				if (!$scope.period) {
					$scope.period = $scope.periods[0];
				}

				return clientsService.getExercises($routeParams.clientId, $scope.period.PeriodValueDays).then(

					function(exercises) {
						$scope.exercises = exercises.data.data;
						$scope.exercises.forEach(function(exercise) {
							exercise.id = exercise['pk Exercise ID'];
							exercise.name = exercise['Exercise Name'];
						});

						if ($scope.selectedExerciseId) {
							$scope.getReport($scope.selectedExerciseId);
						}
					},

					function(error) {
						$scope.exercisesError = error.data.info["X-RESTfm-FM-Reason"];
					}
				);
			});
		};

		loadData();

		clientsService.getClient($routeParams.clientId).then(function(client) {
			$scope.client = client.data.data[0];
			$scope.client.name = $scope.client['Client Name'];
			$scope.client.email = $scope.client['Email'];
			$scope.client.studio = $scope.client['fk Studio ID'];
			$scope.client.id = $scope.client['pkClientID'];
		});



		$scope.setPeriod = function(period) {
			$scope.period = period;
			loadData().then(function() {
				$scope.getReport($scope.selectedExercise);
			});
		};

		$scope.getReport = function(exerciseId) {
			$scope.selectedExercise = exerciseId;
			clientsService.getReport(exerciseId, $routeParams.clientId, $scope.period.PeriodValueDays).then(function(response) {
				var report = response.data.data;
				console.log(report);
				var dates = [];

				var timestamps = [];
				var goToFailures = [];
				var performances = [];
				var currentWeights = [];
				var netChangeWeights = [];
				var timeUnderLoads = [];
				var rangeOfMotions = [];
				var outOfSequences = [];

				var barData = [];
				var lineData = [];

				report.forEach(function(data, index) {
					data["Date"] = new Date(data["Date"]).getTime();
					data["dateIndex"] = index;
					dates.push(data["dateIndex"]);
					var timeParts = data["Total Time"].split(":");
					var time = 60 * parseInt(timeParts[1]) + parseInt(timeParts[2]);
					data["Total Time"] = time;
					data["Current Weight"] = parseInt(data["Current Weight"]);

					var timestamp = new Date(data["Timestamp"]);
					var hours = timestamp.getHours();
					if (hours == 0) {
						timestamp = "12 AM";
					} else if (hours > 12) {
						timestamp = (hours - 12) + " PM";
					} else {
						timestamp = hours + " AM"
					}
					timestamps.push(timestamp);
					goToFailures.push("N/A");
					outOfSequences.push(data["oosView"]);
					performances.push(data["performanceView"]);
					currentWeights.push(data["Current Weight"]);
					netChangeWeights.push(data["netChangeWeight"] ? data["netChangeWeight"] + "%" : "");

					var timeUnderLoadMinutes = Math.floor(data["Total Time"] / 60);
					var timeUnderLoadSeconds = data["Total Time"] % 60;
					timeUnderLoads.push(timeUnderLoadMinutes + "m " + timeUnderLoadSeconds + "s");
					rangeOfMotions.push(data["Current Range"]);

					$scope.barData.push({
						x: index,
						y: data["Current Weight"]
					});
					$scope.lineData.push({
						x: index,
						y: data["Total Time"]
					});

				});

				$scope.data = report;
				$scope.timestamps = timestamps;
				$scope.goToFailures = goToFailures;
				$scope.performances = performances;
				$scope.outOfSequences = outOfSequences;
				$scope.currentWeights = currentWeights;
				$scope.netChangeWeights = netChangeWeights;
				$scope.timeUnderLoads = timeUnderLoads;
				$scope.rangeOfMotions = rangeOfMotions;

				var ymin = 0.9 * d3.min(currentWeights);
				var ymax = 1.1 * d3.max(currentWeights);

				$scope.options = {
					series: [{
						y: "Current Weight",
						label: "Current Weight",
						color: "#BFBFBF",
						type: "column",
						axis: "y2",
						id: "series_0"
					}, {
						y: "Total Time",
						label: "Time Under Load",
						color: "#1871A4",
						type: "line",
						thickness: "3px",
						dotSize: 10,
						axis: "y",
						id: "series_1"
					}],
					axes: {
						x: {
							type: "linear",
							key: "dateIndex",
							labelFunction: function(index) {
								if (dates.indexOf(index) == -1) {
									return "";
								}
								var msTime = $scope.data[index].Date
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
							},
							min: ymin,
							max: ymax
						}
					},
					lineMode: "linear",
					tension: 0.7,
					drawLegend: true,
					drawDots: true,
					columnsHGap: 5
				};
			});
		};

	};

	return ['$scope', '$routeParams', 'clientsService', exercisesController];

});