'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('temperature', {
        url: '/weather/temperature',
        templateUrl: 'app/weather/temperature/temperature.html',
        controller: 'TemperatureCtrl'
      });
  });