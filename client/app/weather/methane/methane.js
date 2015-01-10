'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('methane', {
        url: '/weather/methane',
        templateUrl: 'app/weather/methane/methane.html',
        controller: 'MethaneCtrl'
      });
  });