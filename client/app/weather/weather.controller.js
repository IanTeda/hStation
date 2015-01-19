'use strict';

angular.module('hStationApp')
  .controller('WeatherCtrl', function ($scope, WeatherService) {

    // Load the last 24 hours of all sensors
    WeatherService.last24hrs('all', function(last24hrs) {
      $scope.last24hrs = last24hrs;
    });

  });
