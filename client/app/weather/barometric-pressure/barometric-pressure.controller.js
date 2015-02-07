"use strict";

angular.module('hStationApp')
  .controller('BarometricPressureCtrl', function ($scope, WeatherService) {

    // Load the last 24 hours readings for barometric pressure
    WeatherService.last24hrs('barometricPressure', function (documents) {
      $scope.last24hrs = documents;

      // Array for storying readings
      var xyArray = [];
      // Iterate through JSON document and add to multidimensional array
      for (var key in documents) {
        if (documents.hasOwnProperty(key) && documents[key].barometricPressure) {
          //var x = documents[key].timestamp;
          var x = key;
          var y = documents[key].barometricPressure;

          xyArray[key] = new Array();
          xyArray[key].push(x);
          xyArray[key].push(y);

          console.log('x:' + x + ' y:' + y);

        }
      }

      // Create scope variable for displaying data
      $scope.data = [
        {
          "key" : "Barometric Pressure",
          "color": "#ccf",
          "values" : xyArray
        }

      ]

    });


  });
