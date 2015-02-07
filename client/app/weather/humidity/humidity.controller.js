'use strict';

angular.module('hStationApp')
  .controller('HumidityCtrl', function ($scope, WeatherService) {
    
    // Load the last 24 hours readings for humidity
    WeatherService.last24hrs('humidity', function(documents) {
      $scope.last24hrs = documents;
    });

  });
