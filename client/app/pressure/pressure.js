'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pressure', {
        url: '/pressure',
        templateUrl: 'app/pressure/pressure.html',
        controller: 'PressureCtrl'
      });
  });