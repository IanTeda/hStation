"use strict";

angular.module('hStationApp')
  .controller('BarometricPressureCtrl', function ($scope, WeatherService) {

    // Load the last 24 hours readings for barometric pressure
    WeatherService.last24hrs('barometricPressure', function (documents) {

      $scope.last24hrs = documents;

      // Array for storing readings
      var points = [];

      // Iterate through JSON document and add to multidimensional array
      for (var key in documents) {
        if (documents.hasOwnProperty(key) && documents[key].barometricPressure) {
          var x = new Date(documents[key].timestamp);
          var y = documents[key].barometricPressure;

          points[key] = new Array();
          points[key].push(x);
          points[key].push(y);

          //console.log('x:' + x + ' y:' + y);

        }
      }

      // Create scope variable for displaying data
      $scope.data = [
        {
          "key": "Barometric Pressure",
          "color": "pink",
          "values": points
        }
      ]

    });

    //configuration examples
    $scope.xAxisTickFormat = function(){
      return function(d){
        return d3.time.format('%H:%M')(new Date(d));
      }
    }


  });
