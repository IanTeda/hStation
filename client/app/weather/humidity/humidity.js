'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('weather.humidity', {
        views: {
          'main': {
            templateUrl: 'app/weather/humidity/humidity.html',
            controller: 'HumidityCtrl'
          }
        }
      });
  });
