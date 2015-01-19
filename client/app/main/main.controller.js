'use strict';

angular.module('hStationApp')
  .controller('MainCtrl', function ($scope, $http, WeatherService, socket) {

    //console.log('MainCtrl');

    // Initialise latest weather readings
    $scope.latestWeather = {
      timestamp: Date.now(),
      carbonMonoxide: -1,
      dewPoint: -1,
      dust: -1,
      humidity: -1,
      infrared: -1,
      lux: -1,
      methane: -1,
      pressure: -1,
      temperature: -101,
      ultraviolet: -1
    };

    // Use service to retrieve all settings, which is only one in this case
    WeatherService.latest( function(latest) {
      $scope.latestWeather = latest;
    });
  });