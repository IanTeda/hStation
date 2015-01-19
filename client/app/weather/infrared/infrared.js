'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('infrared', {
        url: '/weather/infrared',
        templateUrl: 'app/weather/infrared/infrared.html',
        controller: 'InfraredCtrl'
      });
  });