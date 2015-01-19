'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ultraviolet', {
        url: '/weather/ultraviolet',
        templateUrl: 'app/weather/ultraviolet/ultraviolet.html',
        controller: 'UltravioletCtrl'
      });
  });