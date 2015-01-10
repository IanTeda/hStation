'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('carbon-monoxide', {
        url: '/weather/carbon-monoxide',
        templateUrl: 'app/weather/carbon-monoxide/carbon-monoxide.html',
        controller: 'CarbonMonoxideCtrl'
      });
  });