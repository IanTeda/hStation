'use strict';

angular.module('hStationApp')
  .controller('MethaneCtrl', function ($scope, WeatherService) {

    // Load the last 24 hours readings for meathane
    WeatherService.last24hrs('methane', function(documents) {
      $scope.last24hrs = documents;
    });

  });
