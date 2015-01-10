'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dew-point', {
        url: '/weather/dew-point',
        templateUrl: 'app/weather/dew-point/dew-point.html',
        controller: 'DewPointCtrl'
      });
  });