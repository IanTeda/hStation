'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('weather.dewPoint', {
        url: '',
        views: {
          'main': {
            templateUrl: 'app/weather/dew-point/dew-point.html',
            controller: 'DewPointCtrl'
          }
        }
      });
  });
