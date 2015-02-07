'use strict';

angular.module('hStationApp')
  .controller('DewPointCtrl', function ($scope, WeatherService) {

    // Load the last 24 hours readings for dew point
    WeatherService.last24hrs('dewPoint', function(documents) {
      $scope.last24hrs = documents;
    });

  });
