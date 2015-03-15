'use strict';

angular.module('hStationApp')
  .controller('DewPointCtrl', function ($scope, WeatherService) {

    // Load the last 24 hours readings for dew point
    WeatherService.last24hrs('dewPoint', function(documents) {
      $scope.last24hrs = documents;

      // Array for storing readings
      var points = [];

      // Iterate through JSON document and add to multidimensional array
      for (var key in documents) {
        if (documents.hasOwnProperty(key) && documents[key].temperature) {
          var x = new Date(documents[key].timestamp);
          var y = documents[key].temperature;

          points[key] = [];
          points[key].push(x);
          points[key].push(y);

          console.log('x:' + x + ' y:' + y);

        }
      }

      // Create scope variable for displaying data
      $scope.data = [
        {
          "key": "Dew Point",
          "color": "blue",
          "values": points
        }
      ];

    });

    //configuration examples
    $scope.xAxisTickFormat = function () {
      return function (d) {
        return d3.time.format('%H:%M')(new Date(d));
      };
    };

  });
