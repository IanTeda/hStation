'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('lux', {
        url: '/weather/lux',
        templateUrl: 'app/weather/lux/lux.html',
        controller: 'LuxCtrl'
      });
  });