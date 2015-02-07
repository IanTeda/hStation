'use strict';

angular.module('hStationApp')
  .controller('LuxCtrl', function ($scope, WeatherService) {

    // Load the last 24 hours readings for lux
    WeatherService.last24hrs('lux', function(documents) {
      $scope.last24hrs = documents;
    });
    
  });
