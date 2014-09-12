'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('humidity', {
        url: '/humidity',
        templateUrl: 'app/humidity/humidity.html',
        controller: 'HumidityCtrl'
      });
  });