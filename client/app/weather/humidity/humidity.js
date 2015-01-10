'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('humidity', {
        url: '/weather/humidity',
        templateUrl: 'app/weather/humidity/humidity.html',
        controller: 'HumidityCtrl'
      });
  });