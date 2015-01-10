'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('infra-red', {
        url: '/weather/infra-red',
        templateUrl: 'app/weather/infra-red/infra-red.html',
        controller: 'InfraRedCtrl'
      });
  });