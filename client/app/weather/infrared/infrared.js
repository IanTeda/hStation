'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('weather.infrared', {
        views: {
          'main': {
            templateUrl: 'app/weather/infrared/infrared.html',
            controller: 'InfraredCtrl'
          }
        }
      });
  });
