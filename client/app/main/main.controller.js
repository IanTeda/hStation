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
      infraRed: -1,
      lux: -1,
      methane: -1,
      pressure: -1,
      temperature: -101,
      ultraViolet: -1
    };

    console.log('WeatherService.latest: ' + JSON.stringify(latest));

    // Use service to retrieve all settings, which is only one in this case
    //WeatherService.latest( function(latest) {
      //$scope.latestWeather = latest;
      //console.log('WeatherService.latest: ' + JSON.stringify(latest));
    //});
  });