'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ultra-violet', {
        url: '/weather/ultra-violet',
        templateUrl: 'app/weather/ultra-violet/ultra-violet.html',
        controller: 'UltraVioletCtrl'
      });
  });