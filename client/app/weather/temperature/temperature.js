'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('weather.temperature', {
        views: {
          'main': {
            templateUrl: 'app/weather/temperature/temperature.html',
            controller: 'TemperatureCtrl'
          }
        }
      });
  });
