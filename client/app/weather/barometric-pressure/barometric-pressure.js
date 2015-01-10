'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('barometric-pressure', {
        url: '/weather/barometric-pressure',
        templateUrl: 'app/weather/barometric-pressure/barometric-pressure.html',
        controller: 'BarometricPressureCtrl'
      });
  });