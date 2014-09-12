'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('temperature', {
        url: '/temperature',
        templateUrl: 'app/temperature/temperature.html',
        controller: 'TemperatureCtrl'
      });
  });