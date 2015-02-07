'use strict';

angular.module('hStationApp')
  .controller('InfraredCtrl', function ($scope, WeatherService) {

        // Load the last 24 hours readings for infrared
    WeatherService.last24hrs('infrared', function(documents) {
      $scope.last24hrs = documents;
    });
  });
