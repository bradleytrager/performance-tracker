'use strict';

define([], function() {

  var d3BarsDirective = function() {
    return {
      restrict: 'EA',
      scope: {
        lineData: "=",
        barData: "=",
        data:"=",
        label: "@",
        onClick: "&"
      },
      link: function(scope, element, iAttrs) {
        var lineData = scope.lineData;
        var barData = scope.barData;
        var data = scope.data;
        var svg = d3.select(element[0])
            .append("svg")
        // watch for data changes and re-render
        scope.$watch('lineData', function(newVals, oldVals) {
          return scope.render(newVals);
        }, true);

        // define render function
        scope.render = function(data) {
          var COLUMN_WIDTH = 50;
            var HEIGHT = 300,
            MARGINS = {
              top: 50,
              right: 50,
              bottom: 50,
              left: 50
            };
          var WIDTH = scope.lineData.length * COLUMN_WIDTH + MARGINS.right + MARGINS.left,
            LINE_COLOR = '#1871A4',
            BAR_COLOR = '#BFBFBF',
            CIRCLE_COLOR = '#1871A4';
            svg.selectAll("*").remove();
          
            svg.attr("width", WIDTH + "px")
            .attr("height", HEIGHT);

          var graph = svg;

          var xRange = d3.scale.ordinal()
            .rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right], 0)
            .domain(scope.barData.map(function(d) {
              return d.x;
            }));
          var yRangeBar = d3.scale.linear()
            .range([HEIGHT - MARGINS.top, MARGINS.bottom])
            .domain([d3.min(scope.barData, function(d) {
              return d.y - 0.2 * d.y;
            }), d3.max(scope.barData, function(d) {
              return d.y + 0.2 * d.y;
            })]);

          var yRangeLine = d3.scale.linear()
            .range([HEIGHT - MARGINS.top, MARGINS.bottom])
            .domain([d3.min(scope.lineData, function(d) {
              return d.y - 0.2 * d.y;
            }), d3.max(scope.lineData, function(d) {
              return d.y + 0.2 * d.y;
            })]);

          var xAxis = d3.svg.axis()
            .scale(xRange)
            .tickSize(1)
            .tickFormat(function(index) {
                
                var msTime = scope.data[index].Date
                var date = new Date(msTime);

                var dateParts = date.toString().split(" ");
                var formattedDate = dateParts[1] + dateParts[2];
                return formattedDate;
              })
            .tickSubdivide(true);

          var yAxis = d3.svg.axis()
            .scale(yRangeBar)
            .tickSize(1)
            .orient('left')
            .tickFormat(function(d) {
              return d + " lbs"
            })
            .tickSubdivide(true);

          var y2Axis = d3.svg.axis()
            .scale(yRangeLine)
            .tickSize(1)
            .orient('right')
            .tickFormat(function(d) {
              return d + " s"
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
              return yRangeLine(d.y);
            })
            .interpolate('cardinal')
            .tension(0.8);



          graph.selectAll('rect')
            .data(scope.barData)
            .enter()
            .append('rect')
            .attr('x', function(d) {
              return xRange(d.x);
            })
            .attr('y', function(d) {
              return yRangeBar(d.y);
            })
            .attr('width', xRange.rangeBand())
            .attr('height', function(d) {
              return ((HEIGHT - MARGINS.bottom) - yRangeBar(d.y));
            })
            .attr('rx', 1)
            .attr('ry', 1)
            .attr('fill', BAR_COLOR)
            .attr('stroke', tinycolor.darken(BAR_COLOR, 50))
            .attr('stroke-width', 1)
            .attr('opacity', 0.5);

          graph.append('path')
            .attr('d', lineFunc(scope.lineData))
            .attr('stroke', LINE_COLOR)
            .attr('stroke-width', 2)
            .attr('fill', 'none');
          graph
            .selectAll("circle")
            .data(scope.lineData)
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
              return yRangeLine(d.y);
            });


        };
      }
    };
  }
  return [d3BarsDirective];
});