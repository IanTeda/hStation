'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('weather.dust', {
        views: {
          'main': {
            templateUrl: 'app/weather/dust/dust.html',
            controller: 'DustCtrl'
          }
        }
      });
  });
