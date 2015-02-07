'use strict';

angular.module('hStationApp')
  .controller('UltravioletCtrl', function ($scope, WeatherService) {
    
    // Load the last 24 hours readings for ultraviolet
    WeatherService.last24hrs('ultraviolet', function(documents) {
      $scope.last24hrs = documents;
    });
  });
