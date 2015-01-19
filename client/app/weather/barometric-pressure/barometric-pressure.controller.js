'use strict';

angular.module('hStationApp')
  .controller('BarometricPressureCtrl', function ($scope, WeatherService) {

    // Load the last 24 hours of all sensors
    WeatherService.last24hrs('barometricPressure', function(documents) {
      //console.log('temp ' + JSON.stringify(last24hrs));
      $scope.last24hrs = documents;
    });

  });
