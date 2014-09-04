'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('sensors', {
        url: '/sensors',
        templateUrl: 'app/sensors/sensors.html',
        controller: 'SensorsCtrl'
      });
  });