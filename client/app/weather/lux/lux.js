'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('weather.lux', {
        views: {
          'main': {
            templateUrl: 'app/weather/lux/lux.html',
            controller: 'LuxCtrl'
          }
        }
      });
  });
