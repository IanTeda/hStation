'use strict';

angular.module('hStationApp')
  .controller('DustCtrl', function ($scope, WeatherService) {

    // Load the last 24 hours readings for dust
    WeatherService.last24hrs('dust', function(documents) {
      $scope.last24hrs = documents;
    });
  });
