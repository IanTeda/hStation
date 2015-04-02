'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('weather.barometricPressure', {
        views: {
          'main': {
            templateUrl: 'app/weather/barometric-pressure/barometric-pressure.html',
            controller: 'BarometricPressureCtrl'
          }
        }
      });
  });
