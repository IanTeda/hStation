'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('weather.carbonMonoxide', {
        url: '',
        views: {
          'main': {
            templateUrl: 'app/weather/carbon-monoxide/carbon-monoxide.html',
            controller: 'CarbonMonoxideCtrl'
          }
        }
      });
  });
