'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dust', {
        url: '/weather/dust',
        templateUrl: 'app/weather/dust/dust.html',
        controller: 'DustCtrl'
      });
  });