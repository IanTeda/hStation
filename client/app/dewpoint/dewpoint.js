'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dewpoint', {
        url: '/dewpoint',
        templateUrl: 'app/dewpoint/dewpoint.html',
        controller: 'DewpointCtrl'
      });
  });