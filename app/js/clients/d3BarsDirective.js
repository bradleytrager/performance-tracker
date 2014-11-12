'use strict';

define([], function() {

  var d3BarsDirective = function() {
    return {
      restrict: 'EA',
      scope: {
        lineData: "=",
        barData: "=",
        label: "@",
        onClick: "&"
      },
      link: function(scope, iElement, iAttrs) {
        var lineData = scope.lineData;
        var barData = scope.barData;
        var svg = d3.select(iElement[0])
          .append("svg")
          .attr("width", "100%")
          .attr("height", "500");

        // on window resize, re-render d3 canvas
        window.onresize = function() {
          return scope.$apply();
        };
        scope.$watch(function() {
          return angular.element(window)[0].innerWidth;
        }, function() {
          return scope.render(scope.data);
        });

        // watch for data changes and re-render
        scope.$watch('lineData', function(newVals, oldVals) {
          return scope.render(newVals);
        }, true);

        // define render function
        scope.render = function(data) {
          // remove all previous items before render
          svg.selectAll("*").remove();

          var graph = svg,
            WIDTH = 5000,
            HEIGHT = 300,
            MARGINS = {
              top: 20,
              right: 20,
              bottom: 20,
              left: 50
            },
            LINE_COLOR = '#1871A4',
            BAR_COLOR = '#BFBFBF',
            CIRCLE_COLOR = '#1871A4';

          var xRange = d3.scale.ordinal()
            .rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right], 0.1)
            .domain(barData.map(function(d) {
              return d.x;
            }));
          var yRange = d3.scale.linear()
            .range([HEIGHT - MARGINS.top, MARGINS.bottom])
            .domain([d3.min(lineData, function(d) {
              return d.y - 5;
            }), d3.max(lineData, function(d) {
              return d.y;
            })]);

          var yRangeBar = d3.scale.linear()
            .range([HEIGHT - MARGINS.top, MARGINS.bottom])
            .domain([d3.min(barData, function(d) {
              return d.y - 5;
            }), d3.max(barData, function(d) {
              return d.y;
            })]);

          var xAxis = d3.svg.axis()
            .scale(xRange)
            .tickSize(1)
            .tickFormat(function(d) {
              return d + "s"
            })
            .tickSubdivide(true);

          var yAxis = d3.svg.axis()
            .scale(yRange)
            .tickSize(1)
            .orient('left')
            .tickFormat(function(d) {
              return d + " lbs"
            })
            .tickSubdivide(true);

          var y2Axis = d3.svg.axis()
            .scale(yRangeBar)
            .tickSize(1)
            .orient('right')
            .tickFormat(function(d) {
              return d + " kg"
            })
            .tickSubdivide(true);

          graph.append('svg:g')
            .attr('class', 'axis')
            .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
            .call(xAxis);

          graph.append('svg:g')
            .attr('class', 'axis')
            .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
            .call(yAxis);

          graph.append('svg:g')
            .attr('class', 'axis')
            .attr('transform', 'translate(' + (WIDTH - MARGINS.right) + ',0)')
            .call(y2Axis);

          var lineFunc = d3.svg.line()
            .x(function(d) {
              return xRange(d.x) + xRange.rangeBand() / 2;
            })
            .y(function(d) {
              return yRange(d.y);
            })
            .interpolate('cardinal')
            .tension(0.8);



          graph.selectAll('rect')
            .data(barData)
            .enter()
            .append('rect')
            .attr('x', function(d) {
              return xRange(d.x);
            })
            .attr('y', function(d) {
              return yRange(d.y);
            })
            .attr('width', xRange.rangeBand())
            .attr('height', function(d) {
              return ((HEIGHT - MARGINS.bottom) - yRange(d.y));
            })
            .attr('rx', 1)
            .attr('ry', 1)
            .attr('fill', BAR_COLOR)
            .attr('stroke', tinycolor.darken(BAR_COLOR, 50))
            .attr('stroke-width', 1)
            .attr('opacity', 0.5);

          graph.append('path')
            .attr('d', lineFunc(lineData))
            .attr('stroke', LINE_COLOR)
            .attr('stroke-width', 2)
            .attr('fill', 'none');
          graph
            .selectAll("circle")
            .data(lineData)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("fill", "white")
            .attr("stroke", CIRCLE_COLOR)
            .attr("stroke-width", "2")
            .attr("z-index", 10)
            .attr("r", 5)
            .attr("cx", function(d) {
              return xRange(d.x) + xRange.rangeBand() / 2;
            })
            .attr("cy", function(d) {
              return yRange(d.y);
            });


        };
      }
    };
  }
  return [d3BarsDirective];
});