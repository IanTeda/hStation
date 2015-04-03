'use strict';

angular.module('hStationApp')
  .controller('HumidityCtrl', function ($scope) {

    // Array for storing readings
    var points = [];

    // Iterate through JSON document and add to multidimensional array
    for (var key in $scope.last24hrs) {
      if ($scope.last24hrs.hasOwnProperty(key) && $scope.last24hrs[key].humidity) {
        var x = new Date($scope.last24hrs[key].timestamp);
        var y = $scope.last24hrs[key].humidity;

        points[key] = [];
        points[key].push(x);
        points[key].push(y);

      }
    }

    // Create scope variable for displaying data
    $scope.data = [
      {
        "key": "Humidity",
        "color": "pink",
        "values": points
      }
    ];

    // Format x-axis date
    $scope.xAxisTickFormatFunction = function(){
      return function(d){
        return d3.time.format('%a %H:%M')(new Date(d));
      };
    };

  });
