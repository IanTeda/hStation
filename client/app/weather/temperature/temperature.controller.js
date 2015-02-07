'use strict';

angular.module('hStationApp')
  .controller('TemperatureCtrl', function ($scope, WeatherService) {

    // Load the last 24 hours readings for temperature
    WeatherService.last24hrs('temperature', function(documents) {
      $scope.last24hrs = documents;
    });

  });
