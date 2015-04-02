'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('weather.methane', {
        views: {
          'main': {
            templateUrl: 'app/weather/methane/methane.html',
            controller: 'MethaneCtrl'
          }
        }
      });
  });
