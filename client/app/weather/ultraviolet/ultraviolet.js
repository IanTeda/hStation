'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('weather.ultraviolet', {
        views: {
          'main': {
            templateUrl: 'app/weather/ultraviolet/ultraviolet.html',
            controller: 'UltravioletCtrl'
          }
        }
      });
  });
