'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('temperature', {
        url: '/sensors/temperature',
        templateUrl: 'app/sensors/temperature/temperature.html',
        controller: 'TemperatureCtrl'
      });
  });