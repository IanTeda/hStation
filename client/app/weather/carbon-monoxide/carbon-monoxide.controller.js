'use strict';

angular.module('hStationApp')
  .controller('CarbonMonoxideCtrl', function ($scope, WeatherService) {
    
  	// Load the last 24 hours readings for barometric pressure
    WeatherService.last24hrs('carbonMonoxide', function(documents) {
      $scope.last24hrs = documents;
    });

  });
